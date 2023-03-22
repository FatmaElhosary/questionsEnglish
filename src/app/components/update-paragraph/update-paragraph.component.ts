import { Component, OnInit } from '@angular/core';
import { EnglishService } from '../../services/english.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-update-paragraph',
  templateUrl: './update-paragraph.component.html',
  styleUrls: ['./update-paragraph.component.scss'],
})
export class UpdateParagraphComponent implements OnInit {
  paragraphId: string;
  paragraph: any;
  constructor(
    private EnglishService: EnglishService,
    private ActivatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.paragraphId = this.ActivatedRoute.snapshot.paramMap.get('id');
    console.log(this.paragraphId);
    this.getParagraph(this.paragraphId);
  }

  getParagraph(paragraphId: string) {
    this.EnglishService.getParagraph(paragraphId).subscribe({
      next: (res) => {
        this.paragraph = res.existingParagraph;
        console.log(this.paragraph);

        this.paragraph.questions.map((question: any, index: number) => {
          const actorsForm = this.fb.group({
            question: question.question,
            answers: this.fb.array(
              question.answers.map((answer: any) =>
                this.createAnswerFormGroup(answer)
              )
            ),
            /*  this.fb.array([
              this.fb.group({
                answer: ['', Validators.required],
                why: this.fb.array([
                  this.fb.group({
                    key: '',
                  }),
                ]),
              }),
            ]), */
          });
          this.questions.push(actorsForm);
          console.log(actorsForm);
        });
      },
      error: () => {},
      complete: () => {
        this.setValueToForm(this.paragraph);
      },
    });
  }
  createAnswerFormGroup(answer: any) {
    return this.fb.group({
      answer: [answer.answer, Validators.required],
      why: this.fb.array(
        answer.why.map((wh: any) => this.createwhyFormGroup(wh))
      ),
    });
  }
  createwhyFormGroup(wh) {
    return this.fb.group({
      key: [wh.key, Validators.required],
    });
  }

  /*    loadanswersArray(answers: any[]) {
    console.log(answers);

    let transformedCars =  answers.map((answer: any) =>
      this.createAnswerFormGroup(answer)
    );
    console.log(transformedCars);

    return transformedCars;
  } */
  questionForm: FormGroup = this.fb.group({
    paragraph: ['', Validators.required],
    qNumber: ['', Validators.required],
    btn_answer: ['Show Suggestion', Validators.required],
    questions: this.fb.array([]),
  });

  setValueToForm(paragraph) {
    /* this.questionForm.patchValue({
      questions: paragraph.questions.map((question) => {
        this.fb.group({
          question: question.question,
          answers: this.fb.array([]),
        });
      }),
    }); */

    this.questionForm.patchValue(
      Object.assign(this.questionForm.value, paragraph)
    );
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
            why: this.fb.array([
              this.fb.group({
                key: ['', Validators.required],
              }),
            ]),
          }),
        ]),
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
        why: this.fb.array([
          this.fb.group({
            key: '',
          }),
        ]),
      })
    );
  }
  deleteAnswer(control, index) {
    control.removeAt(index);
  }
  /////////////////////why/////////////////////
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
  /////////////////////////////////////////////////////////////////////////////////////////
  UpdateParagraph() {
    if (this.questionForm.valid) {
      this.EnglishService.updateParagraph(
        this.paragraphId,
        this.questionForm.value
      ).subscribe({
        next: (res) => {
          console.log('response', res);
        },

        error: (err: any) => {},
        complete: () => {
          this.questionForm.reset();
          this._router.navigate([`paragraph/${this.paragraphId}`]);
        },
      });
    } else {
      alert('You Should fill all Required Inputs');
      console.log('You Should fill all Required Inputs');
    }
  }
}
