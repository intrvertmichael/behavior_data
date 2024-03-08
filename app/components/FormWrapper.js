"use client"

import Button from "./Button"

export default function FormWrapper({
  children,
  updateItem,
  closeWindow,
  handleSubmit,
}) {
  return (
    <div className='relative p-6'>
      <button onClick={closeWindow} className='absolute top-0 right-0'>
        X
      </button>

      <form className='grid gap-3 p-6' onSubmit={handleSubmit}>
        {children}

        <Button label={updateItem ? "Update" : "Add"} className='mt-6' />
      </form>
    </div>
  )
}
