import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EnglishService } from '../../services/english.service';
//import { MatPaginator } from '@angular/material/paginator';

//random answer
let randomArrayElement = require('@smakss/random-array-element');

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
})
export class ParagraphComponent implements OnInit {
  //paragraph
  paragraph: any;
  paragraphs: any;
  questions: any;
  paraId: number ;
  doHighlight:boolean=false;
  /*  answers: any[] = []; */
  answer: string = '';
  query: string[] = [];
  ///question index///////////
  questinID: number = 0;
  //pagination
  //itemsPerPage
  page: number = 1;
  //count: number = 0;
  tableSize: number = 1;
  /* tableSizes: any = [3, 6, 9, 12]; */
  //random array
  chooser: any;
  subscribtion: Subscription;
  constructor(
    private _EnglishService: EnglishService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {}

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.subscribtion = this.activeRouter.params.subscribe((paramsId) => {
      this.paraId = paramsId['id'];
      console.log(this.paraId);
    });
    this.getAllParagraphs();
  }
  getAllParagraphs() {
    this._EnglishService.getAllParagraph().subscribe((data) => {
      console.log(data.data);
      this.paragraphs = data.data;
      this.getParagraph(+this.paraId);
    });
  }
  getParagraph(paragId: any) {
    this.paragraph = this.paragraphs.filter(
      (paragraph) => paragraph.id == paragId
    )[0];
    //this.answers = this.paragraph.questions[this.questinID].answers;
    this.changeQuestion();
    ///add paginator source
    this.questions = this.paragraph.questions;

    //console.log(this.questions);
  }
  changeQuestion() {
    console.log(this.questinID);
    const answers = this.paragraph.questions[this.questinID].answers;
    console.log(answers);
    this.chooser = randomArrayElement(answers);
  }
  ///for paragraph/////////////////////
  goToPre() {
    if (+this.paraId > 1)
      this.router.navigateByUrl(`/paragraphs/${+this.paraId - 1}`);
    else {
      this.router.navigateByUrl(`/paragraphs/1`);
    }
  }
  goToNext() {
    if (+this.paraId < this.paragraphs.length)
      this.router.navigate(['/paragraphs', +this.paraId + 1]);
  }
  ////////////////////////////////////////
  showAnswer() {
    this.query = this.paragraph.questions[this.questinID].why;
    this.doHighlight=true;
   // this.highlight();
    this.answer = this.chooser().answer;
  }

  onPaginate(event: any) {
    // console.log('event', event);
    this.doHighlight = false;
    this.answer = '';
    this.query = [];
    this.page = event;
    this.getParagraph(+this.paraId);
    this.questinID = Number(event) - 1;
    this.changeQuestion();
  }
  ///highlight paragraph //////////////////////
 /*  public highlight() {
    //this.query = this.paragraph.questions[this.questinID].why;
    console.log(this.query);

    if (!this.query) {
      return this.paragraph.paragraph;
    }
    return this.paragraph.paragraph.replace(
      new RegExp(this.query.join('|'), 'gi'),
      (match: string) => {
        return '<span class="highlightText">' + match + '</span>';
      }
    );
  } */
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribtion.unsubscribe();
  }
  /*   onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getParagraph(+this.paraId);
    this.changeQuestion();
  } */
}
