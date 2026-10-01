import React, { useState } from "react";
import {
  Controller,
  Control,
  FieldPath,
  FieldValues,
  ControllerRenderProps,
  Path,
  ControllerFieldState,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { IconType } from "react-icons";
import { FormFieldType } from "@/lib/types";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  fieldtype: FormFieldType;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  Icon?: IconType;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  forgetPassword?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

function RenderField<TFieldValues extends FieldValues>({
  field,
  fieldState,
  props,
}: {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  fieldState: ControllerFieldState;
  props: CustomProps<TFieldValues>;
}) {
  const { fieldtype, name, placeholder, Icon, forgetPassword } = props;
  const [showPassword, setShowPassword] = useState(false);
  switch (fieldtype) {
    case FormFieldType.INPUT:
      return (
        <div className="relative">
          <Input
            {...field}
            id={name}
            type="text"
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
            className="w-full pr-10 pl-4 py-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-500! focus:bg-white! focus:ring-2 focus:ring-brand-500/10! transition-all text-right font-medium"
          />
          {Icon ? (
            <Icon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          ) : null}
        </div>
      );
    case FormFieldType.PASSWORD:
      return (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700">
              كلمة المرور
            </label>
            {forgetPassword && (
              <Link
                href="/forget-password"
                className="text-xs font-semibold text-brand-500 hover:text-brand-700 transition-colors"
              >
                نسيت كلمة المرور؟
              </Link>
            )}
          </div>
          <div className="relative">
            <Input
              {...field}
              id={name}
              type={showPassword ? "text" : "password"}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete="off"
              className="w-full pr-10 pl-4 py-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-500! focus:bg-white! focus:ring-2 focus:ring-brand-500/10! transition-all text-right font-medium"
            />
            {Icon ? (
              <Icon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            ) : null}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      );
    case FormFieldType.CHECKBOXTERMS:
      return (
        <div className="flex items-start gap-2 pt-1">
          <Checkbox
            id={name}
            className="mt-1 w-4 h-4 data-[state=checked]:border-brand-500! data-[state=checked]:bg-brand-500! rounded cursor-pointer"
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <label
            htmlFor={name}
            className="text-xs text-slate-500 font-medium leading-relaxed"
          >
            أوافق على{" "}
            <Link
              href="#terms"
              className="text-brand-500 font-bold hover:underline"
            >
              شروط الخدمة
            </Link>{" "}
            و{" "}
            <Link
              href="#privacy"
              className="text-brand-500 font-bold hover:underline"
            >
              سياسة الخصوصية
            </Link>
          </label>
        </div>
      );
    default:
      break;
  }
}

function CustomField<TFieldValues extends FieldValues>(
  props: CustomProps<TFieldValues>,
) {
  const { control, name, label, fieldtype } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {fieldtype !== FormFieldType.CHECKBOXTERMS && label && (
            <FieldLabel
              htmlFor={name}
              className="block text-xs font-bold text-slate-700 mb-1.5 text-right"
            >
              {label}
            </FieldLabel>
          )}
          <RenderField field={field} fieldState={fieldState} props={props} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export default CustomField;
