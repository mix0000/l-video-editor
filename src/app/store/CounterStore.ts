import { makeAutoObservable } from "mobx";

export const counterStore = makeAutoObservable({
  counter: 1,
  increment() {
    this.counter++;
  },
  decrement() {
    this.counter--;
  },
});
