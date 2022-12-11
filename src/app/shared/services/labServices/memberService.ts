import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Member} from "../../models/member";
import {Observable} from "rxjs";
import {Student} from "../../models/Student";
import {Teacher} from "../../models/Teacher";
import {Article} from "../../models/article";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MemberService {

    private apiUrl = `${environment.apiURL}/member`;

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

    public getAllAuthors(): Observable<Member[]> {
        return this.http.get<Member[]>(`${this.apiUrl}/authors`);
    }


    public getAllStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.apiUrl}/students`);
    }

    public findTeacherBySearch(firstName: string, lastName: string, cin: string, etablishment: string, grade: string,): Observable<Teacher[]> {
        return this.http.get<Teacher[]>(`${this.apiUrl}/findTeacherBySearch?firstName=${firstName}&lastName=${lastName}&cin=${cin}&etablishment=${etablishment}&grade=${grade}`);
    }

    public findStudentBySearch(firstName: string, lastName: string, cin: string, type: string): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.apiUrl}/findStudentBySearch?firstName=${firstName}&lastName=${lastName}&cin=${cin}&type=${type}`);
    }

    public getAllTeachers(): Observable<Teacher[]> {
        return this.http.get<Teacher[]>(`${this.apiUrl}/teachers`);
    }

    public getMemberById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/member/${id}`);
    }

    public getMemberPhoto(imageName: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/get/${imageName}`);
    }

    public addStudent(student: Student, cv: File, photo: File): Observable<any> {
        const formData = new FormData();
        for (const key in student) {
            formData.append(key, student[key]);
        }
        formData.append('cvFile', cv);
        formData.append('photoFile', photo);
        return this.http.post<Student>(`${this.apiUrl}/addStudent`, formData);
    }

    public updateStudent(student: Student, id: string, cv: File, photo: File): Observable<Student> {
        const formData = new FormData();
        for (const key in student) {
            formData.append(key, student[key]);
        }
        formData.append('cvFile', cv);
        formData.append('photoFile', photo);
        return this.http.put<Student>(`${this.apiUrl}/updateStudent/${id}`, formData);
    }
    public updateStudentInfos(id: string , student: Student): Observable<Student> {
        const formData = new FormData();
        for (const key in student) {
            formData.append(key, student[key]);
        }
        return this.http.put<Student>(`${this.apiUrl}/updateStudent/${id}`, formData);
    }

    public updateTeacher(teacher: Teacher, id: string, cv: File, photo: File): Observable<Teacher> {
        const formData = new FormData();
        for (const key in teacher) {
            formData.append(key, teacher[key]);
        }
        formData.append('cvFile', cv);
        formData.append('photoFile', photo);
        return this.http.put<Teacher>(`${this.apiUrl}/updateTeacherResearcher/${id}`, formData);
    }

    public updateTeacherInfos(id: string, teacher: Teacher): Observable<Teacher> {
        const formData = new FormData();
        for (const key in teacher) {
            formData.append(key, teacher[key]);
        }
        return this.http.put<Teacher>(`${this.apiUrl}/updateTeacherResearcher/${id}`, formData);
    }

    public addTeacher(teacher: Teacher, cv: File, photo: File): Observable<any> {
        const formData = new FormData();
        for (const key in teacher) {
            formData.append(key, teacher[key]);
        }
        formData.append('cvFile', cv);
        formData.append('photoFile', photo);
        return this.http.post<Teacher>(`${this.apiUrl}/addTeacherResearcher`, formData);
    }

    updatePhoto(idMember: string, idPhoto: string, photo: File): Observable<any> {
        const formData = new FormData();
        formData.append('imageFile', photo);
        return this.http.put<any>(`${this.apiUrl}/updatePhoto/${idMember}/${idPhoto}`, formData);
    }


    public affectSupervisorToStudent(student: Student, idSupervisor: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/affectSupervisorToStudent/${idSupervisor}`, student);
    }


    public deleteMember(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/deleteMember/${id}`);
    }

    public getAllStudentsBySupervisorName(name: string): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.apiUrl}/studentsBySupervisorName?name=${name}`);
    }

    public findStudentByInscriptionDateBetween(inscriptionDateGT: Date, inscriptionDateLT: Date): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.apiUrl}/findByInscriptionDatePeriod?inscriptionDateGT=${inscriptionDateGT}&inscriptionDateLT=${inscriptionDateLT}`);
    }

    download(filename: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/downloadFile/${filename}`, {
            reportProgress: true,
            observe: 'events',
            responseType: 'blob'
        });
    }

    public changePassword(id: string, currentPass: string, newPass: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/changePassword/${id}?currentPass=${currentPass}&newPass=${newPass}`, {});
    }
}
