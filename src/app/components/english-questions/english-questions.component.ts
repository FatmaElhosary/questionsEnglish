import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnglishService } from 'src/app/services/english.service';
import { DialogAnswerComponent } from '../dialog-answer/dialog-answer.component';
let randomArrayElement = require('@smakss/random-array-element');
@Component({
  selector: 'app-english-questions',
  templateUrl: './english-questions.component.html',
  styleUrls: ['./english-questions.component.scss'],
})
export class EnglishQuestionsComponent implements OnInit {
  questions: any = [];
  chooser: any;

  /*   private content: string = '';
  public query: string = ''; */
  constructor(private _english: EnglishService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllParagraphs();
  }

  /*   public highlight() {
    if (!this.query) {
      return this.content;
    }
    return this.content.replace(new RegExp(this.query, 'gi'), (match) => {
      return '<span class="highlightText">' + match + '</span>';
    });
  } */
  getAllParagraphs() {
    this._english.getAllParagraph().subscribe((data) => {
       console.log(data.data);
      this.questions = data.data;
      // this.content = this.questions[0].paragraph;
      // this.query = this.questions[0].questions[0].answers[0].why[0];
      // console.log(this.questions[0].questions[0].answers[0].why[0]);
       this.chooser = randomArrayElement(
         this.questions[0].questions[0].answers
       );
    });
  }
  numbers: any[] = [];
  randomNoRepeats(array: any): any {
    /*   var copy = array.slice(0);
    return function () {
      if (copy.length < 1) {
        copy = array.slice(0);
        if (copy.length == 0) {
          copy = array;
        }
      }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    }; */
  }

  openDialog(i: number): void {
    // console.log(this.generateUniqueRandom(3));
    //console.log(this.chooser());

    //this.query = this.questions[0].questions[0].answers[0].why[0];
    let answers = this.questions[i].questions[i].answers;

   // const randomElement = this.chooser();

    //answers[Math.floor(Math.random() * answers.length)];
    //console.log(randomElement);
    //console.log(this.questions[i].questions[i].answers);
    //console.log(randomElement);

    let dialogRef = this.dialog.open(DialogAnswerComponent, {
      data: { answer: this.chooser().answer },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog Result:${result}`);
    });
  }
}
