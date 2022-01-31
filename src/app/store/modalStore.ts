import { makeAutoObservable, reaction } from "mobx";

interface ModalStore {
  isOpen: boolean;
  logs: string[];
}

export const modalStore = makeAutoObservable<ModalStore>({
  isOpen: false,
  logs: [],
});

reaction(
  () => !modalStore.isOpen,
  () => {
    modalStore.logs = [];
  },
);
