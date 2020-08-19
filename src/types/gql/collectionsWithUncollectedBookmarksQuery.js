"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.collectionsWithUncollectedBookmarksQuery = graphql_tag_1.default("query collectionsWithUncollectedBookmarks {\n  collections {\n    id\n    title\n    description\n    ownerId\n    bookmarks {\n      id\n      link\n      title\n      description\n      ownerId\n      collectionId\n      createdAt\n    }\n    createdAt\n  }\n  uncollectedBookmarks {\n    id\n    link\n    title\n    description\n    ownerId\n    collectionId\n    createdAt\n  }\n}");
