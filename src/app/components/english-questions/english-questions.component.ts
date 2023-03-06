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
  private content: string;
    public query: string="Lorem ipsum";
  constructor(private _english: EnglishService, public dialog: MatDialog) {
    this.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a quam ornare, bibendum ligula a, rhoncus ligula. Etiam aliquet, justo sollicitudin imperdiet luctus, nulla justo sodales mi, sit amet semper nisl velit vel massa. In hac habitasse platea dictumst.";

  }

  ngOnInit(): void {
    this.getAllParagraphs();
  }
  public highlight() {
    if(!this.query) {
        return this.content;
    }
    return this.content.replace(new RegExp(this.query, "gi"), match => {
        return '<span class="highlightText">' + match + '</span>';
    });
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
