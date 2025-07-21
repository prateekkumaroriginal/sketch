"use client";

import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import Picker from "@emoji-mart/react";
import data, { Skin } from "@emoji-mart/data";

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

const IconPicker = ({
  onChange,
  children,
  asChild
}: IconPickerProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>
        {children}
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        className="w-full p-0 my-2 rounded-[10px]"
      >
        <Picker
          perLine={8}
          previewPosition="top"
          data={data}
          theme={resolvedTheme}
          onEmojiSelect={(emoji: Skin) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
}

export default IconPicker;