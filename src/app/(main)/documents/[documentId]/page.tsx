"use client";

import CoverImage from "@/components/cover-image";
import Toolbar from "@/app/(main)/_components/Toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useMemo } from "react";
import dynamic from "next/dynamic";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), []);
  const document = useQuery(api.documents.getById, { id: params.documentId });
  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: document?._id!,
      content
    });
  }

  if (document === undefined) {
    return <div>
      Loading ...
    </div>
  }

  if (document === null) {
    return <div>
      Not Found
    </div>
  }

  return (
    <div className="relative pb-40 top-[60px]">
      <CoverImage
        url={document.coverImage}
      />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar
          initialData={document}
        />
        <Editor
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
}

export default DocumentIdPage;