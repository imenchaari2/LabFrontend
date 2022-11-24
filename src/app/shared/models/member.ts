import {Article} from "./article";
import {Tool} from "./tool";

export class Member {
    id: string;
    cin: string;
    firstName: string;
    lastName: string;
    createdDate: string;
    cv: string;
    photo: string;
    type: string;
    email: string;
    password: string;
    birthDate: string;

    articles: Article[];
    events: Event[];
    tools: Tool[];
}

