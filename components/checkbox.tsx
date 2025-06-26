"use client";
interface CheckboxProps {
  id?: string;
  checked: boolean;
  onClick: (checked: boolean) => void;
}

const Checkbox = ({ id, checked, onClick }: CheckboxProps) => {
  return (
    <div className="flex h-6 shrink-0 items-center">
      <div className="group grid size-4 grid-cols-1">
        <input
          id={id}
          name={id}
          checked={checked}
          onChange={(e) => onClick(e.currentTarget.checked)}
          type="checkbox"
          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-green-400 checked:bg-green-400 indeterminate:border-green-400 indeterminate:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
        />
        <svg
          fill="none"
          viewBox="0 0 14 14"
          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-0 group-has-checked:opacity-100"
          />
          <path
            d="M3 7H11"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-0 group-has-indeterminate:opacity-100"
          />
        </svg>
      </div>
    </div>
  );
};

export default Checkbox;
