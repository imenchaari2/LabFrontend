import {Article} from "./article";
import {Tool} from "./tool";
import {File} from "./File";

export class Member {
    id: string;
    cin: string;
    firstName: string;
    lastName: string;
    createdDate: string;
    cv: File;
    photo: File;
    email: string;
    password: string;
    birthDate: string;
    role: string;
}

