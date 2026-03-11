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

import { LoginDTO, LoginRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Login<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Login
   *
   * @tags Login
   * @name LoginCreate
   * @request POST:/login
   */
  loginCreate = (data: LoginRequest, params: RequestParams = {}) =>
    this.request<LoginDTO, void>({
      path: `/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
