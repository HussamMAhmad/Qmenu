import React from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

function CustomButton({ isLoading, className, children }: ButtonProps) {
  return (
    <Button
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full cursor-pointer py-5"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
        يتم الاّن انشاء الحساب <Spinner className="size-4" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}

export default CustomButton;
