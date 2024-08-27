// Define the response type
export interface RootResponse<T> {
  data: EntityAttributes<T>[];
  meta: {
    pagination: Pagination;
  };
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
