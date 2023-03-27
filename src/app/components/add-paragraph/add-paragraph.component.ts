import { Component, OnInit } from '@angular/core';
import { EnglishService } from '../../services/english.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-paragraph',
  templateUrl: './add-paragraph.component.html',
  styleUrls: ['./add-paragraph.component.scss'],
})
export class AddParagraphComponent implements OnInit {
  loading:boolean=false;
  constructor(
    private fb: FormBuilder,
    private _EnglishService: EnglishService,
    private _router: Router
  ) {}
  questionForm: FormGroup = this.fb.group({
    paragraph: '',
    qNumber: ['', Validators.required],
    btn_answer: ['Show Suggestion', Validators.required],
    questions: this.fb.array([]),
  });
  ngOnInit(): void {
    console.log((<FormArray>this.questionForm.controls['questions']).controls);
  }

  ///////////////////////////////questions///////////////////
  get f(): { [key: string]: AbstractControl } {
    return this.questionForm.controls;
  }
  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }
  addQuestion() {
    this.questions.push(
      this.fb.group({
        question: ['', Validators.required],
        answers: this.fb.array([
          this.fb.group({
            answer: ['', Validators.required],
            why: this.fb.array([]),
            //this.fb.group({ key: ['', Validators.required] }),
          }),
        ]),
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
  ///////////////////////////////answers/////////////////////////
  addNewAnswer(control) {
    control.push(
      this.fb.group({
        answer: ['', Validators.required],
        why: this.fb.array([]),
        //this.fb.group({ key: ['', Validators.required] })
      })
    );
  }
  deleteAnswer(control, index) {
    control.removeAt(index);
  }
  //////////////////////Why////////////
  addNewWhy(control) {
    control.push(
      this.fb.group({
        key: ['', Validators.required],
      })
    );
  }
  deleteWhy(control, index) {
    control.removeAt(index);
  }
  /////////////////////////////////////////////////////////////////////////////////////////
  addParagraph() {
    this.loading=true;
    // console.log(this.questionForm.value);
    if (this.questionForm.valid) {
      this._EnglishService.addParagraph(this.questionForm.value).subscribe({
        next: (res) => {

          console.log('response', res);
        },

        error: (err: any) => {},
        complete: () => {
          this.loading = false;
          this.questionForm.reset();

          this._router.navigate(['paragraphs/list']);
        },
      });
    } else {
      this.loading = false;
      //alert('');
      console.log('You Should fill all Required Inputs');
    }
  }
}
