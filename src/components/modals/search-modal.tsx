import { api } from "@/convex/_generated/api";
import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react";
import { CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearch } from "@/hooks/use-search";

export const SearchModal = () => {
  const router = useRouter();
  const { user } = useUser();

  const documents = useQuery(api.documents.getSearch);

  const { isOpen, onClose, toggle } = useSearch();

  const onSelect = (docId: string) => {
    router.push(`/documents/${docId}`);
    onClose();
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder={`Search ${user?.fullName}'s Sketch...`}
      />
      <CommandList>
        <CommandGroup heading="Documents">
          {documents?.map(document => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={() => onSelect(document._id)}
            >
              {document.icon ? (
                <p className="mr-2 size-4">
                  {document.icon}
                </p>
              ) : (
                <File className="mr-2 size-4" />
              )}
              <span>
                {document.title}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}