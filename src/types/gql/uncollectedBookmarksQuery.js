"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.uncollectedBookmarksQuery = graphql_tag_1.default("query uncollectedBookmarks {\n  uncollectedBookmarks {\n    id\n    link\n    title\n    description\n    ownerId\n    collectionId\n    createdAt\n  }\n}");
