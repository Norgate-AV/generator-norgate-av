import path from "node:path";
import { fileURLToPath } from "node:url";
import assert from "yeoman-assert";
import helpers, { RunResult } from "yeoman-test";
import { describe, beforeAll, afterAll, expect, it } from "vitest";
import AppGenerator from "../src/app.js";
import { NodeEnvironment } from "../src/environments/index.js";
import { ConfigHelper } from "../src/helpers/index.js";
import config from "../config/default.json";
import { UnresolvedConfig, NodePackageManager } from "../src/@types/index.js";
import {
    assertAllContributorsRc,
    assertChangeLog,
    assertContributing,
    assertHuskyGitHooks,
    assertLicense,
    assertOptionValues,
    assertReadMe,
    getNodeDependencyObject,
} from "./helpers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const generator = path.resolve(__dirname, "../dist/generators/app");

await ConfigHelper.initialize(config as UnresolvedConfig);

const node = new NodeEnvironment();
await node.initialize();

const engine = node.getNodeEngine().split(".")[0];

const devDependencies = [
    "@commitlint/config-conventional",
    "@semantic-release/changelog",
    "@semantic-release/git",
    "@types/config",
    "@types/node",
    "@types/nodemon",
    "all-contributors-cli",
    "commitizen",
    "cross-env",
    "cz-conventional-changelog",
    "doctoc",
    "eslint",
    "eslint-config-prettier",
    "husky",
    "lint-staged",
    "nodemon",
    "prettier",
    "semantic-release",
];

const dependencies = ["config", "dotenv", "envalid"];

const files = [
    ".github/workflows/main.yml",
    ".github/dependabot.yml",
    ".husky/commit-msg",
    ".husky/pre-commit",
    ".vscode/extensions.json",
    ".vscode/launch.json",
    ".vscode/settings.json",
    "src/app.js",
    "tests/app.test.js",
    ".all-contributorsrc",
    ".changelogrc.json",
    ".commitlintrc.json",
    ".czrc",
    ".editorconfig",
    ".eslintrc.json",
    ".gitattributes",
    ".gitignore",
    ".lintstagedrc.json",
    ".npmignore",
    ".npmrc",
    ".nvmrc",
    ".prettierignore",
    ".prettierrc.json",
    ".releaserc.json",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "GitVersion.yml",
    "LICENSE",
    "package.json",
    "README.md",
    "vitest.config.js",
];

