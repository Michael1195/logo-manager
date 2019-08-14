import { Component, ViewChildren, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-switch-editor",
  templateUrl: "./switch-editor.component.html",
  styleUrls: ["./switch-editor.component.scss"]
})
export class SwitchEditorComponent {
  @Output() switchEditorChange = new EventEmitter<string>();

  constructor() {}

  @ViewChildren("switchEl") switchEl;

  switchEditor($event) {
    this.switchEl._results.forEach(elm =>
      elm.nativeElement.classList.remove("active")
    );
    let id;
    if ($event.target.closest("#text")) {
      this.switchEl._results[0].nativeElement.classList.add("active");
      id = "text";
    } else if ($event.target.closest("#font")) {
      this.switchEl._results[1].nativeElement.classList.add("active");
      id = "font";
    } else if ($event.target.closest("#icon")) {
      this.switchEl._results[2].nativeElement.classList.add("active");
      id = "icon";
    }
    this.switchEditorChange.emit(id);
  }
}
