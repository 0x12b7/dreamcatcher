import { Option } from "reliq";

export type DirectoryPathsFilterOption = {
    extension: Option<string>;
    tag: Option<string>;
};

export function DirectoryPathsFilterOption(_instance: DirectoryPathsFilterOption) {
    /** @constructor */ {
        return _instance;
    }
}