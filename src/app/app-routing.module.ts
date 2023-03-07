import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { EnglishQuestionsComponent } from './components/english-questions/english-questions.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';

const routes: Routes = [
  /*  {path:'',component:DatePickerComponent}, */
  { path: '', component: EnglishQuestionsComponent },
  { path: 'paragraphs/:id', component: ParagraphComponent },
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//, { onSameUrlNavigation: 'reload' }
