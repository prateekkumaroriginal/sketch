import { create } from "zustand"

export type modalType = "settings" | "coverImage";

interface modalStore {
  type: modalType | null;
  isOpen: boolean;
  docId?: string;
  url?: string;
  onOpen: (type: modalType, docId?: string, url?: string) => void;
  onClose: () => void;
}

export const useModal = create<modalStore>((set) => ({
  type: null,
  isOpen: false,
  docId: undefined,
  url: undefined,
  onOpen: (type, docId, url = undefined) => set({ isOpen: true, type, docId, url }),
  onClose: () => set({ isOpen: false, type: null, docId: undefined, url: undefined }),
}));