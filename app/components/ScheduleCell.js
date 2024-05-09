export default function ScheduleCell({ children, isHeading }) {
  return (
    <div
      className={`p-3 border ${
        isHeading ? "border-white" : "border-neutral-900"
      }`}
    >
      {children}
    </div>
  )
}
