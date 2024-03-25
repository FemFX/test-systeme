"use client";

import { FC, useEffect, useState } from "react";
import EditModal from "./edit-modal";

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <EditModal />
    </>
  );
};

export default ModalProvider;
