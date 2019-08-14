import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from "@angular/core";

import { LogoService } from "../../../logo.service";

@Component({
  selector: "app-edit-font",
  templateUrl: "./edit-font.component.html",
  styleUrls: ["./edit-font.component.scss"]
})
export class EditFontComponent {
  listFonts;
  @Input() objImgFont;
  @Output() logoFontChange = new EventEmitter();

  @ViewChild("currentEl") currentEl: ElementRef;
  @ViewChild("listEl") listEl: ElementRef;

  constructor(private logoService: LogoService) {
    this.listFonts = this.logoService.getFonts();
  }

  handlerFonts(elm) {
    this.currentEl.nativeElement.children[1].classList.toggle("active");
    this.listEl.nativeElement.classList.toggle("active");
    if(elm.closest(".fonts__current")) return;
    let id = elm.nodeName === "IMG" ? elm.parentNode.id : elm.id;
    this.listFonts.subscribe(data => {
      this.logoFontChange.emit(data[id]);
    });
  }
}
