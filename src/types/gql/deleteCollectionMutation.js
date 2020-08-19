"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.deleteCollectionMutation = graphql_tag_1.default("mutation deleteCollection($params: DeleteCollectionParamsInput!) {\n  deleteCollection(params: $params)\n}");
