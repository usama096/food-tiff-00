import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  fileName = '';
  url: any;
  @Output('fileUpload') fileUpload: EventEmitter<string> = new EventEmitter();
  @Input('imageSrc') imageSrc!: string
  constructor() { }

  ngOnInit(): void {
  }
  selectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      if (file) {
        this.fileUpload.emit(event)
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("file", file, file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = reader.result as string
        };

        reader.readAsDataURL(file);
      }
    }
  }
}
