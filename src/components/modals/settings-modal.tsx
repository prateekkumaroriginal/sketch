"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { ModeToggle } from "@/components/mode-toggle";

export const SettingsModal = () => {
  const { type, isOpen, onClose } = useModal();

  const isModalOpen = isOpen && type === "settings";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg">
            My Settings
          </h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <span className="leading-none">Appearance</span>
            <span className="text-xs text-muted-foreground">
              Customize how Sketch looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  )
}