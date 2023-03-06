import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnglishService } from 'src/app/services/english.service';
import { DialogAnswerComponent } from '../dialog-answer/dialog-answer.component';

@Component({
  selector: 'app-english-questions',
  templateUrl: './english-questions.component.html',
  styleUrls: ['./english-questions.component.scss'],
})
export class EnglishQuestionsComponent implements OnInit {
  questions = [];
  constructor(private _english: EnglishService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllParagraphs();
  }

  getAllParagraphs() {
    this._english.getAllParagraph().subscribe((data) => {
      console.log(data.data);
      this.questions = data.data;
    });
  }
  openDialog(i:number): void {
   let answers=this.questions.filter(q=>{q})
   let dialogRef = this.dialog.open(
     DialogAnswerComponent,
     {
       data: { answer: 'ans545' },
       disableClose: true,
     },

   );

    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog Result:${result}`);

    })
  }
}
