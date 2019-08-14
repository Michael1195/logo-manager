import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  AfterViewInit
} from "@angular/core";

import { LogoService } from "../../../logo.service";

@Component({
  selector: "app-edit-img",
  templateUrl: "./edit-img.component.html",
  styleUrls: ["./edit-img.component.scss"]
})
export class EditImgComponent implements AfterViewInit {
  arrImgS;
  arrImgL;
  @Input() idImgS: string;
  @Output() logoImgChange = new EventEmitter<string>();

  constructor(private logoService: LogoService) {
    this.arrImgS = this.logoService.getImgS();
    this.arrImgL = this.logoService.getImgL();
  }

  private context: CanvasRenderingContext2D;

  @ViewChildren("imgEl") imgEl;

  ngAfterViewInit() {
    this.imgEl._results.forEach((elm, idx) => {
      this.draw(elm, idx);
    });
  }

  draw(elm, idx) {
    if (this.idImgS == idx) elm.nativeElement.classList.add("active");
    let ctx = this.context;
    ctx = elm.nativeElement.getContext("2d");
    let img = new Image();
    img.src = this.arrImgS[idx];
    img.onload = function() {
      ctx.drawImage(img, 10, 10, 35, 35);
    };
  }

  handlerIcon(id) {
    this.imgEl._results.forEach((elm, idx) =>
      id == idx
        ? elm.nativeElement.classList.add("active")
        : elm.nativeElement.classList.remove("active")
    );
    this.arrImgL.forEach((img, idx) =>
      id == idx ? this.logoImgChange.emit(img) : null
    );
  }
}
