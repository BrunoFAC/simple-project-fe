/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AccountsQuery {
  top?: number;
  skip?: number;
  search?: string;
}

export interface AccountUpdateRoleRequest {
  role: number;
}

export interface AccountsRoleRequest {
  accountsId: any[];
}

export interface LoginRequest {
  /** User's email */
  email: string;
  /** User's password */
  password: string;
}

export interface RegisterRequest {
  /** User's username */
  username: string;
  /** User's email */
  email: string;
  /** User's password */
  password: string;
}

export interface AccountListDTO {
  id: number;
  email: string;
  username: string;
  role: number;
  creationDate: date;
  updateDate: date;
}

export interface TableResultAccountsListDTO {
  results?: AccountListDTO[];
  count?: number;
}

export interface AccountSummaryDTO {
  id: number;
  email: string;
  name: string;
  role: number;
}

export interface AccountUpdateRoleDTO {
  id: number;
  email: string;
  role: number;
  username: string;
}

export interface LoginDTO {
  /** Session token */
  token: string;
}
