"use client";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { convertFileToUrl } from "@/lib/utils";
import { UploadCloud, X } from "lucide-react";

type fileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
  name: string;
  aspectClass?: string;
};

function ImageDropZone({
  files,
  onChange,
  name,
  aspectClass = "w-32 h-32 rounded-full",
}: fileUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      onChange(acceptedFiles);
    },
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <div
      {...getRootProps()}
      className={`relative group cursor-pointer flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition-all duration-300 ${
        isDragActive
          ? "border-brand-500 bg-brand-50/50 scale-[1.01]"
          : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300"
      }`}
    >
      <input {...getInputProps()} id={name} />
      {files && files?.length > 0 ? (
        <div className="relative w-full flex flex-col items-center">
          <div className={`${aspectClass} relative w-full rounded-xl overflow-hidden shadow-inner border border-slate-200 bg-white`}>
            <Image
              src={
                typeof files === "string"
                  ? files
                  : files && files.length > 0
                    ? convertFileToUrl(files[0])
                    : ""
              }
              alt="uploaded preview"
              fill
              priority
              quality={75}
              unoptimized
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 left-2 z-10 p-1.5 rounded-full bg-slate-900/70 hover:bg-rose-600 text-white transition-colors shadow-md"
            title="إزالة الصورة"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="mt-3 text-xs font-medium text-slate-500">
            انقر أو اسحب صورة أخرى للاستبدال
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center space-y-3 py-2">
          <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-700">
              <span className="text-brand-600 underline underline-offset-2">
                انقر للرفع
              </span>{" "}
              أو سحب وإفلات الصورة هنا
            </p>
            <p className="text-[10px] text-slate-400">
              SVG, PNG, JPG أو GIF (بحد أقصى مناسب)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageDropZone;
