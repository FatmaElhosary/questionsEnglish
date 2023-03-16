import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss'],
})
export class TestFormComponent implements OnInit {
  title = 'FormArray SetValue & PatchValue Example';

  teachersForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.teachersForm = this.fb.group({
      teachers: this.fb.array([]),
    });
  }
  ngOnInit(): void {}
  /** Teachers */
  teachers(): FormArray {
    return this.teachersForm.get('teachers') as FormArray;
  }

  newTeacher(): FormGroup {
    return this.fb.group({
      paragraph: ['', Validators.required],
      name: '',
      batches: this.fb.array([]),
    });
  }

  addTeacher() {
    this.teachers().push(this.newTeacher());
  }

  removeTeacher(ti) {
    this.teachers().removeAt(ti);
  }

  /** batches */

  batches(ti): FormArray {
    return this.teachers().at(ti).get('batches') as FormArray;
  }

  newBatch(): FormGroup {
    return this.fb.group({
      name: '',
      students: this.fb.array([]),
    });
  }

  addBatch(ti: number) {
    this.batches(ti).push(this.newBatch());
  }

  removeBatch(ti: number, bi: number) {
    this.batches(ti).removeAt(ti);
  }

  /** students */

  students(ti, bi): FormArray {
    return this.batches(ti).at(bi).get('students') as FormArray;
  }

  newStudent(): FormGroup {
    return this.fb.group({
      name: '',
      why: this.fb.array([this.fb.control('')]),
    });
  }

  addStudent(ti: number, bi: number) {
    this.students(ti, bi).push(this.newStudent());
  }

  removeStudent(ti: number, bi: number, si: number) {
    this.students(ti, bi).removeAt(si);
  }

  /** why */

  why(ti, bi,si): FormArray {
    return this.students(ti,bi).at(si).get('why') as FormArray;
  }

  newWhy(): FormGroup {
    return this.fb.group(['']);
  }

  addWhy(ti: number, bi: number,si) {
    this.why(ti, bi,si).push(this.newWhy());
  }

  removeWhy(ti: number, bi: number, si: number,wi) {
    this.why(ti, bi,si).removeAt(wi);
  }

  //////////////////////////////////////////////////
  onSubmit() {
    console.log(this.teachersForm.value);
  }
}
