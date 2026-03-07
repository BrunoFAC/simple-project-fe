import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';

const plugins = [imageminJpegtran(), imageminPngquant(), imageminSvgo()];

imagemin(['src/assets/images/ab/*.{jpg,png,svg}'], {
	destination: 'src/assets/images/ab',
	plugins,
});

imagemin(['src/assets/images/bcp/*.{jpg,png,svg}'], {
	destination: 'src/assets/images/bcp',
	plugins,
});

imagemin(['src/assets/images/common/*.{jpg,png,svg}'], {
	destination: 'src/assets/images/common',
	plugins,
});
