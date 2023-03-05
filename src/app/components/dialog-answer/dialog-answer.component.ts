import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-answer',
  templateUrl: './dialog-answer.component.html',
  styleUrls: ['./dialog-answer.component.scss']
})
export class DialogAnswerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
