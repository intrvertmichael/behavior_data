export default function DropDown({
  label,
  value,
  onChange,
  defaultItem,
  items,
}) {
  return (
    <div className='flex gap-3 pt-6'>
      {label && (
        <label htmlFor='school-select' className='text-neutral-500'>
          {label}:
        </label>
      )}

      <select
        name='school'
        id='school-select'
        className='p-1 text-black rounded'
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
