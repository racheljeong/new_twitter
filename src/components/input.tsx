import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
    label: string;
    name: string;
    kind?: "text" | "email";
    type : string;
    readonly? :boolean;
    register : UseFormRegisterReturn;
  }
  
  export default function Input({
    label,
    name,
    kind = "text",
    register,
    readonly,
    type,
    ...rest //앞의 세 prop제외하고 input으로 들어온 모든 prop
    
  }: InputProps) {
    return (
      <div>
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor={name}
        >
          {label}
        </label>
        {kind === "text" ? (
          <div className="rounded-md relative flex  items-center shadow-sm">
            <input
              id={name}
              {...register}
              type="type"
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 error:focus:border-red-500 "
            />
          </div>
        ) : null}
         {kind === "email" ? (
          <div className="rounded-md relative flex  items-center shadow-sm">
            <input
              id={name}
              {...register}
              type="type"
              readOnly
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
        ) : null}

      </div>
    );
  }