import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface SidebarItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

const SidebarItem = ({
  id,
  label,
  onClick,
  icon: Icon,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand
}: SidebarItemProps) => {
  const router = useRouter();
  const createDocument = useMutation(api.documents.create);
  const archiveDocument = useMutation(api.documents.archive);

  const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    onExpand?.();
  }

  const onCreate = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) {
      return;
    }

    const promise = createDocument({
      title: "Untitled",
      parentId: id
    }).then((documentId) => {
      if (!expanded) {
        onExpand?.();
      }
      router.push(`/documents/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created",
      error: "Failed to create a new note!"
    });
  }

  const onArchive = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) {
      return;
    }

    const promise = archiveDocument({ id });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash",
      error: "Failed to delete note!"
    });
  }

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: `${(level + 1) * 12}px` }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 p-0.5 mr-1 transition"
          onClick={handleExpand}
        >
          <ChevronRight className={cn(
            "size-4 shrink-0 text-muted-foreground/50",
            expanded && "rotate-90 transition duration-200",
            !expanded && "transition duration-200"
          )} />
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 mr-2 text-muted-foreground">
          {documentIcon}
        </div>
      ) : <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      }

      <span className="truncate">
        {label}
      </span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-[2px] bg-primary/10 px-1.5 font-mono text-xs font-medium text-muted-foreground">
          <span>CTRL</span>
          <span>K</span>
        </kbd>
      )}

      {id && (
        <div className="ml-auto flex items-center gap-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto p-0.5 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
              >
                <MoreHorizontal className="size-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem
                className="cursor-pointer text-red-500 focus:bg-red-500 focus:text-white"
                onClick={onArchive}
              >
                <Trash className="size-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto p-0.5 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
          >
            <Plus className="size-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}

SidebarItem.Skeleton = function SidebarItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 29}px` : "12px"
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="bg-primary/5 h-4 w-4" />
      <Skeleton className="bg-primary/5 h-4 w-[60%]" />
    </div>
  )
}

export default SidebarItem;