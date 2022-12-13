import defaultResolve from "part:@sanity/base/document-actions";
import SyncToTest from "./syncToTest"

export default function resolveDocumentActions(props) {
    return [...defaultResolve(props), SyncToTest];
}
