export default function DropDown({
  label,
  value,
  onChange,
  defaultItem,
  items,
  fullWidth,
}) {
  return (
    <div className={`flex gap-3 pt-6 ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label htmlFor='school-select' className='text-neutral-500'>
          {label}:
        </label>
      )}

      <select
        name='school'
        id='school-select'
        className={`p-1 text-black rounded ${fullWidth ? "w-full" : ""}`}
        value={value}
        onChange={onChange}
      >
        {defaultItem && <option value=''>{defaultItem}</option>}

        {items.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}
