"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import PropertyForm from "./PropertyForm";

export default function PropertyDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">Post a Property</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl mx-auto p-4 bg-deep_orange-50">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new property listing.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <PropertyForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
