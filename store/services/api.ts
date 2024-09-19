import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthResponse, LoginRequest, LoginResponse,
  ShipmentListRequest,
  ShipmentListResponse,
  ShipmentStatusListResponse,
} from "@/types";
import {
  API_SHIPMENT_LIST_DOCTYPE,
  API_SHIPMENT_STATUS_LIST_DOCTYPE,
  API_URL,
  endpoints,
} from "@/constants/Api";

export const shippexApi = createApi({
  reducerPath: "shippexApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ usr, pwd }) => ({
        url: endpoints.login,
        method: "POST",
        body: { usr, pwd },
      }),
    }),
    getLoggedInUser: builder.query<AuthResponse, void>({
      query: () => ({
        url: `/frappe.auth.get_logged_user`,
        method: "GET",
      }),
    }),
    getShipmentList: builder.query<ShipmentListResponse, ShipmentListRequest>({
      query: ({ filters }) => {
        let params: {
          doctype: string;
          fields: string[];
          filters?: string;
        } = {
          doctype: API_SHIPMENT_LIST_DOCTYPE,
          fields: ["*"],
        };

        if (filters) {
          params.filters = JSON.stringify(filters);
        }

        return {
          url: endpoints.getShipmentList,
          method: "GET",
          params,
        };
      },
    }),
    getShipmentStatusList: builder.query<ShipmentStatusListResponse, void>({
      query: () => ({
        url: endpoints.getShipmentList,
        method: "GET",
        params: {
          doctype: API_SHIPMENT_STATUS_LIST_DOCTYPE,
          fields: JSON.stringify(["name", "color"]),
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useGetLoggedInUserQuery,
  useGetShipmentListQuery,
  useGetShipmentStatusListQuery,
} = shippexApi;
