import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SidebarItem from "./SidebarItem";
import { Search, Trash2, Undo } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";

const TrashBox = ({ isMobile }: { isMobile: boolean }) => {
  const router = useRouter();
  const { documentId } = useParams();

  const documents = useQuery(api.documents.getTrash, {});
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((doc) => doc.title.toLowerCase().includes(search.toLowerCase()));

  const onClick = (docId: string) => {
    router.push(`/documents/${docId}`);
  }

  const onRestore = (
    event: React.MouseEvent<any, MouseEvent>,
    docId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: docId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored",
      error: "Failed to restore note!"
    });
  }

  const onRemove = (
    docId: Id<"documents">
  ) => {
    const promise = remove({ id: docId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted",
      error: "Failed to delete note!"
    });

    if (documentId === docId) {
      router.push("/documents");
    }
  }

  if (documents === undefined) {
    return (
      <div className="flex h-full p-4 items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <Popover>
      <PopoverTrigger className="sticky w-full bottom-0">
        <SidebarItem
          icon={Trash2}
          label="Trash"
        />
      </PopoverTrigger>
      <PopoverContent
        side={isMobile ? "bottom" : "right"}
        align="center"
        className="mb-2"
      >
        <div className="relative flex items-center gap-x-1 p-2">
          <Search className="absolute right-4 size-4 z-10" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by title..."
            className="h-8 pr-7 z-20 bg-transparent focus-visible:ring-transparent"
          />
        </div>

        <div className="mt-2 px-1 pb-1">
          <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
            No documents found.
          </p>
          {filteredDocuments?.map((document) => (
            <div
              key={document._id}
              role="button"
              onClick={() => onClick(document._id)}
              className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
            >
              <span className="truncate pl-2">
                {document.title}
              </span>

              <div className="flex items-center">
                <div
                  onClick={(e) => onRestore(e, document._id)}
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  <Undo className="size-4 text-muted-foreground" />
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                  <ConfirmModal onConfirm={() => onRemove(document._id)}>
                    <div
                      role="button"
                      className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                      <Trash2 className="size-4 text-muted-foreground" />
                    </div>
                  </ConfirmModal>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default TrashBox;