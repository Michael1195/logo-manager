import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-edit-text",
  templateUrl: "./edit-text.component.html",
  styleUrls: ["./edit-text.component.scss"]
})
export class EditTextComponent {
  @Input() logoText: string;
  @Output() logoTextChange = new EventEmitter<string>();

  constructor() {}
}
