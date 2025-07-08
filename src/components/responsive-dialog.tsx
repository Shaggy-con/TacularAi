"use client"
import { useIsMobile } from "@/hooks/use-mobile"; 
import { Dialog,DialogClose,DialogContent,DialogTitle,DialogDescription } from "@radix-ui/react-dialog";
import { Drawer,DrawerDescription,DrawerContent,DrawerHeader,DrawerTitle } from "./ui/drawer";

interface ResponsiveDialgProps{
    title:string;
    description:string;
    childern:React.ReactNode;
    open:boolean;
    onOpenChange:(open:boolean)=>void;

}

