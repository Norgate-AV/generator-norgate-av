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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const generator = path.resolve(__dirname, "../dist/generators/app");

await ConfigHelper.initialize(config as UnresolvedConfig);

const node = new NodeEnvironment();
await node.initialize();

const { devDependencies, dependencies } = node.packageJson;
const engine = node.getNodeEngine().split(".")[0];

const lock = {
    pnpm: "pnpm-lock.yaml",
    npm: "package-lock.json",
    yarn: "yarn.lock",
};

describe("generator-norgate-av:typescript", () => {
    describe.each([
        {
            type: "typescript",
            name: "test",
            id: "test-id",
            description: "test-description",
            author: "Yeoman",
            git: false,
            pkg: "pnpm",
            openWith: "skip",
        },
        {
            type: "ts",
            name: "test",
            id: "test-id",
            description: "test-description",
            author: "Yeoman",
            git: true,
            pkg: "yarn",
            openWith: "skip",
        },
        {
            type: "node-ts",
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
                assert.equal(result.generator.options.type, type);
                assert.equal(result.generator.options.name, name);
                assert.equal(result.generator.options.id, id);
                assert.equal(result.generator.options.description, description);
                // assert.equal(result.generator.options.author, author);
                assert.equal(result.generator.options.git, git);
                assert.equal(result.generator.options.pkg, pkg);
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
                    "src/app.ts",
                    "tests/app.test.ts",
                    ".all-contributorsrc",
                    ".changelogrc.json",
                    ".commitlintrc.json",
                    ".czrc",
                    ".editorconfig",
                    ".eslintignore",
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
                    "tsconfig.json",
                    "tsup.config.json",
                    "tsup.schema.json",
                    "vitest.config.ts",
                ]);
            });

            it("should create the correct package.json", () => {
                assert.jsonFileContent("package.json", {
                    name: id,
                    displayName: name,
                    description,
                    engines: {
                        node: `>=${engine}`,
                    },
                    scripts: {
                        prebuild: `${pkg} clean`,
                        prestart: `${pkg} lint && ${pkg} build`,
                    },
                    devDependencies: {
                        "@commitlint/config-conventional":
                            devDependencies!["@commitlint/config-conventional"],
                        "@semantic-release/changelog":
                            devDependencies!["@semantic-release/changelog"],
                        "@semantic-release/git":
                            devDependencies!["@semantic-release/git"],
                        "@types/config": devDependencies!["@types/config"],
                        "@types/node": devDependencies!["@types/node"],
                        "@types/nodemon": devDependencies!["@types/nodemon"],
                        "@typescript-eslint/eslint-plugin":
                            devDependencies![
                                "@typescript-eslint/eslint-plugin"
                            ],
                        "@typescript-eslint/parser":
                            devDependencies!["@typescript-eslint/parser"],
                        "all-contributors-cli":
                            devDependencies!["all-contributors-cli"],
                        commitizen: devDependencies!.commitizen,
                        "cross-env": devDependencies!["cross-env"],
                        "cz-conventional-changelog":
                            devDependencies!["cz-conventional-changelog"],
                        doctoc: devDependencies!.doctoc,
                        eslint: devDependencies!.eslint,
                        "eslint-config-prettier":
                            devDependencies!["eslint-config-prettier"],
                        husky: devDependencies!.husky,
                        "lint-staged": devDependencies!["lint-staged"],
                        nodemon: devDependencies!.nodemon,
                        prettier: devDependencies!.prettier,
                        rimraf: devDependencies!.rimraf,
                        "semantic-release":
                            devDependencies!["semantic-release"],
                        terser: devDependencies!.terser,
                        tsup: devDependencies!.tsup,
                        "type-fest": devDependencies!["type-fest"],
                        typescript: devDependencies!.typescript,
                        vitest: devDependencies!.vitest,
                    },
                    dependencies: {
                        config: dependencies!.config,
                        dotenv: dependencies!.dotenv,
                        envalid: dependencies!.envalid,
                    },
                });
            });

            it("should create the correct README.md", () => {
                assert.fileContent("README.md", `# ${id}`);
                assert.fileContent(
                    "README.md",
                    `This is the README for your project "${id}". After writing up a brief description, we recommend including the following sections.`,
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
                    `/${id}/issues/new/choose`,
                );
                assert.fileContent("CONTRIBUTING.md", `/${id}.git`);
                assert.fileContent("CONTRIBUTING.md", `cd ${id}`);
                assert.fileContent("CONTRIBUTING.md", `${pkg} install`);
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `If in doubt, you can use the \`${pkg} commit\``,
                );
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `Be sure to run \`${pkg} test\``,
                );
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `Run the \`${pkg} contrib:add\``,
                );
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `${pkg} contrib:add <username>`,
                );
            });

            it("should create the correct CHANGELOG.md", () => {
                assert.fileContent(
                    "CHANGELOG.md",
                    `All notable changes to the "${id}" project will be documented in this file.`,
                );
            });

            it("should create the correct .all-contributorsrc", () => {
                assert.fileContent(
                    ".all-contributorsrc",
                    `"projectName": "${id}"`,
                );
            });

            it("should create the correct husky git hooks", () => {
                assert.fileContent(
                    ".husky/commit-msg",
                    `${pkg} commitlint --edit $1`,
                );
                assert.fileContent(".husky/pre-commit", `${pkg} lint-staged`);
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

    describe.skip("typescript:install", () => {
        let result: RunResult<AppGenerator>;

        const name = "test";
        const description = "test-description";
        const pkg = "pnpm";

        beforeAll(async () => {
            result = await helpers
                .create<AppGenerator>(generator)
                .withOptions({
                    skipInstall: false,
                })
                .withAnswers({
                    type: "typescript",
                    name,
                    description,
                    git: false,
                    pkg,
                    openWith: "skip",
                });

            process.chdir(name);
        }, 200000);

        afterAll(() => {
            result?.cleanup();
        });

        it("should install packages using the correct package manager", () => {
            assert.file(lock[pkg]);
        });

        it("should always pass", () => {
            expect(1).toEqual(1);
        });
    });

    describe.each([
        {
            destination: "test",
            type: "typescript",
            id: "test-id",
            description: "test-description",
            author: "Yeoman",
            git: false,
            pkg: "pnpm",
            yes: true,
        },
        {
            destination: "test",
            type: "ts",
            id: "test-id",
            description: "test-description",
            author: "Yeoman",
            git: true,
            pkg: "yarn",
            yes: true,
        },
        {
            destination: "test",
            type: "node-ts",
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
                assert.equal(result.generator.options.type, type);
                assert.equal(result.generator.options.destination, destination);
                assert.equal(result.generator.options.name, destination);
                assert.equal(result.generator.options.id, id);
                assert.equal(result.generator.options.description, description);
                // assert.equal(result.generator.options.author, author);
                assert.equal(result.generator.options.git, git || undefined);
                assert.equal(result.generator.options.pkg, pkg);
            });

            it(`should create a directory named '${destination}' and CD into it`, () => {
                assert.equal(path.basename(process.cwd()), destination);
            });

            it("should create the correct files", () => {
                assert.file([
                    ".github/workflows/main.yml",
                    ".github/dependabot.yml",
                    ".husky/commit-msg",
                    ".husky/pre-commit",
                    ".vscode/extensions.json",
                    ".vscode/settings.json",
                    "src/app.ts",
                    "tests/app.test.ts",
                    ".all-contributorsrc",
                    ".changelogrc.json",
                    ".commitlintrc.json",
                    ".czrc",
                    ".editorconfig",
                    ".eslintignore",
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
                    "tsconfig.json",
                    "tsup.config.json",
                    "tsup.schema.json",
                    "vitest.config.ts",
                ]);
            });

            it("should create the correct package.json", () => {
                assert.jsonFileContent("package.json", {
                    name: id,
                    displayName: destination,
                    description,
                    engines: {
                        node: `>=${engine}`,
                    },
                    scripts: {
                        prebuild: `${pkg} clean`,
                        prestart: `${pkg} lint && ${pkg} build`,
                    },
                    devDependencies: {
                        "@commitlint/config-conventional":
                            devDependencies!["@commitlint/config-conventional"],
                        "@semantic-release/changelog":
                            devDependencies!["@semantic-release/changelog"],
                        "@semantic-release/git":
                            devDependencies!["@semantic-release/git"],
                        "@types/config": devDependencies!["@types/config"],
                        "@types/node": devDependencies!["@types/node"],
                        "@types/nodemon": devDependencies!["@types/nodemon"],
                        "@typescript-eslint/eslint-plugin":
                            devDependencies![
                                "@typescript-eslint/eslint-plugin"
                            ],
                        "@typescript-eslint/parser":
                            devDependencies!["@typescript-eslint/parser"],
                        "all-contributors-cli":
                            devDependencies!["all-contributors-cli"],
                        commitizen: devDependencies!.commitizen,
                        "cross-env": devDependencies!["cross-env"],
                        "cz-conventional-changelog":
                            devDependencies!["cz-conventional-changelog"],
                        doctoc: devDependencies!.doctoc,
                        eslint: devDependencies!.eslint,
                        "eslint-config-prettier":
                            devDependencies!["eslint-config-prettier"],
                        husky: devDependencies!.husky,
                        "lint-staged": devDependencies!["lint-staged"],
                        nodemon: devDependencies!.nodemon,
                        prettier: devDependencies!.prettier,
                        rimraf: devDependencies!.rimraf,
                        "semantic-release":
                            devDependencies!["semantic-release"],
                        terser: devDependencies!.terser,
                        tsup: devDependencies!.tsup,
                        "type-fest": devDependencies!["type-fest"],
                        typescript: devDependencies!.typescript,
                        vitest: devDependencies!.vitest,
                    },
                    dependencies: {
                        config: dependencies!.config,
                        dotenv: dependencies!.dotenv,
                        envalid: dependencies!.envalid,
                    },
                });
            });

            it("should create the correct README.md", () => {
                assert.fileContent("README.md", `# ${id}`);
                assert.fileContent(
                    "README.md",
                    `This is the README for your project "${id}". After writing up a brief description, we recommend including the following sections.`,
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
                    `/${id}/issues/new/choose`,
                );
                assert.fileContent("CONTRIBUTING.md", `/${id}.git`);
                assert.fileContent("CONTRIBUTING.md", `cd ${id}`);
                assert.fileContent("CONTRIBUTING.md", `${pkg} install`);
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `If in doubt, you can use the \`${pkg} commit\``,
                );
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `Be sure to run \`${pkg} test\``,
                );
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `Run the \`${pkg} contrib:add\``,
                );
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `${pkg} contrib:add <username>`,
                );
            });

            it("should create the correct CHANGELOG.md", () => {
                assert.fileContent(
                    "CHANGELOG.md",
                    `All notable changes to the "${id}" project will be documented in this file.`,
                );
            });

            it("should create the correct .all-contributorsrc", () => {
                assert.fileContent(
                    ".all-contributorsrc",
                    `"projectName": "${id}"`,
                );
            });

            it("should create the correct husky git hooks", () => {
                assert.fileContent(
                    ".husky/commit-msg",
                    `${pkg} commitlint --edit $1`,
                );
                assert.fileContent(".husky/pre-commit", `${pkg} lint-staged`);
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
            type: "typescript",
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

            it("should assign the correct default values", () => {
                assert.equal(result.generator.options.id, "test-project");
                assert.equal(result.generator.options.description, "");
                assert.equal(result.generator.options.author, "");
                assert.equal(result.generator.options.git, true);
                assert.equal(result.generator.options.pkg, "pnpm");
            });

            it(`should create a directory named '${destination}' and CD into it`, () => {
                assert.equal(path.basename(process.cwd()), destination);
            });

            it("should create the correct files", () => {
                assert.file([
                    ".github/workflows/main.yml",
                    ".github/dependabot.yml",
                    ".husky/commit-msg",
                    ".husky/pre-commit",
                    ".vscode/extensions.json",
                    ".vscode/settings.json",
                    "src/app.ts",
                    "tests/app.test.ts",
                    ".all-contributorsrc",
                    ".changelogrc.json",
                    ".commitlintrc.json",
                    ".czrc",
                    ".editorconfig",
                    ".eslintignore",
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
                    "tsconfig.json",
                    "tsup.config.json",
                    "tsup.schema.json",
                    "vitest.config.ts",
                ]);
            });

            it("should create the correct package.json", () => {
                assert.jsonFileContent("package.json", {
                    name: result.generator.options.id,
                    displayName: destination,
                    description: result.generator.options.description,
                    engines: {
                        node: `>=${engine}`,
                    },
                    scripts: {
                        prebuild: `${result.generator.options.pkg} clean`,
                        prestart: `${result.generator.options.pkg} lint && ${result.generator.options.pkg} build`,
                    },
                    devDependencies: {
                        "@commitlint/config-conventional":
                            devDependencies!["@commitlint/config-conventional"],
                        "@semantic-release/changelog":
                            devDependencies!["@semantic-release/changelog"],
                        "@semantic-release/git":
                            devDependencies!["@semantic-release/git"],
                        "@types/config": devDependencies!["@types/config"],
                        "@types/node": devDependencies!["@types/node"],
                        "@types/nodemon": devDependencies!["@types/nodemon"],
                        "@typescript-eslint/eslint-plugin":
                            devDependencies![
                                "@typescript-eslint/eslint-plugin"
                            ],
                        "@typescript-eslint/parser":
                            devDependencies!["@typescript-eslint/parser"],
                        "all-contributors-cli":
                            devDependencies!["all-contributors-cli"],
                        commitizen: devDependencies!.commitizen,
                        "cross-env": devDependencies!["cross-env"],
                        "cz-conventional-changelog":
                            devDependencies!["cz-conventional-changelog"],
                        doctoc: devDependencies!.doctoc,
                        eslint: devDependencies!.eslint,
                        "eslint-config-prettier":
                            devDependencies!["eslint-config-prettier"],
                        husky: devDependencies!.husky,
                        "lint-staged": devDependencies!["lint-staged"],
                        nodemon: devDependencies!.nodemon,
                        prettier: devDependencies!.prettier,
                        rimraf: devDependencies!.rimraf,
                        "semantic-release":
                            devDependencies!["semantic-release"],
                        terser: devDependencies!.terser,
                        tsup: devDependencies!.tsup,
                        "type-fest": devDependencies!["type-fest"],
                        typescript: devDependencies!.typescript,
                        vitest: devDependencies!.vitest,
                    },
                    dependencies: {
                        config: dependencies!.config,
                        dotenv: dependencies!.dotenv,
                        envalid: dependencies!.envalid,
                    },
                });
            });

            it("should create the correct README.md", () => {
                assert.fileContent(
                    "README.md",
                    `# ${result.generator.options.id}`,
                );
                assert.fileContent(
                    "README.md",
                    `This is the README for your project "${result.generator.options.id}". After writing up a brief description, we recommend including the following sections.`,
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
                    `/${result.generator.options.id}/issues/new/choose`,
                );
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `/${result.generator.options.id}.git`,
                );
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `cd ${result.generator.options.id}`,
                );
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `${result.generator.options.pkg} install`,
                );
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `If in doubt, you can use the \`${result.generator.options.pkg} commit\``,
                );
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `Be sure to run \`${result.generator.options.pkg} test\``,
                );
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `Run the \`${result.generator.options.pkg} contrib:add\``,
                );
                assert.fileContent(
                    "CONTRIBUTING.md",
                    `${result.generator.options.pkg} contrib:add <username>`,
                );
            });

            it("should create the correct CHANGELOG.md", () => {
                assert.fileContent(
                    "CHANGELOG.md",
                    `All notable changes to the "${result.generator.options.id}" project will be documented in this file.`,
                );
            });

            it("should create the correct .all-contributorsrc", () => {
                assert.fileContent(
                    ".all-contributorsrc",
                    `"projectName": "${result.generator.options.id}"`,
                );
            });

            it("should create the correct husky git hooks", () => {
                assert.fileContent(
                    ".husky/commit-msg",
                    `${result.generator.options.pkg} commitlint --edit $1`,
                );
                assert.fileContent(
                    ".husky/pre-commit",
                    `${result.generator.options.pkg} lint-staged`,
                );
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
