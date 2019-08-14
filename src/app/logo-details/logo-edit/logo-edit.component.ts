import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-logo-edit",
  templateUrl: "./logo-edit.component.html",
  styleUrls: ["./logo-edit.component.scss"]
})
export class LogoEditComponent {
  id: string = "text";
  @Input() logoText: string;
  @Input() objImgFont;
  @Input() idImgS: string;
  @Output() logoTextChange = new EventEmitter<string>();
  @Output() logoFontChange = new EventEmitter<object>();
  @Output() logoImgChange = new EventEmitter<string>();

  constructor() {}

  switchEditorChange(id) {
    this.id = id;
  }
}
