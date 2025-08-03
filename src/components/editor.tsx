"use client"

import { useTheme } from "next-themes";
import { PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css";

interface EditorProps {
  onChange: (content: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({
  onChange,
  initialContent,
  editable
}: EditorProps) => {
  const { resolvedTheme } = useTheme();

  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        // editable={!!editable}
        onChange={() => {
          onChange(JSON.stringify(editor.document))
        }}
      /> 
    </div>
  );
}

export default Editor;