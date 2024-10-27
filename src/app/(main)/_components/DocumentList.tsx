"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
  parentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">;
}

const DocumentList = ({
  parentId,
  level = 0,
}: DocumentListProps) => {
  const { documentId } = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (docId: string) => {
    setExpanded(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  }

  const documents = useQuery(api.documents.getSidebar, {
    parentId
  });

  const onRedirect = (docId: string) => {
    return router.push(`/documents/${docId}`);
  }

  if (documents === undefined) {
    return (
      <>
        <SidebarItem.Skeleton level={level} />
        <div>
          <SidebarItem.Skeleton level={level} />
          <SidebarItem.Skeleton level={level} />
        </div>
      </>
    )
  }

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No Pages Inside
      </p>

      {documents.map((document) => (
        <div key={document._id}>
          <SidebarItem
            id={document._id}
            label={document.title}
            icon={FileIcon}
            onClick={() => onRedirect(document._id)}
            documentIcon={document.icon}
            active={documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />

          {expanded[document._id] && <DocumentList
            parentId={document._id}
            level={level + 1}
          />}
        </div>
      ))}
    </>
  );
}

export default DocumentList;