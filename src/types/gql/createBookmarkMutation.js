"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.createBookmarkMutation = graphql_tag_1.default("mutation createBookmark($params: CreateBookmarkParamsInput!) {\n  createBookmark(params: $params) {\n    id\n    link\n    title\n    description\n    ownerId\n    collectionId\n    createdAt\n  }\n}");
