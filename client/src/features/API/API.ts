import { cookieManager } from "@/utils/cookie-manager";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL as string,
    prepareHeaders: (headers) => {
      const token = cookieManager.getCookie("jwtToken");
      if (token) headers.set("authorization", `Bearer ${token}`);
    },
  }),
  endpoints: () => ({}),
  tagTypes: [],
});
