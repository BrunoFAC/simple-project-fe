#!/usr/bin/env node

/*
 * shaihulud-check.mjs
 *
 * Faz 4 coisas num único comando:
 *  1) descarrega páginas públicas com listas de pacotes comprometidos (Shai‑hulud)
 *  2) extrai (pacote, versão) com heurísticas robustas (sem dependências externas)
 *  3) grava blocklist.json no formato: [{ name, versions: ["1.2.3", ...] }]
 *  4) cruza a blocklist com as tuas dependências instaladas (npm/pnpm/yarn) e
 *     sai com código 2 se houver hits (útil para CI).
 *
 * Uso:
 *  using npm:
 *   node shaihulud-check.js -- --update --check --output blocklist.json --fail-on-hit
 *   node shaihulud-check.js -- --check --blocklist blocklist.json
 *
 *  using pnpm:
 *   node shaihulud-check.js --update --check --output blocklist.json --fail-on-hit
 *   node shaihulud-check.js --check --blocklist blocklist.json
 *
 * Flags:
 *   --update               (opcional) descarrega e reconstrói o blocklist a partir das fontes
 *   --check                (opcional) verifica árvore de dependências instalada contra a blocklist
 *   --output <ficheiro>    caminho para gravar o blocklist gerado (default: blocklist.json)
 *   --blocklist <ficheiro> lê blocklist existente (se não quiseres fazer --update)
 *   --feed <url>           adiciona uma fonte extra (JSON de [{name, versions: [...] }])
 *   --manager npm|pnpm|yarn  força o gestor para leitura da árvore (auto‑deteta por omissão)
 *   --fail-on-hit          exit code 2 se houver hits
 *   --verbose              logs adicionais
 */
import https from "https";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

let yaml;

function detectManager() {
  if (forcedManager) return forcedManager;
  if (fs.existsSync("pnpm-lock.yaml")) return "pnpm";
  if (fs.existsSync("yarn.lock")) return "yarn";
  return "npm";
}

(async () => {
  try {
    yaml = await import("yaml");
  } catch {
    if (detectManager() === "pnpm") {
      console.error(
        'Package "yaml" não está instalado. Corre "pnpm add -D yaml" para instalar.'
      );
      process.exit(1);
    }
  }
})();

// ---------------- CLI ----------------
const args = process.argv.slice(2);

const basePath = path.join(path.resolve("package.json"), "..");

if (!fs.existsSync(basePath)) {
  console.error(
    "Este script deve ser executado na raiz do projeto (onde está o package.json)."
  );
  process.exit(1);
}

if (!fs.existsSync(path.join(basePath, ".shaihulud-check"))) {
  fs.mkdirSync(path.join(basePath, ".shaihulud-check"));
}

const shaihuludCheckFolder = path.join(basePath, ".shaihulud-check");

const getFlag = (flag) => {
  const i = args.indexOf(flag);
  if (i === -1) return null;
  const next = args[i + 1];
  if (!next || next.startsWith("-")) return true;
  return next;
};

const doUpdate = Boolean(getFlag("--update"));
const doCheck = Boolean(getFlag("--check"));
const outputFile = getFlag("--output") || "blocklist.json";
const blocklistIn = getFlag("--blocklist");
const feedExtra = getFlag("--feed");
const forcedManager = getFlag("--manager");
const failOnHit = Boolean(getFlag("--fail-on-hit"));
const verbose = Boolean(getFlag("--verbose"));

function log(...a) {
  if (verbose) console.log("[info]", ...a);
}

function warn(...a) {
  console.warn("[warn]", ...a);
}

function uniqSort(arr, keyFn) {
  const map = new Map();
  for (const it of arr) {
    const k = keyFn(it);
    if (!map.has(k)) map.set(k, it);
  }
  return Array.from(map.values()).sort((a, b) =>
    a.name === b.name
      ? (a.version || "").localeCompare(b.version || "")
      : a.name.localeCompare(b.name)
  );
}

// ------------- Fontes (podem mudar URLs) -------------
// Mantém estas URLs atualizadas conforme as organizações publicam novas listas.
const SOURCES = [
  // JFrog (blog)
  "https://jfrog.com/blog/shai-hulud-npm-supply-chain-attack-new-compromised-packages-detected/",
  // Wiz (appendix: impacted packages)
  "https://www.wiz.io/blog/shai-hulud-npm-supply-chain-attack",
  // OX Security (package versions)
  "https://www.ox.security/blog/npm-2-0-hack-40-npm-packages-hit-in-major-supply-chain-attack/",
  // Endor Labs (tabela extensa)
  "https://www.endorlabs.com/learn/npm-malware-outbreak-tinycolor-and-crowdstrike-packages-compromised",
];

