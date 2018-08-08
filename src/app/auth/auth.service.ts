import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "@app/model/user.model";
import { Observable } from "rxjs";




@Injectable()
export class AuthService {

    constructor(private http:HttpClient) {

    }

    login(email:string, password:string): Observable<User> {
        return this.http.post<User>('/api/login', {email,password});
    }

}