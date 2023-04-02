import { Component, OnInit } from '@angular/core';
import { EnglishService } from '../../services/english.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paragraph-list',
  templateUrl: './paragraph-list.component.html',
  styleUrls: ['./paragraph-list.component.scss'],
})
export class ParagraphListComponent implements OnInit {
  paragraphs: any[];
  selectedParagraphs: any[] = [];
  subs: Subscription[] = [];
  constructor(private EnglishService: EnglishService, private router: Router) {}

  ngOnInit(): void {
    this.getAllParagraphs();
  }
  getAllParagraphs() {
    const sub1 = this.EnglishService.getAll().subscribe({
      next: (res) => {
        this.paragraphs = res.paragraphData;
        console.log(res.paragraphData);
      },
      error: (err: any) => {
        console.log(err.message);

        //alert('server error');
      },
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
  // Selected item
  fetchSelectedItems() {
    this.selectedParagraphs = this.paragraphs.filter((value, index) => {
      return value.isChecked;
    });
  }

  export() {
    let folderName='';
    //console.log(this.selectedParagraphs);
    if (this.selectedParagraphs.length != 0) {
      this.EnglishService.exportProject(this.selectedParagraphs).subscribe({
        next: (res) => {
          console.log(res);
          folderName=res.zipFolder;
        },
        error: (err: any) => {
          console.log(err.message);
        },
        complete: () => {
           window.open(
            `http://192.168.109.32:3000/paragraph/zip/folder/${folderName}`
          );

           this.ngOnInit();

/*
          this.EnglishService.getProgject(folderName).subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (err: any) => {
              console.log(err.message);
            },
            complete: () => {
              console.log('finish');
            },
          });
          this.ngOnInit(); */
        },
      });
    } else {
      alert("you havn't selected any question to export");
    }
  }

  changeSelection() {
    this.fetchSelectedItems();
  }
}
