import qs from "qs";

export interface Filters {
  [key: string]: {
    $eq?: string;
    $ne?: string;
    $lt?: number;
    $lte?: number;
    $gt?: number;
    $gte?: number;
    $in?: string[];
    $nin?: string[];
    $contains?: string;
    $ncontains?: string;
  };
}

export interface Populate {
  [key: string]: {
    fields?: string[];
    populate?: Populate;
  };
}

interface Pagination {
  pageSize?: number;
  page?: number;
}

export interface QueryParams {
  sort?: string[];
  filters?: Filters;
  populate?: Populate;
  fields?: string[];
  pagination?: Pagination;
  publicationState?: string;
  locale?: string[];
}

/**
 * Builds a query string URL for Strapi API.
 * @param {string} endpoint - The endpoint path, e.g., '/api/books'.
 * @param {QueryParams} queryParams - The query parameters object.
 * @returns {string} - The full query string URL.
 */

export const buildQueryURL = (endpoint: string, queryParams: QueryParams): string => {
  const queryString = qs.stringify(queryParams, {
    indices: true,
    addQueryPrefix: true,
    arrayFormat: "brackets",
  });

  return `${endpoint}${queryString}`;
};

// Example usage
const endpoint: string = "/api/books";
const queryParams: QueryParams = {
  sort: ["title:asc"],
  filters: {
    title: {
      $eq: "hello",
    },
  },
  populate: {
    author: {
      fields: ["firstName", "lastName"],
      populate: {
        profile: {
          fields: ["bio", "avatar"],
          populate: {
            socialLinks: {
              fields: ["platform", "url"],
            },
          },
        },
      },
    },
  },
  fields: ["title"],
  pagination: {
    pageSize: 10,
    page: 1,
  },
  publicationState: "live",
  locale: ["en"],
};

const queryURL = buildQueryURL(endpoint, queryParams);
console.log(queryURL);
