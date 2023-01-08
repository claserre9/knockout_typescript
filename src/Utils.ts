import * as ko from "knockout";

export function flattenData(object) {
    return JSON.parse(ko.toJSON(object))
}