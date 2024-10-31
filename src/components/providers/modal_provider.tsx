import { useEffect, useState } from "react"
import { SearchModal } from "../modals/search-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SearchModal />
    </>
  )
}