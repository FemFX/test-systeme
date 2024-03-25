import { useModal } from "@/hooks/use-modal-store";
import React, { useRef, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Product } from "@/types/products";
import { PricePlan } from "@/types/price-plans";

const EditModal = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { data, isOpen, onClose, type } = useModal();

  const initialValue =
    data.item && "name" in data.item
      ? data.item.name
      : data.item && "description" in data.item
      ? data.item.description
      : "";
  //fix
  const [value, setValue] = useState<string>(initialValue);

  const isModalOpen = isOpen && type === "edit";

  const handleSave = () => {
    const idx = data.items.findIndex((item) => item.id === data.item.id);
    if ("name" in data.items[idx]) {
      (data.items[idx] as Product).name = value;
    } else {
      (data.items[idx] as PricePlan).description = value;
    }
    closeRef.current?.click();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogTitle>
          {"name" in data ? <>Name</> : <>Description</>}
        </DialogTitle>
        <Input
          onChange={(e) => setValue(e.target.value)}
          defaultValue={initialValue}
        />
        <Button onClick={handleSave} className="w-max">
          Save
        </Button>
      </DialogContent>
      <DialogClose ref={closeRef}></DialogClose>
    </Dialog>
  );
};

export default EditModal;
