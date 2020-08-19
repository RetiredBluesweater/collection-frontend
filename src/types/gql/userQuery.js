"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = require("graphql-tag");
exports.userQuery = graphql_tag_1.default("query user {\n  user {\n    isAdmin\n    vkUserId\n    firstName\n    lastName\n    photo\n  }\n}");
