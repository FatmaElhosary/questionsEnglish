import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnglishService } from '../../services/english.service';
import { ActivatedRoute } from '@angular/router';

//random answer
let randomArrayElement = require('@smakss/random-array-element');

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
})
export class ParagraphComponent implements OnInit {
  paragraphs: any;
  doHighlight: boolean = false;
  answer: string = '';
  keywords: any[] = [];
  ///question index///////////
  questinID: number = 0;
  paraId: number = 0;
  answerId: number = 0;
  //pagination
  //itemsPerPage
  questionPage: number = 1;
  paragraphPage: number = 1;

  //count: number = 0;
  tableSize: number = 1;
  /* tableSizes: any = [3, 6, 9, 12]; */
  //random array
  chooser: any;
  subscribtion: Subscription;
  constructor(private _EnglishService: EnglishService,private ActivatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.getAllParagraphs();
  }




  getAllParagraphs() {
    this.subscribtion = this._EnglishService.getAll().subscribe(
     /*    (data) => {
        console.log(data.paragraphData);
        this.paragraphs = data.paragraphData;
        //////random array elements////////////////////
        this.chooser = randomArrayElement(
          this.paragraphs[this.paraId].questions[this.questinID].answers
        );
      },
      (error) => console.log(error) */
      {
        next: (res) => {
          console.log(res.paragraphData);
          this.paragraphs = res.paragraphData;
          //////random array elements////////////////////
          this.chooser = randomArrayElement(
            this.paragraphs[this.paraId].questions[this.questinID].answers?this.paragraphs[this.paraId].questions[this.questinID].answers:[]
          );
        },
        error: (err: any) => {
          alert(err.message)
          console.log(err.message);},
        complete: () => {

        },
      }
    );
  }
  ////////////////////////////////////////
  showAnswer() {
    /////////////////get random answer//////////////////
    this.answer = this.chooser().answer;
    /////////get keywords of this answer////////////////////////
    let answerIndex = this.paragraphs[this.paraId].questions[
      this.questinID
    ].answers.findIndex((ans) => ans.answer === this.answer);

    /////array of why object ////////////
    let keywordsObject =
      this.paragraphs[this.paraId].questions[this.questinID].answers[
        answerIndex
      ].why;
////////////////////////convert array of object to array of string//////////////////////
     this.keywords = keywordsObject.map(function (item) {
       return item['key'];
     });


      ////////////////////
    console.log(this.keywords);
    ////////highlight paragraph////////////////////
    this.doHighlight = true;
  }

  onPaginateQuestion(event: any) {
    this.doHighlight = false;
    this.answer = '';
    this.questionPage = event;
    this.questinID = Number(event) - 1;
    this.changeQuestion();
  }
  onPaginateParagraph(event) {
    this.doHighlight = false;
    this.answer = '';
    //active first question
    this.questionPage = 1;
    //start from question 1
    this.questinID = 0;
    //
    this.paragraphPage = event;

    this.paraId = Number(event) - 1;
    this.changeQuestion();
  }
  //////////////////get current question answers/////////////////////
  changeQuestion() {
    ///////////////////////get answers/////////////////////////////////
    const currentParagraph = this.paragraphs[this.paragraphPage - 1];
    console.log('currentParagraph', currentParagraph);
    const currentQuestion = currentParagraph.questions[this.questinID];
    console.log(currentQuestion);
    //////////////////////////////////////////////////////////////
     if (currentQuestion)
       this.chooser = randomArrayElement(currentQuestion.answers);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribtion.unsubscribe();
  }
}
