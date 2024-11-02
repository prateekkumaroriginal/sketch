import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./Title";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
  isMobile: boolean;
}

const Navbar = ({
  isCollapsed,
  onResetWidth,
  isMobile
}: NavbarProps) => {
  const params = useParams();
  const document = useQuery(api.documents.getById, { id: params.documentId as Id<"documents"> });

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] p-3 w-full">
        <Title.Skeleton />
      </nav>
    )
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      {(isCollapsed || !isMobile) && <nav className="bg-background dark:bg-[#1F1F1F] p-3 w-full flex items-center gap-x-4">
        {isCollapsed && <Menu
          role="button"
          onClick={onResetWidth}
          className="size-6 text-muted-foreground"
        />}

        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
        </div>
      </nav>}
    </>
  );
}

export default Navbar;