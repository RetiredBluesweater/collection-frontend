"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.changeBookmarksCollectionMutation = graphql_tag_1.default("mutation changeBookmarksCollection($params: ChangeBookmarksCollectionParamsInput!) {\n  changeBookmarksCollection(params: $params) {\n    id\n    link\n    title\n    description\n    ownerId\n    collectionId\n    createdAt\n  }\n}");
