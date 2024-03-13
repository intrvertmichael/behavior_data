export default function Button({ label, onClick, red, className }) {
  return (
    <button
      className={`py-1 px-3 w-full rounded ${
        red ? "bg-red-950 hover:bg-red-800" : "bg-blue-950 hover:bg-blue-800"
      } ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
