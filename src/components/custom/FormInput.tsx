import { type ComponentProps } from "react";
import { type FormInputProps } from "@/types";
import { Input } from "@/components/ui/input";

function FormInput({
  label,
  field,
  error,
  ...input_props
}: FormInputProps & ComponentProps<"input">) {
  return (
    <label className="flex flex-col w-full gap-1">
      {label}
      <Input {...input_props} />
      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </label>
  );
}

export default FormInput;
