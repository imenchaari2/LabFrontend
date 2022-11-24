import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Member} from "../../models/member";
import {GLOBAL} from "../../../app-config";
import {Observable} from "rxjs";
import {Student} from "../../models/Student";
import {Teacher} from "../../models/Teacher";

@Injectable({
    providedIn: 'root'
})
export class MemberService {

    private apiUrl = `http://localhost:8081/api/member`;

    constructor(private http: HttpClient) {
    }


    // saveMember(objectToSubmit: any): Promise<any> {
    //     // si j'ai la partie back
    //     // return this.httpClient.post('linktorestAPI',objectToSubmit).toPromise();
    //     const memberToSave = {
    //         ...objectToSubmit,
    //         id: objectToSubmit.id ?? (Math.random() * 100000).toString(),
    //         createdDate: objectToSubmit.createdDate ?? new Date().toISOString()
    //     };
    //     this.tab = [memberToSave, ...this.tab.filter(item => item.id !== memberToSave.id)];
    //     return new Promise(resolve => resolve(memberToSave));
    //
    // }
    //
    // getMemberById(id: string): Promise<Member> {
    //     // return this.httpClient.get<M
    //     return new Promise(resolve => resolve(this.tab.filter(item => item.id === id)[0] ?? null));
    // }
    //
    // delete(id: string): Promise<void> {
    //     this.tab = this.tab.filter(item => item.id !== id);
    //     return new Promise(resolve => resolve());
    // }

    public getAllMembers(): Observable<Member[]> {
        return this.http.get<Member[]>(`${this.apiUrl}/members`);
    }

    public getAllStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.apiUrl}/students`);
    }

    public findTeacherBySearch(firstName: string, lastName: string, cin: string, etablishment: string, grade: string, ): Observable<Teacher[]> {
        return this.http.get<Teacher[]>(`${this.apiUrl}/findTeacherBySearch?firstName=${firstName}&lastName=${lastName}&cin=${cin}&etablishment=${etablishment}&grade=${grade}`);
    }
    public findStudentBySearch(firstName: string, lastName: string, cin: string, diploma: string): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.apiUrl}/findStudentBySearch?firstName=${firstName}&lastName=${lastName}&cin=${cin}&diploma=${diploma}`);
    }
    public getAllTeachers(): Observable<Teacher[]> {
        return this.http.get<Teacher[]>(`${this.apiUrl}/teachers`);
    }

    public getMemberById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/find/${id}`);
    }

    public addStudent(student: Student): Observable<Student> {
        return this.http.post<Student>(`${this.apiUrl}/addStudent`, student);
    }

    public addTeacher(teacher: Teacher): Observable<Teacher> {
        return this.http.post<Teacher>(`${this.apiUrl}/addTeacherResearcher`, teacher);
    }

    public updateTeacher(teacher: Teacher, id: string): Observable<Teacher> {
        return this.http.put<Teacher>(`${this.apiUrl}/updateTeacherResearcher/${id}`, teacher);
    }

    public updateStudent(student: Student, id: string): Observable<Student> {
        return this.http.put<Student>(`${this.apiUrl}/updateStudent/${id}`, student);
    }

    public deleteMember(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/deleteMember/${id}`);
    }
}
