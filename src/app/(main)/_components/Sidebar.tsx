"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronsLeft, Menu, PanelLeftClose } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ElementRef, useCallback, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import UserItem from './UserItem';

const Sidebar = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
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

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isResizingRef.current) return;

    document.body.style.cursor = "ew-resize";

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
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizingRef.current = false;
    setIsResizing(false);
    document.body.style.cursor = "default";

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    setIsResizing(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);

  const resetWidth = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.width = isMobile ? "0" : "calc(100% - 240px)";
      navbarRef.current.style.left = isMobile ? "0" : "240px";

      setTimeout(() => setIsResetting(false), 200);
    }
  }, [isMobile]);

  const collapse = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.width = "100%";
      navbarRef.current.style.left = "0";

      setTimeout(() => {
        setIsCollapsed(true);
        setIsResetting(false);
      }, 200);
    }
  }, []);

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
          onClick={collapse}
          className={cn(
            "text-muted-foreground hover:text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-2 right-2 opacity-0 group-hover/sidebar:opacity-100 transition p-1 h-fit",
            (isMobile || isResizing) && "opacity-100"
          )}
        >
          <ChevronsLeft className='size-6' />
        </Button>

        <div>
          <UserItem />
        </div>

        <div className='mt-4'>
          <p>Documents</p>
        </div>

        {!isMobile && <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className={cn(
            "opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize bg-primary/10 absolute h-full w-1 right-0 top-0",
            isResizing && "opacity-100"
          )}
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