export default function Button({
  text,
  type = "button",
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        w-full max-w-80
        px-4 py-3 rounded-xl
        body-lg text-white
        bg-primary-500
        hover:bg-primary-600
        active:bg-primary-700
        disabled:cursor-not-allowed
        disabled:bg-neutral-400
        disabled:text-neutral-100
      "
    >
      {text}
    </button>
  );
}