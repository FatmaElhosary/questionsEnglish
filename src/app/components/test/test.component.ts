import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  empForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.empForm = this.fb.group({
      employees: this.fb.array([]),
    });
  }

  employees(): FormArray {
    return this.empForm.get('employees') as FormArray;
  }

  newEmployee(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      skills: this.fb.array([]),
    });
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }

  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }

  employeeSkills(empIndex: number): FormArray {
    return this.employees().at(empIndex).get('skills') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: this.fb.array([this.fb.control('')]),
    });
  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  removeEmployeeSkill(empIndex: number, skillIndex: number) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }
  ////////////////////dkills experience//////////////////////////////
  skillsex(empIndex: number, skillIndex: number): FormArray {
    return <FormArray>this.employeeSkills(empIndex).at(skillIndex).get('exp');
  }

 /*  newskillsex(): FormGroup {
    return this.fb.group({
      exp: this.fb.control(''),
    });
  } */

  addskillsex(empIndex: number, skillIndex: number, exIndex:number) {
    this.skillsex(empIndex, skillIndex).push(this.fb.control(''));
  }

  removeskillsex(empIndex: number, skillIndex: number, exIndex) {
    this.skillsex(empIndex, skillIndex).removeAt(exIndex);
  }
  ///////////////////////////////////////////////////////////
  onSubmit() {
    console.log(this.empForm.value);
  }
}
