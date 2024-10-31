"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronsLeft, Menu, PlusCircle, Search, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ElementRef, useCallback, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import UserItem from './UserItem';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import SidebarItem from './SidebarItem';
import { toast } from 'sonner';
import { ScrollArea } from "@/components/ui/scroll-area"
import DocumentList from './DocumentList';
import TrashBox from './TrashBox';
import { useSearch } from '@/hooks/use-search';

const Sidebar = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { onOpen } = useSearch();

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const createDocument = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = createDocument({ title: "Untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created",
      error: "Failed to create a new note!"
    });
  }

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
            "text-muted-foreground hover:text-muted-foreground rounded-sm hover:bg-primary/10 dark:hover:bg-primary/10 absolute top-2.5 right-2 opacity-0 group-hover/sidebar:opacity-100 transition p-0.5 h-fit",
            (isMobile || isResizing) && "opacity-100"
          )}
        >
          <ChevronsLeft className='size-6' />
        </Button>

        <div className='mb-2'>
          <UserItem />
          <SidebarItem
            label="New Note"
            icon={PlusCircle}
            onClick={onCreate}
          />
          <SidebarItem
            label="Settings"
            icon={Settings}
            onClick={() => { }}
          />
          <SidebarItem
            label="Search"
            icon={Search}
            isSearch
            onClick={onOpen}
          />
        </div>

        <ScrollArea className='border-t border-primary/10 flex-grow'>
          <div className='h-2' />
          <DocumentList />
        </ScrollArea>

        <div className='py-2 border-t border-primary/10'>
          <TrashBox isMobile={isMobile} />
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