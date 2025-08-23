"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { SingleImageDropzone } from "@/components/upload/single-image";
import { UploaderProvider, useUploader } from '@/components/upload/uploader-provider';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";

const ModalContent = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const { uploadFiles, isUploading } = useUploader();

  return (
    <>
      <SingleImageDropzone
        className="w-full h-80"
        disabled={isSubmitting}
      />
      <Button
        onClick={() => uploadFiles()}
        disabled={isUploading}
      >
        Save
      </Button>
    </>
  );
};

const CoverImageModal = () => {
  const update = useMutation(api.documents.update);
  const { type, docId, isOpen, onClose, url } = useModal();
  const { edgestore } = useEdgeStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isModalOpen = isOpen && type === "coverImage";

  const onChange = async ({ file }: { file: File }) => {
    setIsSubmitting(true);

    const res = await edgestore.publicFiles.upload({
      file,
      options: {
        replaceTargetUrl: url
      }
    });

    await update({
      id: docId as Id<"documents">,
      coverImage: res.url
    });

    onModalClose();
    return res;
  }

  const onModalClose = () => {
    // setFile(undefined);
    setIsSubmitting(false);
    onClose();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg">
            Cover Image
          </h2>
        </DialogHeader>
        <UploaderProvider uploadFn={onChange}>
          <ModalContent isSubmitting={isSubmitting} />
        </UploaderProvider>
      </DialogContent>
    </Dialog>
  );
}

export default CoverImageModal;