if (
  feedExtra &&
  typeof feedExtra === "string" &&
  /^https:\/\//i.test(feedExtra)
) {
  SOURCES.push(feedExtra);
}

// -------------- Fetch simples (HTTPS) -----------------
// function fetch(url) {
// 	return new Promise((resolve, reject) => {
// 		https
// 			.get(url, (res) => {
// 				if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
// 					// seguir redirect simples
// 					return resolve(fetch(res.headers.location));
// 				}
// 				if (res.statusCode !== 200) {
// 					reject(new Error(`HTTP ${res.statusCode} for ${url}`));
// 					res.resume();
// 					return;
// 				}
// 				let data = '';
// 				res.on('data', (c) => (data += c));
// 				res.on('end', () => resolve(data));
// 			})
// 			.on('error', reject);
// 	});
// }

// ---- PATCH: fetch com headers + fallback proxy (anti-403) ----
const H = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.8,pt;q=0.7",
  "Accept-Encoding": "identity", // evita gzip/br (sem precisar de descompressão)
  Connection: "keep-alive",
};

const NEEDS_PROXY = new Set(["www.ox.security"]); // domínios que costumam dar 403
function proxify(url) {
  // usa um proxy “read-only” que devolve o conteúdo renderizado como texto
  // nota: serviço público; usa só para scraping deste tipo de lista
  const u = new URL(url);
  return `https://r.jina.ai/http://${u.host}${u.pathname}${u.search}`;
}

