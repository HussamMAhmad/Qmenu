"use client";
import { PencilIcon, TrashIcon, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UpdateCategories from "./UpdateCategories";
import DeleteCategory from "./DeleteCategory";
import { useState } from "react";

function EditCategories({ name, id }: { name: string; id: string }) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <MoreHorizontal className="h-4 w-4 text-slate-600" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() => setIsUpdateOpen(true)}
              className="cursor-pointer flex items-center gap-2"
            >
              <PencilIcon className="h-4 w-4" />
              <span>تعديل</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() => setIsDeleteOpen(true)}
              variant="destructive"
              className="cursor-pointer flex items-center gap-2 text-red-600 focus:text-red-600"
            >
              <TrashIcon className="h-4 w-4" />
              <span>حذف</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateCategories
        name={name}
        id={id}
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
      />
      <DeleteCategory
        id={id}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </>
  );
}

export default EditCategories;
