import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LogoService {
  arrImgS = [
    "./assets/logo-image/small/s0.png",
    "./assets/logo-image/small/s1.png",
    "./assets/logo-image/small/s2.png",
    "./assets/logo-image/small/s3.png",
    "./assets/logo-image/small/s4.png",
    "./assets/logo-image/small/s5.png",
    "./assets/logo-image/small/s6.png",
    "./assets/logo-image/small/s7.png",
    "./assets/logo-image/small/s8.png"
  ];
  arrImgL = [
    "./assets/logo-image/large/l0.png",
    "./assets/logo-image/large/l1.png",
    "./assets/logo-image/large/l2.png",
    "./assets/logo-image/large/l3.png",
    "./assets/logo-image/large/l4.png",
    "./assets/logo-image/large/l5.png",
    "./assets/logo-image/large/l6.png",
    "./assets/logo-image/large/l7.png",
    "./assets/logo-image/large/l8.png"
  ];
  arrLink = [];

  constructor(private http: HttpClient) {}

  getImgS() {
    return this.arrImgS;
  }

  getImgL() {
    return this.arrImgL;
  }

  getLink() {
    return this.arrLink;
  }

  addLink(link) {
    this.arrLink.push(link);
  }

  getFonts() {
    return this.http.get("./assets/fonts.json");
  }
}
