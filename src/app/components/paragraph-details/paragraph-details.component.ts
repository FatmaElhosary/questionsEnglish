import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnglishService } from '../../services/english.service';

@Component({
  selector: 'app-paragraph-details',
  templateUrl: './paragraph-details.component.html',
  styleUrls: ['./paragraph-details.component.scss'],
})
export class ParagraphDetailsComponent implements OnInit {
  paragraphId: string;
  paragraph: any;
  constructor(
    private EnglishService: EnglishService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paragraphId = this.ActivatedRoute.snapshot.paramMap.get('id');
    console.log(this.paragraphId);
    this.getParagraph(this.paragraphId);
  }

  getParagraph(paragraphId: string) {
    this.EnglishService.getParagraph(paragraphId).subscribe({
      next: (res) => {
        this.paragraph = res.existingParagraph;
      },
      error:()=>{},
      complete:()=>{}

    });
  }
}
