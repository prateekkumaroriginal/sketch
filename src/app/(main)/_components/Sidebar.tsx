"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, PanelLeftClose } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { ElementRef, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

const Sidebar = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname])

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef) return;

    let newWidth = event.clientX;
    if (newWidth < 240) {
      newWidth = 240;
    } else if (newWidth > 480) {
      newWidth = 480;
    }

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
      navbarRef.current.style.left = `${newWidth}px`;
    }
  }

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.width = isMobile ? "0" : "calc(100% - 240px)";
      navbarRef.current.style.left = isMobile ? "0" : "240px";

      setTimeout(() => setIsResetting(false), 200);
    }
  }

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.width = "100%";
      navbarRef.current.style.left = "0";

      setTimeout(() => setIsResetting(false), 200);
    }
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col w-60 z-[99999]",
          isResetting && "transition-all ease-in-out duration-200",
          isMobile && "w-0"
        )}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={collapse}
          className={cn(
            "text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-2 right-2 opacity-0 group-hover/sidebar:opacity-100 transition px-2",
            isMobile && "opacity-100"
          )}
        >
          <PanelLeftClose className='size-6' />
        </Button>

        <div>
          <p>Action Items</p>
        </div>

        <div className='mt-4'>
          <p>Documents</p>
        </div>

        {!isMobile && <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize bg-primary/10 absolute h-full w-1 right-0 top-0'
        />}
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-200",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className='bg-transparent px-3 py-2 w-full'>
          {isCollapsed && <Menu
            role='button'
            onClick={resetWidth}
            className='size-6 text-muted-foreground'
          />}
        </nav>
      </div>
    </>
  )
}

export default Sidebar