import App from "./app";
import Template, { TemplateId } from "./template.interface";
import ClangTemplate from "./clang.template";

class TemplateFactory {
    private static readonly templates = [ClangTemplate];

    public static createTemplate(generator: App) {
        const { type } = generator.options;

        const template = this.templates.find((template) => {
            return template.aliases.indexOf(type) || template.id === type;
        });

        if (!template) {
            throw new Error(
                `Invalid project type: ${type}\nPossible types are: ${this.templates
                    .map((template) => template.aliases.join(", "))
                    .join(", ")}`,
            );
        }

        return new template(generator);
    }

    public static getAvailableTemplates(): TemplateId[] {
        return this.templates.map(({ id, name, aliases }) => {
            return {
                id,
                name,
                aliases,
            };
        });
    }
}

export default TemplateFactory;
