/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  PbAddRoleToUserRequest,
  PbAddRoleToUserResponse,
  PbCreateOrUpdateEvaluationVoteResponse,
  PbCreateUserRequest,
  PbCreateUserResponse,
  PbDeleteEvaluationVoteResponse,
  PbGetAverageUserEvaluationsByTypeResponse,
  PbGetEvaluationVotesByUserIdAndVoterResponse,
  PbGetEvaluationVotesByUserIdResponse,
  PbGetUserModulesResponse,
  PbGetUserPostsResponse,
  PbGetUserRolesResponse,
  PbGetUsersResponse,
  PbRemoveRoleFromUserResponse,
  PbUpdateUserRequest,
  PbUpdateUserResponse,
  PbUploadUserAvatarResponse,
  PbViewPost,
  PbViewUser,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Users<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description returns list of users
   *
   * @tags Users
   * @name UsersGetUsers
   * @summary Get list of users
   * @request GET:/users
   * @response `200` `PbGetUsersResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersGetUsers = (
    query?: {
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetUsersResponse, RpcStatus>({
      path: `/users`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description use this API to create a new user
   *
   * @tags Users
   * @name UsersCreateUser
   * @summary Create new user
   * @request POST:/users
   * @response `200` `PbCreateUserResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersCreateUser = (body: PbCreateUserRequest, params: RequestParams = {}) =>
    this.http.request<PbCreateUserResponse, RpcStatus>({
      path: `/users`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description use this API to update user
   *
   * @tags Users
   * @name UsersUpdateUser
   * @summary Update user
   * @request PATCH:/users
   * @response `200` `PbUpdateUserResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersUpdateUser = (body: PbUpdateUserRequest, params: RequestParams = {}) =>
    this.http.request<PbUpdateUserResponse, RpcStatus>({
      path: `/users`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description returns information about one user
   *
   * @tags Users
   * @name UsersGetUserById
   * @summary Get user
   * @request GET:/users/id/{userId}
   * @response `200` `PbViewUser` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersGetUserById = (userId: number, params: RequestParams = {}) =>
    this.http.request<PbViewUser, RpcStatus>({
      path: `/users/id/${userId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description returns full list of user roles
   *
   * @tags Users
   * @name UsersGetUserRoles
   * @summary Get user roles (admin, moderator, etc.)
   * @request GET:/users/roles
   * @response `200` `PbGetUserRolesResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersGetUserRoles = (
    query?: {
      /** @format int32 */
      userId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetUserRolesResponse, RpcStatus>({
      path: `/users/roles`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description adds new role to user
   *
   * @tags Users
   * @name UsersAddRoleToUser
   * @summary Add role to user
   * @request POST:/users/roles
   * @response `200` `PbAddRoleToUserResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersAddRoleToUser = (body: PbAddRoleToUserRequest, params: RequestParams = {}) =>
    this.http.request<PbAddRoleToUserResponse, RpcStatus>({
      path: `/users/roles`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description uploads an user avatar
   *
   * @tags Users
   * @name UsersUploadUserAvatar
   * @summary Upload user avatar
   * @request POST:/users/{userId}/avatar
   * @response `200` `PbUploadUserAvatarResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersUploadUserAvatar = (
    userId: number,
    body: {
      /** @format byte */
      data?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbUploadUserAvatarResponse, RpcStatus>({
      path: `/users/${userId}/avatar`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description get evaluation votes by user id
   *
   * @tags Users
   * @name UsersGetEvaluationVotesByUserId
   * @summary Get evaluation votes by user id
   * @request GET:/users/{userId}/evaluation-vote
   * @response `200` `PbGetEvaluationVotesByUserIdResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersGetEvaluationVotesByUserId = (userId: number, params: RequestParams = {}) =>
    this.http.request<PbGetEvaluationVotesByUserIdResponse, RpcStatus>({
      path: `/users/${userId}/evaluation-vote`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description create or update evaluation vote
   *
   * @tags Users
   * @name UsersCreateOrUpdateEvaluationVote
   * @summary Create or update evaluation vote
   * @request POST:/users/{userId}/evaluation-vote
   * @response `200` `PbCreateOrUpdateEvaluationVoteResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersCreateOrUpdateEvaluationVote = (
    userId: number,
    body: {
      /** @format int32 */
      evaluationId?: number;
      /** @format int32 */
      userIdVoter?: number;
      /** @format double */
      value?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbCreateOrUpdateEvaluationVoteResponse, RpcStatus>({
      path: `/users/${userId}/evaluation-vote`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description get average user evaluation by type
   *
   * @tags Users
   * @name UsersGetAverageUserEvaluationsByType
   * @summary Get average user evaluation
   * @request GET:/users/{userId}/evaluation-vote/type/{type}/average
   * @response `200` `PbGetAverageUserEvaluationsByTypeResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersGetAverageUserEvaluationsByType = (
    userId: number,
    type: string,
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetAverageUserEvaluationsByTypeResponse, RpcStatus>({
      path: `/users/${userId}/evaluation-vote/type/${type}/average`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description get evaluation votes by user id and voter
   *
   * @tags Users
   * @name UsersGetEvaluationVotesByUserIdAndVoter
   * @summary Get evaluation votes by user id and voter
   * @request GET:/users/{userId}/evaluation-vote/voter/{userIdVoter}
   * @response `200` `PbGetEvaluationVotesByUserIdAndVoterResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersGetEvaluationVotesByUserIdAndVoter = (
    userId: number,
    userIdVoter: number,
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetEvaluationVotesByUserIdAndVoterResponse, RpcStatus>({
      path: `/users/${userId}/evaluation-vote/voter/${userIdVoter}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description delete evaluation vote
   *
   * @tags Users
   * @name UsersDeleteEvaluationVote
   * @summary Delete evaluation vote
   * @request DELETE:/users/{userId}/evaluation-vote/{evaluationId}/voter/{userIdVoter}
   * @response `200` `PbDeleteEvaluationVoteResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersDeleteEvaluationVote = (
    userId: number,
    evaluationId: number,
    userIdVoter: number,
    params: RequestParams = {},
  ) =>
    this.http.request<PbDeleteEvaluationVoteResponse, RpcStatus>({
      path: `/users/${userId}/evaluation-vote/${evaluationId}/voter/${userIdVoter}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description use this API to update user introduction
   *
   * @tags Users
   * @name UsersUpdateUserIntroduction
   * @summary Update user introduction
   * @request PATCH:/users/{userId}/introduction
   * @response `200` `PbViewPost` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersUpdateUserIntroduction = (
    userId: number,
    body: {
      content?: string;
      saveAsDraft?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewPost, RpcStatus>({
      path: `/users/${userId}/introduction`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description gets list of worlds that the creator is part of
   *
   * @tags Users
   * @name UsersGetUserModules
   * @summary Get creator's worlds
   * @request GET:/users/{userId}/modules
   * @response `200` `PbGetUserModulesResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersGetUserModules = (userId: number, params: RequestParams = {}) =>
    this.http.request<PbGetUserModulesResponse, RpcStatus>({
      path: `/users/${userId}/modules`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description get posts of user by userID
   *
   * @tags Users
   * @name UsersGetUserPosts
   * @summary Get user posts
   * @request GET:/users/{userId}/posts
   * @response `200` `PbGetUserPostsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersGetUserPosts = (
    userId: number,
    query?: {
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetUserPostsResponse, RpcStatus>({
      path: `/users/${userId}/posts`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description removes role from user
   *
   * @tags Users
   * @name UsersRemoveRoleFromUser
   * @summary Remove role from user
   * @request DELETE:/users/{userId}/roles/{roleId}
   * @response `200` `PbRemoveRoleFromUserResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersRemoveRoleFromUser = (userId: number, roleId: number, params: RequestParams = {}) =>
    this.http.request<PbRemoveRoleFromUserResponse, RpcStatus>({
      path: `/users/${userId}/roles/${roleId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
}
