"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
exports.schema = schema_1.default;
__export(require("./schema"));
__export(require("./changeBookmarksCollectionMutation"));
__export(require("./createBookmarkMutation"));
__export(require("./createCollectionMutation"));
__export(require("./deleteBookmarkMutation"));
__export(require("./deleteCollectionMutation"));
__export(require("./editBookmarkMutation"));
__export(require("./editCollectionMutation"));
__export(require("./registerMutation"));
__export(require("./bookmarksQuery"));
__export(require("./collectionsQuery"));
__export(require("./collectionsWithUncollectedBookmarksQuery"));
__export(require("./uncollectedBookmarksQuery"));
__export(require("./userQuery"));
