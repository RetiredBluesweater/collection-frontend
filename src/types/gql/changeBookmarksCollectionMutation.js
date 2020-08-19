"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.changeBookmarksCollectionMutation = graphql_tag_1.default("mutation changeBookmarksCollection($params: ChangeBookmarksCollectionParamsInput!) {\n  changeBookmarksCollection(params: $params)\n}");
