import { Component, OnInit } from '@angular/core';
import {PhotoService} from "../photo.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Photo} from "../photo";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  photoList: Photo[] = [];
  photoForm: FormGroup;
  constructor(
    private photoService:PhotoService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.photoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      url: ['', [Validators.required, Validators.minLength(10)]],
      thumbnailUrl: ['', [Validators.required, Validators.minLength(10)]],

    });
    this.photoService
      .getPosts()
      .subscribe(next => (this.photoList = next), error => (this.photoList = []));
  }
  onSubmit() {
    if (this.photoForm.valid) {
      const {value} = this.photoForm;
      this.photoService.createPost(value)
        .subscribe(next => {
          this.photoList.unshift(next);
          this.photoForm.reset({
            title: '',
            url: '',
            thumbnailUrl:'',
            
          });
        }, error => console.log(error));
    }
  }
  deletePost(i) {
    const post = this.photoList[i];
    this.photoService.deletePost(post.id).subscribe(() => {
      this.photoList = this.photoList.filter(t => t.id !== post.id);
    });
  }
}
