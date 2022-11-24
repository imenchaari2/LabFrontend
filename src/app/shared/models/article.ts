import {Member} from "./member";

export interface Article {
  articleId: string;
  title: string;
  type: string;
  url: string;
  pdfSource: string;
  createdDate: string;
  author: Member;
}
