import { QueryParams } from "@/utils/get-query-params";

// Define the response type
export interface RootResponse<T> {
  status: string;
  statusCode: number;
  message: string;
  data: T;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface EntityAttributes<T> {
  id: number;
  attributes: T;
}

export interface SingleEntityAttributes<T> {
  data: EntityAttributes<T>;
}

export interface MultipleEntityAttributes<T> {
  data: EntityAttributes<T>[];
}

export interface ReadDataByIdQueryType {
  id: string;
  queryParams?: QueryParams;
}
