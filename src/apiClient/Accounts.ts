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

import {
  AccountSummaryDTO,
  AccountUpdateRoleDTO,
  AccountUpdateRoleRequest,
  TableResultAccountsListDTO,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Accounts<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Get logged in user info
   *
   * @tags Accounts
   * @name SummaryList
   * @request GET:/accounts/summary
   * @secure
   */
  summaryList = (params: RequestParams = {}) =>
    this.request<AccountSummaryDTO, void>({
      path: `/accounts/summary`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get users list
   *
   * @tags Accounts
   * @name AccountsList
   * @request GET:/accounts
   * @secure
   */
  accountsList = (
    query?: {
      /** default - 10 */
      top?: number;
      /** default - 0 */
      skip?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<TableResultAccountsListDTO, void>({
      path: `/accounts`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Upload user avatar
   *
   * @tags Accounts
   * @name AvatarPartialUpdate
   * @request PATCH:/accounts/avatar
   * @secure
   */
  avatarPartialUpdate = (
    data: {
      /**
       * The file to upload
       * @format binary
       */
      avatar?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/accounts/avatar`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description Update account role
   *
   * @tags Accounts
   * @name AccountIdRolePartialUpdate
   * @request PATCH:/accounts/:accountId/role
   * @secure
   */
  accountIdRolePartialUpdate = (
    accountId: string,
    data: AccountUpdateRoleRequest,
    params: RequestParams = {},
  ) =>
    this.request<AccountUpdateRoleDTO, void>({
      path: `/accounts/${accountId}/role`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
