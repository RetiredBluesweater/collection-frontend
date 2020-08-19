"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.deleteBookmarkMutation = graphql_tag_1.default("mutation deleteBookmark($params: DeleteBookmarkParamsInput!) {\n  deleteBookmark(params: $params)\n}");
