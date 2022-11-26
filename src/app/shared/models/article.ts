import {Member} from "./member";
import {Tool} from "./tool";

export interface Article {
  articleId: string;
  authorId: string;
  title: string;
  type: string;
  url: string;
  pdfSource: string;
  createdDate: string;
  authorName: string;
}

