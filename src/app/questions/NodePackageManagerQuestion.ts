import { Question } from "yeoman-generator";
import { AppGenerator } from "../app";
import { TemplateQuestion } from "./TemplateQuestion";

export class NodePackageManagerQuestion extends TemplateQuestion {
    private readonly defaultPackageManager: string = "pnpm";

    constructor(generator: AppGenerator) {
        super(generator);
    }

    public getQuestion(): Question<{ pkg: string }> {
        return {
            type: "list",
            name: "pkg",
            message: "Which package manager to use?",
            choices: [
                {
                    name: "pnpm",
                    value: "pnpm",
                },
                {
                    name: "yarn",
                    value: "yarn",
                },
                {
                    name: "npm",
                    value: "npm",
                },
            ],
            default: this.defaultPackageManager,
            when:
                !this.generator.options.pkg &&
                !this.generator.options.skipPrompts,
        };
    }
}