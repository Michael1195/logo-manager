import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import Fontfaceobserver from "fontfaceobserver";

import { ComponentCanDeactivate } from "../exit.details.guard";
import { Observable } from "rxjs";

import { LogoService } from "../logo.service";
import { LocalStorage } from "../storage.service";

@Component({
  selector: "app-logo-details",
  templateUrl: "./logo-details.component.html",
  styleUrls: ["./logo-details.component.scss"]
})
export class LogoDetailsComponent implements OnInit, ComponentCanDeactivate {
  head = document.querySelector("head");
  logo: string;
  objLogo;
  arrLink;
  objImgFont;
  idImgS;
  logoId;
  islink: boolean = false;
  saved: boolean = true;

  @ViewChild("detailsEl") detailsEl: ElementRef;
  private context: CanvasRenderingContext2D;

  constructor(
    private route: ActivatedRoute,
    private logoService: LogoService,
    private storage: LocalStorage,
    private spinner: NgxSpinnerService,
    private renderer: Renderer2
  ) {
    this.arrLink = this.logoService.getLink();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.logo = this.logoService.getImgL()[+params.get("logoId")];
      this.logoId = [+params.get("logoId")];
    });

    if (this.storage.get("obj-img-font" + "-" + this.logoId)) {
      this.objImgFont = this.storage.get("obj-img-font" + "-" + this.logoId);
    } else {
      this.objImgFont = {
        srcImg: "./assets/font-image/lato.png",
        altImg: "Lato"
      };
    }

    if (this.storage.get("obj-logo" + "-" + this.logoId)) {
      this.objLogo = this.storage.get("obj-logo" + "-" + this.logoId);
    } else {
      this.objLogo = {
        font: "50px Lato",
        text: "LOGO SOME TEXT",
        img: this.logo
      };
    }

    let srcImgLength = this.objLogo.img.length;
    this.idImgS = this.objLogo.img.charAt(srcImgLength - 5);

    this.context = this.detailsEl.nativeElement.getContext("2d");

    if (this.objLogo.link && !this.arrLink.includes(this.objLogo.link)) {
      this.createLink();
      this.fontFace();
      if (!this.islink) {
        this.drawText();
        this.drawImg();
      } else {
        this.drawImg();
      }
    } else {
      this.drawText();
      this.drawImg();
    }
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (!this.saved) {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = function() {
        window.history.pushState(null, "", window.location.href);
      };
      return confirm(
        "Эта страница просит вас подтвердить, что вы хотите уйти — при этом введённые вами данные могут не сохраниться."
      );
    } else {
      return true;
    }
  }

  createLink() {
    let link = this.renderer.createElement("link");
    link.rel = "stylesheet";
    link.href = this.objLogo.link;
    this.renderer.appendChild(this.head, link);
    this.logoService.addLink(this.objLogo.link);
  }

  fontFace() {
    let self = this;
    let fontFace = new Fontfaceobserver(self.objLogo.font.substring(5));
    self.spinner.show();
    fontFace.load(null, 5000).then(
      function() {
        self.islink = true;
        self.spinner.hide();
        self.drawText();
      },
      function(err) {
        self.spinner.hide();
        console.warn("Some critical font are not available:", err);
      }
    );
  }

  drawText() {
    this.context.font = this.objLogo.font;
    this.context.textBaseline = "middle";
    this.context.textAlign = "center";
    this.context.fillStyle = "#747474";
    this.context.clearRect(0, 285, 1590, 115);
    this.context.fillText(this.objLogo.text, 795, 350, 1550);
  }

  drawImg() {
    let ctx = this.context;
    let img = new Image();
    img.src = this.objLogo.img;
    img.onload = function() {
      ctx.clearRect(0, 50, 1590, 235);
      ctx.drawImage(img, 695, 70, 200, 200);
    };
  }

  changeText($event) {
    this.saved = false;
    this.objLogo.text = $event;
    this.drawText();
  }

  changeImg(srcImg) {
    this.saved = false;
    let srcImgLength = srcImg.length;
    this.idImgS = srcImg.charAt(srcImgLength - 5);
    this.objLogo.img = srcImg;
    this.drawImg();
  }

  changeFont(font) {
    this.saved = false;
    let strFontFamily = font.family
      .split(" ")
      .join("-")
      .toLowerCase();
    this.objImgFont.srcImg = "./assets/font-image/" + strFontFamily + ".png";
    this.objImgFont.altImg = font.family;

    this.objLogo.font = "50px " + font.family;
    if (font.link) this.objLogo.link = font.link;

    if (font.link && !this.arrLink.includes(font.link)) {
      this.createLink();
      this.fontFace();
    } else {
      this.drawText();
    }
  }

  save() {
    this.saved = true;
    this.storage.set("obj-logo" + "-" + this.logoId, this.objLogo);
    this.storage.set("obj-img-font" + "-" + this.logoId, this.objImgFont);
  }
}
