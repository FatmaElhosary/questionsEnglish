import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { AddParagraphComponent } from './components/add-paragraph/add-paragraph.component';
import { TestFormComponent } from './components/test-form/test-form.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {
    path: 'paragraphs',
    component: ParagraphComponent,
  },
  { path: '', redirectTo: '/paragraphs', pathMatch: 'full' },
  { path: 'paragraphs/new', component: AddParagraphComponent },
  { path: 'test', component: TestComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
//, { onSameUrlNavigation: 'reload' }
