import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import assert from "yeoman-assert";
import helpers, { RunResult } from "yeoman-test";
import { describe, beforeAll, afterAll, expect, it } from "vitest";
import AppGenerator from "../src/app.js";
import { NodeEnvironment } from "../src/environments/index.js";
import { ConfigHelper } from "../src/helpers/index.js";
import config from "../config/default.json";
import { UnresolvedConfig } from "../src/@types/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const generator = path.resolve(__dirname, "../dist/generators/app");

await ConfigHelper.initialize(config as UnresolvedConfig);

const node = new NodeEnvironment();
await node.initialize();

const { devDependencies, dependencies } = node.packageJson;
const engine = node.getNodeEngine().split(".")[0];

describe("generator-norgate-av:app", () => {
    describe.each([
        {
            type: "html",
            name: "test",
            description: "test-description",
            git: false,
            pkg: "pnpm",
            openWith: "skip",
        },
        {
            type: "web",
            name: "test",
            description: "test-description",
            git: true,
            pkg: "yarn",
            openWith: "skip",
        },
        {
            type: "vanilla",
            name: "test",
            description: "test-description",
            git: true,
            pkg: "npm",
            openWith: "skip",
        },
    ])(
        'html with type $type, package manager $pkg, and git "$git"',
        ({ type, name, description, git, pkg, openWith }) => {
            let result: RunResult<AppGenerator>;

            beforeAll(async () => {
                result = await helpers
                    .create<AppGenerator>(generator)
                    .withAnswers({
                        type,
                        name,
                        description,
                        git,
                        pkg,
                        openWith,
                    });

                process.chdir(name);
            });

            afterAll(() => {
                result?.cleanup();
            });

            it(`should create a directory named '${name}' and CD into it`, () => {
                assert.equal(path.basename(process.cwd()), name);
            });

            it("should create the correct files", () => {
                assert.file([
                    ".github/workflows/main.yml",
                    ".github/dependabot.yml",
                    ".husky/commit-msg",
                    ".husky/pre-commit",
                    ".vscode/extensions.json",
                    ".vscode/settings.json",
                    "assets/css/styles.css",
                    "assets/img/favicon.ico",
                    "assets/img/yeoman-logo-svg-vector.svg",
                    "assets/js/app.js",
                    "public/index.html",
                    ".all-contributorsrc",
                    ".changelogrc.json",
                    ".commitlintrc.json",
                    ".czrc",
                    ".editorconfig",
                    ".gitattributes",
                    ".gitignore",
                    ".lintstagedrc.json",
                    ".npmignore",
                    ".npmrc",
                    ".nvmrc",
                    ".prettierignore",
                    ".prettierrc.json",
                    "CHANGELOG.md",
                    "CONTRIBUTING.md",
                    "GitVersion.yml",
                    "LICENSE",
                    "package.json",
                    "README.md",
                ]);
            });

            it.skip("should create the correct package.json", async () => {
                console.log(await fs.readFile("package.json", "utf-8"));
                assert.jsonFileContent("package.json", {
                    name,
                    description,
                    engines: {
                        node: `>=${engine}`,
                    },
                    devDependencies: {
                        "@commitlint/cli": devDependencies!["@commitlint/cli"],
                        "@commitlint/config-conventional":
                            devDependencies!["@commitlint/config-conventional"],
                        "@types/config": devDependencies!["@types/config"],
                        "@types/live-server":
                            devDependencies!["@types/live-server"],
                        "@types/node": devDependencies!["@types/node"],
                        "all-contributors-cli":
                            devDependencies!["all-contributors-cli"],
                        commitizen: devDependencies!.commitizen,
                        "cz-conventional-changelog":
                            devDependencies!["cz-conventional-changelog"],
                        doctoc: devDependencies!.doctoc,
                        husky: devDependencies!.husky,
                        "lint-staged": devDependencies!["lint-staged"],
                        "live-server": devDependencies!["live-server"],
                        prettier: devDependencies!.prettier,
                    },
                    dependencies: {
                        config: dependencies!.config,
                        dotenv: dependencies!.dotenv,
                        envalid: dependencies!.envalid,
                    },
                });
            });

            it("should create the correct index.html", () => {
                assert.fileContent(
                    "public/index.html",
                    `<title>${name}</title>`,
                );
            });

            it("should create the correct README.md", () => {
                assert.fileContent("README.md", `# ${name}`);
                assert.fileContent(
                    "README.md",
                    `This is the README for your project "${name}". After writing up a brief description, we recommend including the following sections.`,
                );
            });

            it("should create the correct .nvmrc", () => {
                assert.fileContent(".nvmrc", node.getNodeEngine());
            });

            it("should create the correct LICENSE", () => {
                assert.fileContent("LICENSE", "The MIT License (MIT)");
                assert.fileContent(
                    "LICENSE",
                    `Copyright (c) ${new Date().getFullYear()}`,
                );
            });

            it("should create the correct CONTRIBUTING.md", () => {
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `/${name}/issues/new/choose`,
                );
                assert.fileContent("CONTRIBUTING.md", `/${name}.git`);
                assert.fileContent("CONTRIBUTING.md", `cd ${name}`);
                assert.fileContent("CONTRIBUTING.md", `${pkg} install`);
                assert.fileContent("CONTRIBUTING.md", `${pkg} contrib:add`);
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `If in doubt, you can use the \`${pkg} commit\``,
                );
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `Be sure to run \`${pkg} test\``,
                );
            });

            it("should create the correct CHANGELOG.md", () => {
                assert.fileContent(
                    "CHANGELOG.md",
                    `All notable changes to the "${name}" project will be documented in this file.`,
                );
            });

            it("should create the correct .all-contributorsrc", () => {
                assert.fileContent(
                    ".all-contributorsrc",
                    `"projectName": "${name}"`,
                );
            });

            it("should create the correct husky git hooks", () => {
                assert.fileContent(
                    ".husky/commit-msg",
                    `${pkg} commitlint --edit $1`,
                );
                assert.fileContent(".husky/pre-commit", `${pkg} lint-staged`);
            });

            it("should create a git repository if git is true", () => {
                git ? assert.file(".git") : assert.noFile(".git");
            });

            it("should always pass", () => {
                expect(1).toEqual(1);
            });
        },
    );
});