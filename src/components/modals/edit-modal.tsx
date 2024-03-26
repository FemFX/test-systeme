"use client";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DataItem } from "@/types/table";

const EditModal = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { data, isOpen, onClose, type } = useModal();

  const [value, setValue] = useState<string>(
    Object.values(data.value || {})[0]
  );
  useEffect(() => {
    setValue(Object.values(data.value || {})[0]);
  }, [data.value]);
  const isModalOpen = isOpen && type === "edit";

  const handleSave = () => {
    data.handleUpdate({
      id: data.id,
      value: value,
      key: Object.keys(data.value!)[0] as keyof DataItem,
    });
    closeRef.current?.click();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogTitle className="capitalize">
          {Object.keys(data.value || {})[0]}
        </DialogTitle>
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          defaultValue={Object.values(data.value || {})[0]}
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
