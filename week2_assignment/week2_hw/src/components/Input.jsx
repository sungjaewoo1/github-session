export default function Input({
  id,
  label,
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  onFocus,
  onBlur,
  disabled = false,
}) {
  const isFilled = value.trim().length > 0;

  return (
    <div className="flex w-[260px] max-w-full flex-col gap-2">
      <label
        htmlFor={id}
        className="body-sm text-neutral-500"
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        required
        className={`
          body-md box-border h-[51px] w-full
          rounded-[8px] border border-black
          px-6 py-3 text-center text-white
          placeholder:text-white
          transition-colors

          ${
            isFilled
              ? "bg-input-filled"
              : "bg-input-default enabled:hover:bg-input-focus enabled:focus:bg-input-focus"
          }

          focus:outline-none
          enabled:focus:ring-1
          enabled:focus:ring-black

          disabled:cursor-not-allowed
          disabled:border-transparent
          disabled:bg-input-disabled
          disabled:text-white
        `}
      />
    </div>
  );
}