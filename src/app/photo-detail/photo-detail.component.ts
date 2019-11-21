import { Component, OnInit } from '@angular/core';
import {Photo} from "../photo";
import {ActivatedRoute} from "@angular/router";
import {PhotoService} from "../photo.service";

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss']
})
export class PhotoDetailComponent implements OnInit {
  photo: Photo;
  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.photoService.getPostById(id).subscribe(
      next => (this.photo = next),
      error => {
        console.log(error);
        this.photo = null;
      }
    );
  }
}


