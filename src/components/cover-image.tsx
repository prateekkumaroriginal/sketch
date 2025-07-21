"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from 'lucide-react';
import { useModal } from "@/hooks/use-modal-store";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

const CoverImage = ({
  url,
  preview
}: CoverImageProps) => {
  const { onOpen } = useModal();
  const { documentId } = useParams();
  const { edgestore } = useEdgeStore();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({ url });
    }
    removeCoverImage({ id: documentId as Id<"documents"> });
  }

  return (
    <div className={cn(
      "group relative w-full h-[30vh]",
      !url && "h-[10vh]",
      url && "bg-muted"
    )}>
      {!!url && (
        <Image
          src={url}
          fill
          alt="Cover Image"
          className="object-cover"
        />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2 transition">
          <Button
            onClick={() => onOpen("coverImage", documentId as string, url)}
            size="sm"
          >
            <ImageIcon className="size-4 mr-2" />
            Change Cover
          </Button>
          <Button
            onClick={onRemove}
            size="sm"
          >
            <X className="size-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}

export default CoverImage;