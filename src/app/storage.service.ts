import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalStorage {
  constructor() {}

  get(key) {
    try {
      const serializedState = localStorage.getItem(key);
      return JSON.parse(serializedState);
    } catch (err) {
      console.error("Get state error: ", err);
    }
  }
  set(key, value) {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error("Set state error: ", err);
    }
  }
  remove(key) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}
