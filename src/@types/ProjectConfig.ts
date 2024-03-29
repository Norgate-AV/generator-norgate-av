import { NodeEnvironment } from "../environments/index.js";
import { NodePackageManager } from "./index.js";

export type ProjectConfig = {
    name: string;
    id: string;
    description: string;
    author: string;
    git: boolean;
    pkg: NodePackageManager;
    skipPrompts: boolean;
    environment: NodeEnvironment;
};
