import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EnglishService {
  URL: string = 'http://192.168.109.32:3000/paragraph';
  questions: any;
  constructor(private _http: HttpClient) {
    this.getAllParagraph().subscribe((res) => {
      this.questions = res.data;
    });
  }
  ////////////////////////////////////API//////////////////////////////////////////
  getAllParagraph(): Observable<any> {
    return this._http.get('../../assets/english.json');
  }
  ////////////////////////////////////////////
  getAll(): Observable<any> {
    return this._http.get(this.URL);
  }
  /////////////////////////////////////////////////
  /////////////////////get one paragraph by id////////////////////////////////
  getParagraph(id: string): Observable<any> {
    return this._http.get(`${this.URL}/${id}`);
  }
  ////////////////////////////add new paragraph///////////////////////////////////////////
  addParagraph(paragraph): Observable<any> {
    return this._http.post(this.URL, paragraph);
  }

  ///Delete//////////
  deletePAragraph(id: string): Observable<any> {
    return this._http.delete(`${this.URL}/${id}`);
  }

  ///update paragraph//////
  updateParagraph(id: string, paragraph: any): Observable<any> {
    return this._http.put(`${this.URL}/${id}`, paragraph);
  }
  //////////////////////////////export project////////////////////////////////
  exportProject(paragraphs: any[]): Observable<any> {
    return this._http.post(`${this.URL}/export`, paragraphs);
  }

  getProgject(folderName){
    return this._http.get(`${this.URL}/zip/folder/${folderName}`);

  }
}
