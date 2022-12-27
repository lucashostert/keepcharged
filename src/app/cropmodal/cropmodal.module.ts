import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-img-cropper';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CropmodalComponent } from './cropmodal.component';

@NgModule({
  declarations: [
    CropmodalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ImageCropperModule,
  ]
})
export class CropmodalModule { }
