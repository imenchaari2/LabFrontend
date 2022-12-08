import {Member} from "./member";
import {Tool} from "./tool";
import {File} from "./File";

export interface Article {
    articleId: string;
    membersIds: string[];
    membersNames: string[];
    title: string;
    type: string;
    url: string;
    pdfSource: File;
    createdDate: string;
}

