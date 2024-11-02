import { create } from "zustand"

export type modalType = "settings";

interface modalStore {
  type: modalType | null;
  isOpen: boolean;
  docId: string | null;
  onOpen: (type: modalType, docId?: string) => void;
  onClose: () => void;
}

export const useModal = create<modalStore>((set) => ({
  type: null,
  isOpen: false,
  docId: null,
  onOpen: (type, docId) => set({ isOpen: true, type, docId }),
  onClose: () => set({ isOpen: false, type: null, docId: null }),
}));