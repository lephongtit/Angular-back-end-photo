import { Component, OnInit } from '@angular/core';
import {Photo} from "../photo";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PhotoService} from "../photo.service";

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.scss']
})
export class PhotoEditComponent implements OnInit {
  photo: Photo;
  photoForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.photoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      url: ['', [Validators.required, Validators.minLength(10)]]
    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.photoService.getPostById(id).subscribe(
      next => {
        this.photo = next;
        this.photoForm.patchValue(this.photo);
      },
      error => {
        console.log(error);
        this.photo = null;
      }
    );
    
  }
  onSubmit() {
    if (this.photoForm.valid) {
      const { value } = this.photoForm;
      const data = {
        ...this.photo,
        ...value
      };
      this.photoService.updatePost(data).subscribe(
        next => {
          this.router.navigate(['/photo']);
        },
        error => console.log(error)
      );
    }
  }

}