function fetch(url, depth = 0) {
  return new Promise((resolve, reject) => {
    const MAX_REDIRECTS = 5;
    const u = new URL(url);
    const opts = {
      protocol: u.protocol,
      hostname: u.hostname,
      path: u.pathname + (u.search || ""),
      headers: H,
    };

    const req = https.get(opts, (res) => {
      const code = res.statusCode || 0;

      // redirects
      if (code >= 300 && code < 400 && res.headers.location) {
        if (depth >= MAX_REDIRECTS)
          return reject(new Error("Too many redirects"));
        res.resume();
        return resolve(
          fetch(new URL(res.headers.location, url).toString(), depth + 1)
        );
      }

      // bloqueios comuns (403/503) → tenta proxify uma vez
      if ((code === 403 || code === 503) && depth < 1) {
        res.resume();
        const isOx = u.hostname === "www.ox.security";
        const tryProxy = isOx || NEEDS_PROXY.has(u.hostname);
        if (tryProxy) return resolve(fetch(proxify(url), depth + 1));
      }

      if (code !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${code} for ${url}`));
      }

      let data = "";
      res.setEncoding("utf8");
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
    });

    req.setTimeout(15000, () => {
      req.destroy(new Error(`Timeout fetching ${url}`));
    });
    req.on("error", reject);
  });
}

// ---------- Heurísticas de extração (sem cheerio) -----
// Estratégia: retirar o texto do HTML e aplicar regex para apanhar:
//  - pares name@version
//  - linhas onde aparecem name e depois um bloco de versões (ex: 1.2.3, 1.2.4)

const RE_PKG_AT_VER =
  /(?:^|\s|["'`>])(@?[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+|@?[A-Za-z0-9_.-]+)@((?:\d+\.){1,3}\d+(?:[-+][A-Za-z0-9_.-]+)?)/g;
const RE_VERSION = /\b\d+\.\d+\.\d+(?:[-+][A-Za-z0-9_.-]+)?\b/g;
const RE_NAME = /@?[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+|@?[a-zA-Z0-9_.-]+/g;

function htmlToVisibleText(html) {
  // remove scripts/styles and tags
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&amp;|&lt;|&gt;|&quot;|&#39;/g, " ")
    .replace(/\s+/g, " ") // compress whitespace
    .trim();
}

function extractPairsFromText(txt) {
  const pairs = [];
  // 1) capturar tokens do tipo name@version
  for (const m of txt.matchAll(RE_PKG_AT_VER)) {
    const name = m[1];
    const version = m[2];
    if (name && version) pairs.push([name, version]);
  }
  // 2) fallback: procurar padrões "<nome> ... <lista de versões>"
  // heuristic: split by common delimiters and scan windows of tokens
  const tokens = txt
    .split(/\s|,|;|\||\(|\)|\[|\]|\{|\}|→|:|\u2013|\u2014|\//)
    .filter(Boolean);
  for (let i = 0; i < tokens.length; i++) {
    const name = tokens[i];
    if (!/^@?[A-Za-z0-9_.-]+(\/[A-Za-z0-9_.-]+)?$/.test(name)) continue;
    // próximos 20 tokens: recolher versões
    const window = tokens.slice(i + 1, i + 25);
    const versions = new Set();
    for (const t of window) {
      if (RE_VERSION.test(t)) versions.add(t);
    }
    if (versions.size) {
      for (const v of versions) pairs.push([name, v]);
    }
  }
  return pairs;
}

function normalizeBlocklist(pairs) {
  const map = new Map();
  for (const [name, version] of pairs) {
    if (!name || !version) continue;
    // filtrar falsos positivos (palavras como 'version')
    if (/^version$/i.test(name)) continue;
    // nomes improváveis (começam por número sem scope etc.)
    if (/^\d/.test(name)) continue;
    const key = name;
    if (!map.has(key)) map.set(key, new Set());
    map.get(key).add(version);
  }
  return Array.from(map.entries())
    .map(([name, set]) => ({ name, versions: Array.from(set).sort() }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// ----------------- Dependências instaladas ------------

function tryExec(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "pipe"] }).toString(
      "utf-8"
    );
  } catch {
    return null;
  }
}

function readFromPnpmLock() {
  const LOCK = path.resolve("pnpm-lock.yaml");
  if (!fs.existsSync(LOCK)) return null;
  const text = fs.readFileSync(LOCK, "utf-8");
  const y = yaml.parse(text);

  const out = [];
  if (y && y.packages && typeof y.packages === "object") {
    for (const key of Object.keys(y.packages)) {
      // key exemplo: '/@ctrl/react-adsense@2.0.2'
      const m = key.split("@");

      if (!m || m.length === 1) continue;
      const name = m[0];
      const version = m[1];
      out.push({ name, version });
    }
  }
  return out;
}

function readFromNpmLock() {
  const LOCK = path.resolve("package-lock.json");
  if (!fs.existsSync(LOCK)) return null;
  try {
    const j = JSON.parse(fs.readFileSync(LOCK, "utf-8"));
    const out = [];
    if (j.packages && typeof j.packages === "object") {
      // npm v7+: j.packages tem chaves como "", "node_modules/react", "node_modules/@scope/pkg"
      for (const [key, meta] of Object.entries(j.packages)) {
        const version = meta && meta.version;
        if (!version) continue;
        if (key === "") continue; // raiz do projeto, não é pacote
        // extrair nome a partir do caminho node_modules
        const nm = key.startsWith("node_modules/")
          ? key.slice("node_modules/".length)
          : null;

        if (!nm) continue;
        // para caminhos aninhados (node_modules/a/node_modules/b) ficar com o último segmento
        const parts = nm.split("node_modules/");
        const last = parts[parts.length - 1];
        const name = last; // já pode conter @scope/

        if (name && version) out.push({ name, version });
      }
    } else if (j.dependencies) {
      // fallback para locks antigos (npm v6): travessia recursiva
      const walk = (deps, prefix = []) => {
        for (const [name, meta] of Object.entries(deps)) {
          if (!meta) continue;
          const version = meta.version || meta.required || meta.from || null;
          if (version && /^\d+\.\d+\.\d+/.test(String(version)))
            out.push({ name, version: String(version) });
          if (meta.dependencies) walk(meta.dependencies, prefix.concat(name));
        }
      };
      walk(j.dependencies);
    }
    return uniqSort(out, (x) => `${x.name}@${x.version}`);
  } catch (e) {
    warn("Falha ao ler package-lock.json:", e.message);
    return null;
  }
}

function getInstalledTree() {
  const manager = detectManager();
  const cmds = {
    npm: "npm ls --all --json",
    pnpm: "pnpm list --depth Infinity --json",
    yarn: "yarn list --json",
  };
  const raw = tryExec(cmds[manager]);
  if (!raw) {
    const fb = tryExec(cmds.npm);
    if (!fb)
      throw new Error(
        "Falhou leitura da árvore de dependências. As deps estão instaladas?"
      );
    return { manager: "npm", data: JSON.parse(fb) };
  }

  if (manager === "yarn") {
    // yarn v1: JSON por linhas → procurar type=tree
    const lines = raw
      .trim()
      .split("\n")
      .map((l) => {
        try {
          return JSON.parse(l);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
    const tree = lines.find((l) => l.type === "tree");
    if (!tree) return { manager: "yarn", data: { dependencies: {} } };
    const normalize = (nodes) => {
      const deps = {};
      for (const n of nodes) {
        const at = n.name.lastIndexOf("@");
        if (at <= 0) continue;
        const name = n.name.slice(0, at);
        const version = n.name.slice(at + 1);
        deps[name] = {
          version,
          dependencies: n.children ? normalize(n.children) : undefined,
        };
      }
      return deps;
    };
    return {
      manager: "yarn",
      data: { dependencies: normalize(tree.data.trees || []) },
    };
  }
  return { manager, data: JSON.parse(raw) };
}

function flattenDeps(tree) {
  const map = new Map();
  function walk(deps) {
    if (!deps) return;
    for (const [name, meta] of Object.entries(deps)) {
      const ver = meta.version || "0.0.0";
      const key = `${name}@${ver}`;
      if (!map.has(key)) {
        map.set(key, { name, version: ver });
        if (meta.dependencies) walk(meta.dependencies);
      }
    }
  }
  if (tree.dependencies) walk(tree.dependencies);
  if (Array.isArray(tree))
    tree.forEach((t) => t.dependencies && walk(t.dependencies));
  return Array.from(map.values()).sort((a, b) =>
    a.name === b.name
      ? a.version.localeCompare(b.version)
      : a.name.localeCompare(b.name)
  );
}

// ------------------ Verificação -----------------------
function indexBlocklist(list) {
  const idx = new Map();
  for (const item of list) {
    const set = new Set((item.versions || []).map(String));
    idx.set(item.name, set);
  }
  return idx;
}

async function buildBlocklist() {
  let pairs = [];
  for (const url of SOURCES) {
    try {
      const html = await fetch(url);
      const txt = htmlToVisibleText(html);
      const localPairs = extractPairsFromText(txt);
      log(`extraídos ${localPairs.length} pares de ${url}`);
      pairs = pairs.concat(localPairs);
    } catch (e) {
      warn(`Falha a obter ${url}: ${e.message}`);
    }
  }
  const normalized = normalizeBlocklist(pairs);
  const out = {
    generated_at: new Date().toISOString(),
    sources: SOURCES,
    packages: normalized,
  };

  fs.writeFileSync(
    path.join(shaihuludCheckFolder, outputFile),
    JSON.stringify(out, null, 2)
  );

  console.log(
    `✅ Blocklist gerada: ${path.join(shaihuludCheckFolder, outputFile)} (packages: ${normalized.length})`
  );

  return out;
}

function loadBlocklistFromFile(file) {
  const raw = fs.readFileSync(file, "utf-8");
  const j = JSON.parse(raw);
  if (Array.isArray(j)) return { packages: j }; // também suportar formato simplificado
  return j;
}

async function main() {
  console.log("🔍 Shai‑hulud blocklist checker");

  let blocklist;
  if (doUpdate) {
    blocklist = await buildBlocklist();
  } else if (
    blocklistIn &&
    fs.existsSync(path.join(shaihuludCheckFolder, blocklistIn))
  ) {
    blocklist = loadBlocklistFromFile(
      path.join(shaihuludCheckFolder, blocklistIn)
    );
  } else if (fs.existsSync(path.join(shaihuludCheckFolder, outputFile))) {
    blocklist = loadBlocklistFromFile(
      path.join(shaihuludCheckFolder, outputFile)
    );
  }

  if (doCheck) {
    if (!blocklist)
      throw new Error(
        "Sem blocklist carregada. Usa --update ou --blocklist <ficheiro>."
      );
    const idx = indexBlocklist(blocklist.packages || []);

    const manager = detectManager();
    console.log(`ℹ️  Verificando dependências instaladas (${manager})...`);

    let comps = [];
    if (manager === "pnpm") {
      comps = readFromPnpmLock();
    } else {
      comps = readFromNpmLock();
    }

    fs.writeFileSync(
      path.join(shaihuludCheckFolder, "shaihulud-comps.json"),
      JSON.stringify(
        {
          generated_at: new Date().toISOString(),
          manager,
          components: { length: comps.length, items: comps },
        },
        null,
        2
      )
    );

    console.log(
      `ℹ️  Verificando ${comps.length} dependências instaladas (${manager}) terminado!`
    );

    if (!comps) {
      // fallback caro (pode estourar heap)
      const { manager, data } = getInstalledTree();
      comps = flattenDeps(data);
    }

    const hits = [];
    for (const c of comps) {
      const set = idx.get(c.name);
      if (set && set.has(String(c.version))) hits.push(c);
    }
    if (hits.length) {
      console.log("\n⚠️  Dependências comprometidas DETETADAS:");
      for (const h of hits) console.log(` - ${h.name}@${h.version}`);
      if (failOnHit) process.exit(2);
    } else {
      console.log("✅ Sem correspondências com a blocklist.");
    }
  }
}

main().catch((e) => {
  console.error("[erro]", e.message);
  process.exit(1);
});
