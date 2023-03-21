import { Component, OnInit } from '@angular/core';
import { EnglishService } from '../../services/english.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-paragraph-list',
  templateUrl: './paragraph-list.component.html',
  styleUrls: ['./paragraph-list.component.scss'],
})
export class ParagraphListComponent implements OnInit {
  paragraphs: any[];
  subs: Subscription[] = [];
  constructor(private EnglishService: EnglishService) {}

  ngOnInit(): void {
    this.getAllParagraphs();
  }
  getAllParagraphs() {
    const sub1 = this.EnglishService.getAll().subscribe({
      next: (res) => {
        this.paragraphs = res.paragraphData;
        console.log(res.paragraphData);
      },
      error: (err: any) => {},
      complete: () => {},
    });
    this.subs.push(sub1);
  }

  deleteParagraph(paragraphId: string) {
    console.log(paragraphId);

    const sub2 = this.EnglishService.deletePAragraph(paragraphId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err: any) => {},
      complete: () => {
        this.paragraphs = this.paragraphs.filter(
          (paragraph) => paragraph['_id'] != paragraphId
        );
      },
    });
    this.subs.push(sub2);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
