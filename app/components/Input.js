export default function Input({ label, type, value, onChange, required }) {
  return (
    <div className='grid gap-1'>
      {label && <label>{label}:</label>}

      <input
        type={type}
        className='w-full p-1 text-black'
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}
