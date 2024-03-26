import { DataItem } from "@/types/table";
import { create } from "zustand";

export type ModalType = "edit";

type ModalData = {
  id: number;
  value: Record<string, string>;
  item: DataItem;
  handleUpdate: <K extends keyof DataItem>({
    id,
    value,
    key,
  }: {
    id: number;
    value: string;
    key: K;
  }) => void;
};

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {} as ModalData,
  isOpen: false,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
