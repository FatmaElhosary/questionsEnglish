import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { AddParagraphComponent } from './components/add-paragraph/add-paragraph.component';
import { ParagraphListComponent } from './components/paragraph-list/paragraph-list.component';
import { ParagraphDetailsComponent } from './components/paragraph-details/paragraph-details.component';
import { UpdateParagraphComponent } from './components/update-paragraph/update-paragraph.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {
    path: 'paragraphs',
    component: ParagraphComponent,
  },
  { path: '', redirectTo: '/paragraphs', pathMatch: 'full' },
  { path: 'paragraphs/new', component: AddParagraphComponent },
  { path: 'paragraphs/list', component: ParagraphListComponent },
  { path: 'paragraph/:id', component: ParagraphDetailsComponent },
  { path: 'paragraph/update/:id', component: UpdateParagraphComponent },
  { path: 'test', component: TestComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
//, { onSameUrlNavigation: 'reload' }
