import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() question: any;
  @Input() quesI:any;
  @Output() openDialog = new EventEmitter<any>();
  query: string[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.question);

  }
  doClick(quesI :number, ansI = 0) {

    this.query = this.question.questions[quesI].answers[ansI].why;
    this.highlight();
    this.openDialog.emit();
  }

  public highlight() {
    if (!this.query) {
      return this.question.paragraph;
    }
    return this.question.paragraph.replace(
      new RegExp(this.query.join('|'), 'gi'),
      (match: string) => {
        return '<span class="highlightText">' + match + '</span>';
      }
    );
  }

}
