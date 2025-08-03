import { Doc } from "@/convex/_generated/dataModel";
import IconPicker from "../../../components/icon-picker";
import { Button } from "../../../components/ui/button";
import { Image, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
import { useModal } from "@/hooks/use-modal-store";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar = ({
  initialData,
  preview
}: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title);
  const { onOpen } = useModal();

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTitle(initialData.title);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  const disableInput = () => {
    setIsEditing(false);
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  }

  const onInput = (value: string) => {
    setTitle(value);
    update({
      id: initialData._id,
      title: value || "Untitled"
    });
  }

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon
    });
  }

  const onRemoveIcon = () => {
    removeIcon({ id: initialData._id });
  }

  return (
    <div className="group relative pl-14">
      {initialData.icon && preview ? (
        <p className="text-6xl">
          {initialData.icon}
        </p>
      ) : (
        <div className="group/icon relative flex items-center pt-6">
          <IconPicker
            onChange={onIconSelect}
          >
            <p className="flex text-6xl py-2 rounded-sm hover:bg-primary/5 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          {initialData.icon && <Button
            onClick={onRemoveIcon}
            className="absolute left-[70px] top-3 p-1 h-auto rounded-full opacity-0 group-hover/icon:opacity-100 text-xs text-muted-foreground transition"
            variant="destructive"
            size="sm"
          >
            <X className="size-4" />
          </Button>}
        </div>
      )}

      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-2 transition">
        {!initialData.icon && !preview && (
          <IconPicker
            onChange={onIconSelect}
            asChild
          >
            <Button
              className="text-muted-foreground hover:text-muted-foreground text-xs"
              variant='ghost'
              size='sm'
            >
              <Smile className="size-4 mr-2" />
              Add Icon
            </Button>
          </IconPicker>
        )}

        {!initialData.coverImage && !preview && (
          <Button
            className="text-muted-foreground hover:text-muted-foreground text-xs"
            variant='ghost'
            size='sm'
            onClick={() => onOpen("coverImage", initialData._id)}
          >
            <Image className="size-4 mr-2" />
            Add Cover
          </Button>
        )}
      </div>

      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          spellCheck={false}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={title}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl w-full bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-2 w-full text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
}

export default Toolbar;