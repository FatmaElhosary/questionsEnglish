import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent }from './components/date-picker/date-picker.component';
import { HttpClientModule } from '@angular/common/http';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { ActivatedRouteSnapshot, RouteReuseStrategy } from '@angular/router';
import { HighlightPipe } from './pipes/highlight.pipe';
import { QuestionsComponent } from './shared/questions/questions.component';
import { AddParagraphComponent } from './components/add-paragraph/add-paragraph.component';
import { ParagraphListComponent } from './components/paragraph-list/paragraph-list.component';
import { ParagraphDetailsComponent } from './components/paragraph-details/paragraph-details.component';
import { MatButtonModule } from '@angular/material/button';
import { UpdateParagraphComponent } from './components/update-paragraph/update-paragraph.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  store(route: ActivatedRouteSnapshot, handle: {}): void {}
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }
  retrieve(route: ActivatedRouteSnapshot): {} {
    return null;
  }
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return false; // default is true if configuration of current and future route are the same
  }
}
@NgModule({
  declarations: [
    AppComponent,
    DatePickerComponent,
    ParagraphComponent,
    HighlightPipe,
    QuestionsComponent,
    AddParagraphComponent,
    ParagraphListComponent,
    ParagraphDetailsComponent,
    UpdateParagraphComponent,
    NavBarComponent,
    SpinnerComponent,
  ],
  /*  entryComponents: [DialogAnswerComponent], */
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
    NgxPaginationModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
  ],
  providers: [
    ///to change view in navigation link change
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
