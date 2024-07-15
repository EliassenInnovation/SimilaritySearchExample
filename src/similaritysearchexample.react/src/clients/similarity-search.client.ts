import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Eliassen_Documents_Models_ContentMetaDataReference = z.object({
  contentType: z.string().nullable(),
  fileName: z.string().nullable(),
  metaData: z.record(z.string()).nullish(),
});
const Eliassen_System_ResponseModel_MessageLevels = z.enum([
  "trace",
  "debug",
  "info",
  "warning",
  "error",
  "fatal",
  "unknown",
]);
const Eliassen_System_ResponseModel_ResultMessage = z.object({
  level: Eliassen_System_ResponseModel_MessageLevels.optional(),
  message: z.string().nullable(),
  messageCode: z.string().nullish(),
  context: z.string().nullish(),
  metaData: z.unknown().nullish(),
});
const Eliassen_System_ResponseModel_PagedQueryResult_Eliassen_Documents_Models_ContentMetaDataReference =
  z
    .object({
      rows: z
        .array(Eliassen_Documents_Models_ContentMetaDataReference)
        .nullable(),
      messages: z.array(Eliassen_System_ResponseModel_ResultMessage).nullable(),
      currentPage: z.number().int(),
      totalPageCount: z.number().int(),
      totalRowCount: z.number().int(),
    })
    .partial();
const Eliassen_System_Linq_Search_FilterParameter = z
  .object({
    eq: z.unknown().nullable(),
    neq: z.unknown().nullable(),
    in: z.array(z.unknown()).nullable(),
    gt: z.unknown().nullable(),
    gte: z.unknown().nullable(),
    lt: z.unknown().nullable(),
    lte: z.unknown().nullable(),
  })
  .partial();
const Eliassen_System_Linq_Search_OrderDirections = z.enum(["asc", "desc"]);
const Eliassen_System_Linq_Search_SearchQuery_Eliassen_Documents_Models_ContentMetaDataReference =
  z
    .object({
      currentPage: z.number().int(),
      pageSize: z.number().int(),
      excludePageCount: z.boolean(),
      searchTerm: z.string().nullable(),
      filter: z
        .object({
          contentType: Eliassen_System_Linq_Search_FilterParameter,
          fileName: Eliassen_System_Linq_Search_FilterParameter,
          metaData: Eliassen_System_Linq_Search_FilterParameter,
        })
        .partial()
        .passthrough()
        .nullable(),
      orderBy: z
        .object({
          contentType: Eliassen_System_Linq_Search_OrderDirections,
          fileName: Eliassen_System_Linq_Search_OrderDirections,
          metaData: Eliassen_System_Linq_Search_OrderDirections,
        })
        .partial()
        .passthrough()
        .nullable(),
    })
    .partial();
const Eliassen_Search_Models_SearchResultModel = z.object({
  score: z.number(),
  itemId: z.string().nullable(),
  metaData: z.object({}).partial().passthrough().nullish(),
});

export const schemas = {
  Eliassen_Documents_Models_ContentMetaDataReference,
  Eliassen_System_ResponseModel_MessageLevels,
  Eliassen_System_ResponseModel_ResultMessage,
  Eliassen_System_ResponseModel_PagedQueryResult_Eliassen_Documents_Models_ContentMetaDataReference,
  Eliassen_System_Linq_Search_FilterParameter,
  Eliassen_System_Linq_Search_OrderDirections,
  Eliassen_System_Linq_Search_SearchQuery_Eliassen_Documents_Models_ContentMetaDataReference,
  Eliassen_Search_Models_SearchResultModel,
};

