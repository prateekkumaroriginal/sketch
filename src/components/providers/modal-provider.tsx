import { useEffect, useState } from "react"
import { SearchModal } from "@/components/modals/search-modal";
import { SettingsModal } from "@/components/modals/settings-modal";
import CoverImageModal from "../modals/cover-image-modal";

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
      <SettingsModal />
      <CoverImageModal />
    </>
  )
}