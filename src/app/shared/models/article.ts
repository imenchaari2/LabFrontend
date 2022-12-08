import {Member} from "./member";
import {Tool} from "./tool";
import {File} from "./File";

export interface Article {
  articleId: string;
  authorId: string;
  title: string;
  type: string;
  url: string;
  pdfSource: File;
  createdDate: string;
  authorName: string;
}

