import { Component, OnInit } from '@angular/core';
import { EnglishService } from '../../services/english.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(
    private EnglishService: EnglishService,
    private fb: FormBuilder
  ) {}
  userForm: FormGroup;
  userData: any;
  get usersArray() {
    return <FormArray>this.userForm.get('users');
  }
  ngOnInit() {
    this.userForm = this.fb.group({
      users: this.fb.array([]),
    });
    this.userData = this.EnglishService.fetchUsersList();
    this.displayUsers();
  }
  createCarFormGroup(car: any) {
    return this.fb.group({
      name: [car.name, [Validators.required]],
      models: [car.models, [Validators.required]],
    });
  }

  loadCarsArray(cars: any[]) {
    let transformedCars = cars.map((car: any) => this.createCarFormGroup(car));
    return transformedCars;
  }

  createUserFormGroup(user: any) {
    return this.fb.group({
      id: [{ value: user.id, disabled: true }],
      name: [user.name, [Validators.required]],
      username: [user.username, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      address: this.fb.group({
        street: [user.address.street, [Validators.required]],
        suite: [user.address.suite, [Validators.required]],
        city: [user.address.city, [Validators.required]],
        zipcode: [user.address.zipcode, [Validators.required]],
        geo: this.fb.group({
          lat: [user.address.geo.lat, [Validators.required]],
          lng: [user.address.geo.lng, [Validators.required]],
        }),
      }),
      phone: [user.phone, [Validators.required]],
      website: [user.website, [Validators.required]],
      company: this.fb.group({
        name: [user.company.name, [Validators.required]],
        catchPhrase: [user.company.catchPhrase, [Validators.required]],
        bs: [user.company.bs, [Validators.required]],
      }),
      cars: this.fb.array(this.loadCarsArray(user.cars)),
    });
  }
  displayUsers() {
    let transformedUsers = this.userData.map((user: any) =>
      this.createUserFormGroup(user)
    );
    this.userForm.setControl('users', this.fb.array(transformedUsers));
  }

  track(item: any, index: number) {
    return index;
  }
}
