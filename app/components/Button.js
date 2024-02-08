export default function Button({ label, onClick, red }) {
  return (
    <button
      className={`py-1 ${
        red ? "bg-red-950 hover:bg-red-800" : "bg-blue-950 hover:bg-blue-800"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
