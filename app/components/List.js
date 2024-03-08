import { capitalize } from "lodash"

export default function List({ label, items, handleItemClick, currentSchool }) {
  return (
    <>
      <h2 className='mb-1 text-2xl'>{capitalize(label)}</h2>

      <ul className='pl-4 mb-6 list-disc'>
        {items?.map(item => (
          <li key={item.id} onClick={() => handleItemClick(item)}>
            {capitalize(item.name)}
            {item.age && ` is ${item.age} years old`}
            {item.subject && ` teaches ${capitalize(item.subject)}`}
            {!currentSchool &&
              (item.subject
                ? ` at ${item.school_name}`
                : ` and goes to ${item.school_name}`)}
          </li>
        ))}
      </ul>
    </>
  )
}
