export { cn } from "cn"

export const convertFileToUrl = (file: File | Blob | string | null | undefined): string => {
  if (!file) return "";
  
  if (typeof file === "string") {
    return file;
  }
  
  if (file instanceof Blob || file !== null) {
    return URL.createObjectURL(file);
  }

  return "";
};