import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-add-paragraph',
  templateUrl: './add-paragraph.component.html',
  styleUrls: ['./add-paragraph.component.scss'],
})
export class AddParagraphComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  questionForm: FormGroup = this.fb.group({
    paragraph: ['', Validators.required],
    qNumber: [''],
    btn_answer: ['Show Suggestion'],
    questions: this.fb.array([]),
/*     [
      this.fb.group({
        question: '',
        answers: this.fb.array([
          this.fb.group({
            answer: '',
            why: this.fb.array([this.fb.group({key:''})]),
          }),
        ]),
      }),
    ] */
    /*  aliases: this.fb.array([this.fb.control('')]),
    lessons: this.fb.array([]), */
  });
  ngOnInit(): void {
    console.log((<FormArray>this.questionForm.controls['questions']).controls);
  }

  ///////////////why////////////////
  /*  get why() {
    return this.questionForm.get('why') as FormArray;
  }
  addWhy() {
    this.why.push(this.fb.control(''));
  }
  deleteWhy(whyIndex: number) {
    this.why.removeAt(whyIndex);
  } */

  addNewWhy(control) {
    control.push(
      this.fb.group({
        key: '',
      })
    );
  }

  deleteWhy(control, index) {
    control.removeAt(index);
  }
  ///////////////////////////////questions///////////////////

  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }
/*   newQuestion(): FormGroup {
    return this.fb.group({
      question: '',
      answers: this.fb.group({
        answer: '',
        why: this.fb.array([this.fb.control('')]),
      }),
    });
  } */

  addQuestion() {
    this.questions.push(
      this.fb.group({
        question: '',
        answers: this.fb.array([]),
     /*    [
          this.fb.group({
            answer: '',
            why: this.fb.array([this.fb.group({ key: '' })]),
          }),
        ] */
      })
    );
  }
  deleteQuestion(questionIndex: number) {
    this.questions.removeAt(questionIndex);
  }

  addNewAnswer(control) {
      control.push(
        this.fb.group({
          answer: '',
          why: this.fb.array([this.fb.group({ key: '' })]),
        })
      );
  }

  deleteAnswer(control, index) {
    control.removeAt(index);
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////KEyWords////////////////////////

  ////////////////////////////////////////////////////////////////////////////

  get lessons() {
    return this.questionForm.controls['lessons'] as FormArray;
  }
  addLesson() {
    const lessonForm = this.fb.group({
      title: ['', Validators.required],
      keys: this.fb.array([this.fb.control('')]),
    });

    this.lessons.push(lessonForm);
  }
  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }
  /////////////////////////////////////////////////////////////
  get aliases() {
    return this.questionForm.get('aliases') as FormArray;
  }
  addAlias() {
    this.aliases.push(this.fb.control(''));
  }
  deleteAlias(aliesIndex: number) {
    this.aliases.removeAt(aliesIndex);
  }
  /////////////////////////
  get keys() {
    return this.questionForm.get('lessons').get('keys') as FormArray;
  }
  addkeys() {
    this.keys.push(this.fb.control(''));
  }
  deletekeys(aliesIndex: number) {
    this.keys.removeAt(aliesIndex);
  }
  /////////////////////////////////////////////////////////////////////////////////////////
  addParagraph() {
    console.log(this.questionForm.value);
  }
}
