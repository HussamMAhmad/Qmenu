import React from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

function CustomButton({
  isLoading,
  className,
  children,
  onClick,
}: ButtonProps) {
  return (
    <Button
      onClick={onClick}
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
