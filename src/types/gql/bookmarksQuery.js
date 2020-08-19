"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.bookmarksQuery = graphql_tag_1.default("query bookmarks {\n  bookmarks {\n    id\n    link\n    title\n    description\n    ownerId\n    collectionId\n    createdAt\n  }\n}");
