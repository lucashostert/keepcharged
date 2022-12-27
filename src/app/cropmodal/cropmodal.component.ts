import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cropmodal',
  templateUrl: './cropmodal.component.html'
})
export class CropmodalComponent implements OnInit {
  @ViewChild('cropper') cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;
  avatar: any;
  previewWidth;
  previewHeight;

  constructor(public activeModal: NgbActiveModal) {
    this.avatar = {};
  }

  ngOnInit() {
  }

  init(image, width, height, previewWidth, previewHeight, rounded = true) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.canvasWidth = 350;
    this.cropperSettings.canvasHeight = 250;
    this.cropperSettings.rounded = rounded;
    this.cropperSettings.noFileInput = true;

    this.cropperSettings.width = width;
    this.cropperSettings.height = height;
    this.cropperSettings.croppedWidth = width;
    this.cropperSettings.croppedHeight = height;

    this.previewWidth = previewWidth;
    this.previewHeight = previewHeight;

    const that = this;
    setTimeout(function() { that.cropper.setImage(image); }, 800);
  }

  closeModal() {
    this.activeModal.close(this.avatar);
  }

  dimissModal() {
    this.activeModal.close();
  }
}
