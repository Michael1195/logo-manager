import {
  Component,
  ViewChildren,
  Renderer2,
  AfterViewInit
} from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import Fontfaceobserver from "fontfaceobserver";

import { LogoService } from "../logo.service";
import { LocalStorage } from "../storage.service";

@Component({
  selector: "app-logo-list",
  templateUrl: "./logo-list.component.html",
  styleUrls: ["./logo-list.component.scss"]
})
export class LogoListComponent implements AfterViewInit {
  head = document.querySelector("head");
  arrImgS;
  arrLink;
  arrObjLogo = [];
  arrFontFamilyObs = [];

  @ViewChildren("canvasEl") canvasEl;

  private context: CanvasRenderingContext2D;

  constructor(
    private logoService: LogoService,
    private storage: LocalStorage,
    private spinner: NgxSpinnerService,
    private renderer: Renderer2
  ) {
    this.arrImgS = this.logoService.getImgS();
    this.arrLink = this.logoService.getLink();
  }

  ngAfterViewInit() {
    this.arrImgS.forEach((elm, idx) => {
      if (this.storage.get("obj-logo" + "-" + idx)) {
        this.arrObjLogo.push(this.storage.get("obj-logo" + "-" + idx));
      } else {
        this.arrObjLogo.push({
          font: "20px Lato",
          text: "LOGO SOME TEXT",
          img: elm
        });
      }
      this.handlerFontLink(idx);
    });
    this.handlerFontFace();
  }

  handlerFontLink(idx) {
    if (
      this.arrObjLogo[idx].link &&
      !this.arrLink.includes(this.arrObjLogo[idx].link)
    ) {
      let link = this.renderer.createElement("link");
      link.rel = "stylesheet";
      link.href = this.arrObjLogo[idx].link;
      this.renderer.appendChild(this.head, link);
      this.logoService.addLink(this.arrObjLogo[idx].link);
    }

    this.arrFontFamilyObs.push(
      new Fontfaceobserver(this.arrObjLogo[idx].font.substring(5)).load(
        null,
        7000
      )
    );
  }

  handlerFontFace() {
    let self = this;
    this.spinner.show();
    Promise.all(this.arrFontFamilyObs)
      .then(function(fonts) {
        fonts.forEach(function(font, idx) {
          self.spinner.hide();
          self.context = self.canvasEl._results[idx].nativeElement.getContext(
            "2d"
          );
          self.drawText(font.family, idx);
          self.drawImg(idx);
        });
      })
      .catch(function(err) {
        self.spinner.hide();
        console.warn("Some critical font are not available:", err);
      });
  }

  drawText(fontFamily, idx) {
    this.context.font = "20px " + fontFamily;
    this.context.textBaseline = "middle";
    this.context.textAlign = "center";
    this.context.fillStyle = "#747474";
    this.context.fillText(this.arrObjLogo[idx].text, 150, 220, 270);
  }

  drawImg(idx) {
    let ctx = this.context;
    let srcImgLength = this.arrObjLogo[idx].img.length;
    let idImg = this.arrObjLogo[idx].img.charAt(srcImgLength - 5);

    let img = new Image();
    img.src = "./assets/logo-image/small/s" + idImg + ".png";
    img.onload = function() {
      ctx.drawImage(img, 100, 60, 100, 100);
    };
  }
}
