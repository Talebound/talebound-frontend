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
  PbGetMapLayersResponse,
  PbGetMapPinTypesResponse,
  PbGetMapPinsResponse,
  PbMapPinType,
  PbPinShape,
  PbUpdateMapPinTypeResponse,
  PbViewMap,
  PbViewMapLayer,
  PbViewMapPin,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Maps<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description updates map properties
   *
   * @tags Maps
   * @name MapsUpdateMap
   * @summary Update map
   * @request PATCH:/maps/{mapId}
   * @response `200` `PbViewMap` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsUpdateMap = (
    mapId: number,
    body: {
      name?: string;
      type?: string;
      description?: string;
      /** @format int32 */
      width?: number;
      /** @format int32 */
      height?: number;
      /** @format int32 */
      thumbnailImageId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewMap, RpcStatus>({
      path: `/maps/${mapId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description returns layers of the map
   *
   * @tags Maps
   * @name MapsGetMapLayers
   * @summary Get map layers
   * @request GET:/maps/{mapId}/layers
   * @response `200` `PbGetMapLayersResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsGetMapLayers = (mapId: number, params: RequestParams = {}) =>
    this.http.request<PbGetMapLayersResponse, RpcStatus>({
      path: `/maps/${mapId}/layers`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description creates a new layer for the map
   *
   * @tags Maps
   * @name MapsCreateMapLayer
   * @summary Create map layer
   * @request POST:/maps/{mapId}/layers
   * @response `200` `PbViewMapLayer` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsCreateMapLayer = (
    mapId: number,
    body: {
      name?: string;
      /** @format int32 */
      imageId?: number;
      isMain?: boolean;
      enabled?: boolean;
      sublayer?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewMapLayer, RpcStatus>({
      path: `/maps/${mapId}/layers`,
      method: 'POST',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes a layer from the map
   *
   * @tags Maps
   * @name MapsDeleteMapLayer
   * @summary Delete map layer
   * @request DELETE:/maps/{mapId}/layers/{layerId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsDeleteMapLayer = (mapId: number, layerId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/maps/${mapId}/layers/${layerId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates layer properties
   *
   * @tags Maps
   * @name MapsUpdateMapLayer
   * @summary Update map layer
   * @request PATCH:/maps/{mapId}/layers/{layerId}
   * @response `200` `PbViewMapLayer` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsUpdateMapLayer = (
    mapId: number,
    layerId: number,
    body: {
      name?: string;
      /** @format int32 */
      imageId?: number;
      isMain?: boolean;
      enabled?: boolean;
      sublayer?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewMapLayer, RpcStatus>({
      path: `/maps/${mapId}/layers/${layerId}`,
      method: 'PATCH',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description returns pin types of the map
   *
   * @tags Maps
   * @name MapsGetMapPinTypes
   * @summary Get map pin types
   * @request GET:/maps/{mapId}/pin_types
   * @response `200` `PbGetMapPinTypesResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsGetMapPinTypes = (mapId: number, params: RequestParams = {}) =>
    this.http.request<PbGetMapPinTypesResponse, RpcStatus>({
      path: `/maps/${mapId}/pin_types`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description creates a new pin type for the map
   *
   * @tags Maps
   * @name MapsCreateMapPinType
   * @summary Create map pin type
   * @request POST:/maps/{mapId}/pin_types
   * @response `200` `PbMapPinType` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsCreateMapPinType = (
    mapId: number,
    body: {
      shape?: PbPinShape;
      backgroundColor?: string;
      borderColor?: string;
      iconColor?: string;
      icon?: string;
      /** @format int32 */
      iconSize?: number;
      /** @format int32 */
      width?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbMapPinType, RpcStatus>({
      path: `/maps/${mapId}/pin_types`,
      method: 'POST',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes a pin type from the map
   *
   * @tags Maps
   * @name MapsDeleteMapPinType
   * @summary Delete map pin type
   * @request DELETE:/maps/{mapId}/pin_types/{pinTypeId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsDeleteMapPinType = (mapId: number, pinTypeId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/maps/${mapId}/pin_types/${pinTypeId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates pin type properties
   *
   * @tags Maps
   * @name MapsUpdateMapPinType
   * @summary Update map pin type
   * @request PATCH:/maps/{mapId}/pin_types/{pinTypeId}
   * @response `200` `PbUpdateMapPinTypeResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsUpdateMapPinType = (
    mapId: number,
    pinTypeId: number,
    body: {
      shape?: PbPinShape;
      backgroundColor?: string;
      borderColor?: string;
      iconColor?: string;
      icon?: string;
      /** @format int32 */
      iconSize?: number;
      /** @format int32 */
      width?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbUpdateMapPinTypeResponse, RpcStatus>({
      path: `/maps/${mapId}/pin_types/${pinTypeId}`,
      method: 'PATCH',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description returns pins of the map
   *
   * @tags Maps
   * @name MapsGetMapPins
   * @summary Get map pins
   * @request GET:/maps/{mapId}/pins
   * @response `200` `PbGetMapPinsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsGetMapPins = (mapId: number, params: RequestParams = {}) =>
    this.http.request<PbGetMapPinsResponse, RpcStatus>({
      path: `/maps/${mapId}/pins`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description creates a new pin for the map
   *
   * @tags Maps
   * @name MapsCreateMapPin
   * @summary Create map pin
   * @request POST:/maps/{mapId}/pins
   * @response `200` `PbViewMapPin` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsCreateMapPin = (
    mapId: number,
    body: {
      /** @format int32 */
      mapPinTypeId?: number;
      name?: string;
      /** @format int32 */
      locationId?: number;
      /** @format int32 */
      mapLayerId?: number;
      /** @format int32 */
      x?: number;
      /** @format int32 */
      y?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewMapPin, RpcStatus>({
      path: `/maps/${mapId}/pins`,
      method: 'POST',
      body: body,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes a pin from the map
   *
   * @tags Maps
   * @name MapsDeleteMapPin
   * @summary Delete map pin
   * @request DELETE:/maps/{mapId}/pins/{pinId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsDeleteMapPin = (mapId: number, pinId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/maps/${mapId}/pins/${pinId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates pin properties
   *
   * @tags Maps
   * @name MapsUpdateMapPin
   * @summary Update map pin
   * @request PATCH:/maps/{mapId}/pins/{pinId}
   * @response `200` `PbViewMapPin` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  mapsUpdateMapPin = (
    mapId: number,
    pinId: number,
    body: {
      /** @format int32 */
      mapPinTypeId?: number;
      name?: string;
      /** @format int32 */
      locationId?: number;
      /** @format int32 */
      mapLayerId?: number;
      /** @format int32 */
      x?: number;
      /** @format int32 */
      y?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewMapPin, RpcStatus>({
      path: `/maps/${mapId}/pins/${pinId}`,
      method: 'PATCH',
      body: body,
      format: 'json',
      ...params,
    });
}