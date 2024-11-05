import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
  documentId: Id<"documents">;
}

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();

  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const onRemove = async () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted.",
      error: "Failed to delete note!"
    });

    router.push("/documents");
  }

  const onRestore = async () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored.",
      error: "Failed to restore note!"
    });
  }

  return (
    <div className="relative w-full flex items-center justify-center gap-x-4 bg-rose-500 text-center text-white p-2">
      <TriangleAlert className="absolute left-6 size-6" />
      <p>This page is archived.</p>
      <Button
        variant="outline"
        size="sm"
        onClick={onRestore}
        className="bg-transparent border-white hover:bg-primary/5 text-white hover:text-white py-1"
      >
        Restore
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent border-white hover:bg-primary/5 text-white hover:text-white py-1"
        >
          Delete Forever
        </Button>
      </ConfirmModal>
    </div>
  );
}

export default Banner;