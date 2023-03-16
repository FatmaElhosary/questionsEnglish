import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EnglishService {
  questions:any;
  constructor(private _http: HttpClient) {
    this.getAllParagraph().subscribe(res=>{
      this.questions=res.data;
    })
  }

  getAllParagraph(): Observable<any> {
   return this._http.get('../../assets/english.json');
  }


  getParagraph(id:number):Observable<any>{
    return this._http.get(`../../assets/english.json/${id}`);
  }

  addParagraph(paragraph):Observable<any>{
    return this._http.post('http://localhost:3000/paragraph',paragraph);
  }
}
