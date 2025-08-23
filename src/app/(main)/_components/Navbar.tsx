import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import Title from "./Title";
import Banner from "./Banner";
import PageMenu from "./PageMenu";
import Publish from "./Publish";

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
      <nav className="bg-background dark:bg-[#1F1F1F] p-3 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <PageMenu.Skeleton />
        </div>
      </nav>
    )
  }

  if (document === null) {
    return notFound();
  }

  return (
    <>
      {(isCollapsed || !isMobile) && (
        <>
          <nav className="bg-background dark:bg-[#1F1F1F] p-3 w-full flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              {isCollapsed && (
                <div>
                  <Menu
                    role="button"
                    onClick={onResetWidth}
                    className="size-6 text-muted-foreground"
                  />
                </div>
              )}

              <div className="flex items-center justify-between w-full">
                <Title initialData={document} />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Publish
                initialData={document}
              />

              <PageMenu
                documentId={document._id}
                isArchived={document.isArchived}
              />
            </div>
          </nav >

          {document.isArchived && (
            <Banner documentId={document._id} />
          )}
        </>
      )}
    </>
  );
}

export default Navbar;