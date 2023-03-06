import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent }from './components/date-picker/date-picker.component';
import { MatPaginatorModule } from '@angular/material/paginator';


import { EnglishQuestionsComponent } from './components/english-questions/english-questions.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogAnswerComponent } from './components/dialog-answer/dialog-answer.component';
import { QuestionComponent } from './shared/question/question.component';


@NgModule({
  declarations: [
    AppComponent,
    DatePickerComponent,
    EnglishQuestionsComponent,
    DialogAnswerComponent,
    QuestionComponent,
  ],
  entryComponents: [DialogAnswerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
