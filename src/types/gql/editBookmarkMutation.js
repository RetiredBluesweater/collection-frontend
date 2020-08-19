"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.editBookmarkMutation = graphql_tag_1.default("mutation editBookmark($params: EditBookmarkParamsInput!) {\n  editBookmark(params: $params) {\n    id\n    link\n    title\n    description\n    ownerId\n    collectionId\n    createdAt\n  }\n}");
