import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  @Input() questions;
  questionPage: number = 1;
  answer: string;
  constructor() {}

  ngOnInit(): void {}

  showAnswer() {}
  onPaginateQuestion(event){

  }
}
