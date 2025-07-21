import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { MoreHorizontal, Trash2, Undo } from "lucide-react";
import { toast } from "sonner";

interface PageMenuProps {
  documentId: Id<"documents">;
  isArchived: boolean;
}

const PageMenu = ({
  documentId,
  isArchived
}: PageMenuProps) => {
  const { user } = useUser();
  const archiveDocument = useMutation(api.documents.archive);
  const restore = useMutation(api.documents.restore);

  const onArchive = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!documentId) {
      return;
    }

    const promise = archiveDocument({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash",
      error: "Failed to delete note!"
    });
  }

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored",
      error: "Failed to restore note!"
    });
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
        >
          <MoreHorizontal className="size-6 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        side="bottom"
        alignOffset={8}
        forceMount
      >
        {isArchived ? (
          <DropdownMenuItem
            className="cursor-pointer text-emerald-500 focus:bg-emerald-500 focus:text-white"
            onClick={onRestore}
          >
            <Undo className="size-4 mr-2" />
            Restore
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="cursor-pointer text-red-500 focus:bg-red-500 focus:text-white"
            onClick={onArchive}
          >
            <Trash2 className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        )
        }
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by: {user?.username || user?.emailAddresses[0].emailAddress}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

PageMenu.Skeleton = function PageMenuSkeleton() {
  return (
    <Skeleton className="h-9 w-12" />
  )
}

export default PageMenu;