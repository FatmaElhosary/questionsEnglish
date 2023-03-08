import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

import { ParagraphComponent } from './components/paragraph/paragraph.component';

const routes: Routes = [
  /*  {path:'',component:DatePickerComponent}, */
  { path: '', redirectTo: '/paragraphs/1', pathMatch: 'full' },
  { path: 'paragraphs/:id', component: ParagraphComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//, { onSameUrlNavigation: 'reload' }