const endpoints = makeApi([
  {
    method: "delete",
    path: "/Document/Delete",
    alias: "deleteDocumentDelete",
    requestFormat: "json",
    parameters: [
      {
        name: "file",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.instanceof(File),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/Document/Download",
    alias: "getDocumentDownload",
    requestFormat: "json",
    parameters: [
      {
        name: "file",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.instanceof(File),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/Document/List",
    alias: "getDocumentList",
    requestFormat: "json",
    parameters: [
      {
        name: "currentPage",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "excludePageCount",
        type: "Query",
        schema: z.boolean().optional(),
      },
      {
        name: "searchTerm",
        type: "Query",
        schema: z.string().nullish(),
      },
      {
        name: "orderBy.ContentType",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
      {
        name: "orderBy.FileName",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
      {
        name: "orderBy.MetaData",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
    ],
    response:
      Eliassen_System_ResponseModel_PagedQueryResult_Eliassen_Documents_Models_ContentMetaDataReference,
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/Document/List",
    alias: "postDocumentList",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema:
          Eliassen_System_Linq_Search_SearchQuery_Eliassen_Documents_Models_ContentMetaDataReference,
      },
    ],
    response:
      Eliassen_System_ResponseModel_PagedQueryResult_Eliassen_Documents_Models_ContentMetaDataReference,
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "put",
    path: "/Document/Store",
    alias: "putDocumentStore",
    requestFormat: "form-data",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).passthrough(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/Document/Upload",
    alias: "postDocumentUpload",
    requestFormat: "form-data",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z
          .object({ content: z.instanceof(File) })
          .partial()
          .passthrough(),
      },
      {
        name: "file",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "sourceContentType",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "overwrite",
        type: "Query",
        schema: z.boolean().optional().default(false),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/health",
    alias: "getHealth",
    requestFormat: "json",
    response: z
      .object({ status: z.string(), errors: z.array(z.any()) })
      .partial()
      .passthrough(),
  },
  {
    method: "delete",
    path: "/Summaries/Delete",
    alias: "deleteSummariesDelete",
    requestFormat: "json",
    parameters: [
      {
        name: "file",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.instanceof(File),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/Summaries/Download",
    alias: "getSummariesDownload",
    requestFormat: "json",
    parameters: [
      {
        name: "file",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.instanceof(File),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/Summaries/List",
    alias: "getSummariesList",
    requestFormat: "json",
    parameters: [
      {
        name: "currentPage",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "excludePageCount",
        type: "Query",
        schema: z.boolean().optional(),
      },
      {
        name: "searchTerm",
        type: "Query",
        schema: z.string().nullish(),
      },
      {
        name: "orderBy.ContentType",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
      {
        name: "orderBy.FileName",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
      {
        name: "orderBy.MetaData",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
    ],
    response:
      Eliassen_System_ResponseModel_PagedQueryResult_Eliassen_Documents_Models_ContentMetaDataReference,
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/Summaries/List",
    alias: "postSummariesList",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema:
          Eliassen_System_Linq_Search_SearchQuery_Eliassen_Documents_Models_ContentMetaDataReference,
      },
    ],
    response:
      Eliassen_System_ResponseModel_PagedQueryResult_Eliassen_Documents_Models_ContentMetaDataReference,
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "put",
    path: "/Summaries/Store",
    alias: "putSummariesStore",
    requestFormat: "form-data",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).passthrough(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/TextDocument/Delete",
    alias: "deleteTextDocumentDelete",
    requestFormat: "json",
    parameters: [
      {
        name: "file",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.instanceof(File),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/TextDocument/Download",
    alias: "getTextDocumentDownload",
    requestFormat: "json",
    parameters: [
      {
        name: "file",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.instanceof(File),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/TextDocument/List",
    alias: "getTextDocumentList",
    requestFormat: "json",
    parameters: [
      {
        name: "currentPage",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "pageSize",
        type: "Query",
        schema: z.number().int().optional(),
      },
      {
        name: "excludePageCount",
        type: "Query",
        schema: z.boolean().optional(),
      },
      {
        name: "searchTerm",
        type: "Query",
        schema: z.string().nullish(),
      },
      {
        name: "orderBy.ContentType",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
      {
        name: "orderBy.FileName",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
      {
        name: "orderBy.MetaData",
        type: "Query",
        schema: z.enum(["asc", "desc"]).optional(),
      },
    ],
    response:
      Eliassen_System_ResponseModel_PagedQueryResult_Eliassen_Documents_Models_ContentMetaDataReference,
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/TextDocument/List",
    alias: "postTextDocumentList",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema:
          Eliassen_System_Linq_Search_SearchQuery_Eliassen_Documents_Models_ContentMetaDataReference,
      },
    ],
    response:
      Eliassen_System_ResponseModel_PagedQueryResult_Eliassen_Documents_Models_ContentMetaDataReference,
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "put",
    path: "/TextDocument/Store",
    alias: "putTextDocumentStore",
    requestFormat: "form-data",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({}).passthrough(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/Vector/List",
    alias: "getVectorList",
    requestFormat: "json",
    response: z.array(Eliassen_Search_Models_SearchResultModel),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/Vector/List",
    alias: "postVectorList",
    requestFormat: "json",
    response: z.array(Eliassen_Search_Models_SearchResultModel),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/Vector/Query",
    alias: "postVectorQuery",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.array(z.number()),
      },
    ],
    response: z.array(Eliassen_Search_Models_SearchResultModel),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/Vector/QueryGrouped",
    alias: "postVectorQueryGrouped",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.array(z.number()),
      },
      {
        name: "groupBy",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Eliassen_Search_Models_SearchResultModel),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/Vector/Search",
    alias: "getVectorSearch",
    requestFormat: "json",
    parameters: [
      {
        name: "query",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Eliassen_Search_Models_SearchResultModel),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/Vector/SearchGrouped",
    alias: "getVectorSearchGrouped",
    requestFormat: "json",
    parameters: [
      {
        name: "query",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "groupBy",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Eliassen_Search_Models_SearchResultModel),
    errors: [
      {
        status: 404,
        description: `Not Found`,
        schema: z.void(),
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