describe("generator-norgate-av:javascript", () => {
    describe.each([
        {
            type: "javascript",
            name: "test",
            id: "test-id",
            description: "test-description",
            author: "Yeoman",
            git: false,
            pkg: "pnpm",
            openWith: "skip",
        },
        {
            type: "js",
            name: "test",
            id: "test-id",
            description: "test-description",
            author: "Yeoman",
            git: true,
            pkg: "yarn",
            openWith: "skip",
        },
        {
            type: "node-js",
            name: "test",
            id: "test-id",
            description: "test-description",
            author: "Yeoman",
            git: true,
            pkg: "npm",
            openWith: "skip",
        },
    ])(
        "prompts: app --type $type --name $name --id $id --description $description --author $author --git $git --pkg $pkg --openWith $openWith",
        ({ type, name, id, description, author, git, pkg, openWith }) => {
            let result: RunResult<AppGenerator>;

            beforeAll(async () => {
                result = await helpers
                    .create<AppGenerator>(generator)
                    .withAnswers({
                        type,
                        name,
                        id,
                        description,
                        author,
                        git,
                        pkg,
                        openWith,
                    });

                process.chdir(name);
            });

            afterAll(() => {
                result?.cleanup();
            });

            it("should assign the correct values", () => {
                assertOptionValues(result, {
                    type,
                    name,
                    id,
                    description,
                    author,
                    git,
                    pkg: pkg as NodePackageManager,
                });
            });

            it(`should create a directory named '${name}' and CD into it`, () => {
                assert.equal(path.basename(process.cwd()), name);
            });

            it("should create the correct files", () => {
                assert.file(files);
            });

            it("should create the correct package.json", () => {
                assert.jsonFileContent("package.json", {
                    name: id,
                    displayName: name,
                    description,
                    author,
                    engines: {
                        node: `>=${engine}`,
                    },
                    devDependencies: getNodeDependencyObject(
                        devDependencies,
                        node.packageJson.devDependencies as Record<
                            string,
                            string
                        >,
                    ),
                    dependencies: getNodeDependencyObject(
                        dependencies,
                        node.packageJson.dependencies as Record<string, string>,
                    ),
                });
            });

            it("should create the correct README.md", () => {
                assertReadMe("README.md", { id });
            });

            it("should create the correct .nvmrc", () => {
                assert.fileContent(".nvmrc", node.getNodeEngine());
            });

            it("should create the correct LICENSE", () => {
                assertLicense("LICENSE", { author });
            });

            it("should create the correct CONTRIBUTING.md", () => {
                assertContributing("CONTRIBUTING.md", {
                    id,
                    pkg: pkg as NodePackageManager,
                });
            });

            it("should create the correct CHANGELOG.md", () => {
                assertChangeLog("CHANGELOG.md", { id });
            });

            it("should create the correct .all-contributorsrc", () => {
                assertAllContributorsRc(".all-contributorsrc", { id, author });
            });

            it("should create the correct husky git hooks", () => {
                assertHuskyGitHooks({ pkg: pkg as NodePackageManager });
            });

            it.skipIf(process.env.CI)(
                "should create a git repository if git is true",
                () => {
                    git ? assert.file(".git") : assert.noFile(".git");
                },
            );

            it("should always pass", () => {
                expect(1).toEqual(1);
            });
        },
    );

    describe.each([
        {
            destination: "test",
            type: "javascript",
            id: "test-id",
            description: "test-description",
            author: "Yeoman",
            git: false,
            pkg: "pnpm",
            yes: true,
        },
        {
            destination: "test",
            type: "js",
            id: "test-id",
            description: "test-description",
            author: "Yeoman",
            git: true,
            pkg: "yarn",
            yes: true,
        },
        {
            destination: "test",
            type: "node-js",
            id: "test-id",
            description: "test-description",
            author: "Yeoman",
            git: true,
            pkg: "npm",
            yes: true,
        },
    ])(
        "cli: app $destination --type $type --id $id --description $description --author $author --git $git --pkg $pkg --yes $yes",
        ({ destination, type, id, description, author, git, pkg, yes }) => {
            let result: RunResult<AppGenerator>;

            beforeAll(async () => {
                result = await helpers
                    .create<AppGenerator>(generator)
                    .withArguments([destination])
                    .withOptions({
                        type,
                        id,
                        description,
                        author,
                        git,
                        pkg: pkg as NodePackageManager,
                        yes,
                    });

                process.chdir(destination);
            });

            afterAll(() => {
                result?.cleanup();
            });

            it("should assign the correct values", () => {
                assertOptionValues(result, {
                    type,
                    id,
                    name: destination,
                    description,
                    author,
                    git,
                    pkg: pkg as NodePackageManager,
                });
            });

            it(`should create a directory named '${destination}' and CD into it`, () => {
                assert.equal(path.basename(process.cwd()), destination);
            });

            it("should create the correct files", () => {
                assert.file(files);
            });

            it("should create the correct package.json", () => {
                assert.jsonFileContent("package.json", {
                    name: id,
                    displayName: destination,
                    description,
                    author,
                    engines: {
                        node: `>=${engine}`,
                    },
                    devDependencies: getNodeDependencyObject(
                        devDependencies,
                        node.packageJson.devDependencies as Record<
                            string,
                            string
                        >,
                    ),
                    dependencies: getNodeDependencyObject(
                        dependencies,
                        node.packageJson.dependencies as Record<string, string>,
                    ),
                });
            });

            it("should create the correct README.md", () => {
                assertReadMe("README.md", { id });
            });

            it("should create the correct .nvmrc", () => {
                assert.fileContent(".nvmrc", node.getNodeEngine());
            });

            it("should create the correct LICENSE", () => {
                assertLicense("LICENSE", { author });
            });

            it("should create the correct CONTRIBUTING.md", () => {
                assertContributing("CONTRIBUTING.md", {
                    id,
                    pkg: pkg as NodePackageManager,
                });
            });

            it("should create the correct CHANGELOG.md", () => {
                assertChangeLog("CHANGELOG.md", { id });
            });

            it("should create the correct .all-contributorsrc", () => {
                assertAllContributorsRc(".all-contributorsrc", { id, author });
            });

            it("should create the correct husky git hooks", () => {
                assertHuskyGitHooks({ pkg: pkg as NodePackageManager });
            });

            it.skipIf(process.env.CI)(
                "should create a git repository if git is true",
                () => {
                    git ? assert.file(".git") : assert.noFile(".git");
                },
            );

            it("should always pass", () => {
                expect(1).toEqual(1);
            });
        },
    );

    describe.each([
        {
            destination: "Test Project",
            type: "javascript",
            yes: true,
        },
        {
            destination: "Test Project",
            type: "js",
            yes: true,
        },
        {
            destination: "Test Project",
            type: "node-js",
            yes: true,
        },
    ])(
        "cli: using all defaults, skipping prompts",
        ({ destination, type, yes }) => {
            let result: RunResult<AppGenerator>;

            beforeAll(async () => {
                result = await helpers
                    .create<AppGenerator>(generator)
                    .withArguments([destination])
                    .withOptions({
                        type,
                        yes,
                    });

                process.chdir(destination);
            });

            afterAll(() => {
                result?.cleanup();
            });

            it("should assign the correct default values", async () => {
                assertOptionValues(result, {
                    type,
                    name: destination,
                    id: "test-project",
                    description: "",
                    author: process.env.CI
                        ? ""
                        : (await result.generator.git.name()) || "",
                    git: !process.env.CI,
                    pkg: "pnpm",
                });
            });

            it(`should create a directory named '${destination}' and CD into it`, () => {
                assert.equal(path.basename(process.cwd()), destination);
            });

            it("should create the correct files", () => {
                assert.file(files);
            });

            it("should create the correct package.json", () => {
                assert.jsonFileContent("package.json", {
                    name: result.generator.options.id,
                    displayName: destination,
                    description: result.generator.options.description,
                    author: result.generator.options.author,
                    engines: {
                        node: `>=${engine}`,
                    },
                    devDependencies: getNodeDependencyObject(
                        devDependencies,
                        node.packageJson.devDependencies as Record<
                            string,
                            string
                        >,
                    ),
                    dependencies: getNodeDependencyObject(
                        dependencies,
                        node.packageJson.dependencies as Record<string, string>,
                    ),
                });
            });

            it("should create the correct README.md", () => {
                assertReadMe("README.md", { id: result.generator.options.id });
            });

            it("should create the correct .nvmrc", () => {
                assert.fileContent(".nvmrc", node.getNodeEngine());
            });

            it("should create the correct LICENSE", () => {
                assertLicense("LICENSE", {
                    author: result.generator.options.author,
                });
            });

            it("should create the correct CONTRIBUTING.md", () => {
                assertContributing("CONTRIBUTING.md", {
                    id: result.generator.options.id,
                    pkg: result.generator.options.pkg,
                });
            });

            it("should create the correct CHANGELOG.md", () => {
                assertChangeLog("CHANGELOG.md", {
                    id: result.generator.options.id,
                });
            });

            it("should create the correct .all-contributorsrc", () => {
                assertAllContributorsRc(".all-contributorsrc", {
                    id: result.generator.options.id,
                    author: result.generator.options.author,
                });
            });

            it("should create the correct husky git hooks", () => {
                assertHuskyGitHooks({ pkg: result.generator.options.pkg });
            });

            it.skipIf(process.env.CI)(
                "should create a git repository if git is true",
                () => {
                    result.generator.options.git
                        ? assert.file(".git")
                        : assert.noFile(".git");
                },
            );

            it("should always pass", () => {
                expect(1).toEqual(1);
            });
        },
    );
});
