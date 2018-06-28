/* eslint-disable node/no-unpublished-require */

const gulp = require("gulp");

const {lint, docs, test_legacy, readme, scm_clean} = require("scramjet-core/scripts/tasks");
const {tsd} = require("scramjet/scripts/tasks");

const FILES = [
    "./index.js",
    "./lib/entry-reporter.js",
    "./lib/entry.js",
    "./lib/jetlog.js"
];

gulp.task("lint", lint());
gulp.task("test", test_legacy("test/**/*.js"));
gulp.task("scm_clean", scm_clean());
gulp.task("make_docs", docs(FILES.slice(), {plugin: "scramjet-core/jsdoc2md/plugin-docs.js"}, "docs/"));

gulp.task("tsd", tsd(FILES.slice(), {
    plugins: ["./node_modules/scramjet-core/jsdoc2md/plugin-tsd.js"],
    opts: {
        "tags": {
            "allowUnknownTags": true,
            "dictionaries": ["jsdoc","closure"]
        },
        template: "@otris/jsdoc-tsd/src-out/core",
        destination: ".d.ts/jetlog.d.ts"
    }
}));

gulp.task("docs", gulp.series("tsd", "make_docs"));
gulp.task("fulltest", gulp.series("lint", "test"));
gulp.task("default", gulp.series("docs", "fulltest"));
gulp.task("prerelease", gulp.series("default", "scm_clean"));
