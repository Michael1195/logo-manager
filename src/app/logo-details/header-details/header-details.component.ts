import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header-details",
  templateUrl: "./header-details.component.html",
  styleUrls: ["./header-details.component.scss"]
})
export class HeaderDetailsComponent {
  @Output() buttonSaveChange = new EventEmitter();

  constructor() {}
}
