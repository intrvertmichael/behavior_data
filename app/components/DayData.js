function Cell({ children, data, dataBg }) {
  return (
    <div
      className={`p-3 border border-neutral-800 ${
        data && (dataBg ? "bg-green-500" : "bg-red-500")
      }`}
    >
      {children}
    </div>
  )
}

function CellData({ children, ...props }) {
  return (
    <Cell data {...props}>
      {children}
    </Cell>
  )
}

export default function DayData({ studentData }) {
  return (
    <div className='w-1/2'>
      <Cell>{studentData.date}</Cell>

      <div className='grid grid-cols-3'>
        <Cell>Period</Cell>
        <Cell>behaved ?</Cell>
        <Cell>did work ?</Cell>

        {studentData.behavior.map(data => (
          <>
            <Cell>{data.period}</Cell>
            <CellData dataBg={data.behaved} />
            <CellData dataBg={data.worked} />
          </>
        ))}
      </div>
    </div>
  )
}
