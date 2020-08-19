"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.editCollectionMutation = graphql_tag_1.default("mutation editCollection($params: EditCollectionParamsInput!) {\n  editCollection(params: $params) {\n    id\n    title\n    description\n    ownerId\n    bookmarks {\n      id\n      link\n      title\n      description\n      ownerId\n      collectionId\n      createdAt\n    }\n    createdAt\n  }\n}");
