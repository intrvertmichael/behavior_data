export default function DropDown({
  label,
  value,
  onChange,
  defaultItem,
  items,
  fullWidth,
  required,
  divClassname = "",
}) {
  return (
    <div className={`flex gap-3  ${fullWidth ? "w-full" : ""} ${divClassname}`}>
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
        required={required}
      >
        {defaultItem && (
          <option value={defaultItem.value}>{defaultItem.name}</option>
        )}

        {items.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}
