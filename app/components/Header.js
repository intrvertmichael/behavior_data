import Link from "next/link"

export default async function Header() {
  return (
    <nav className='flex items-end gap-6'>
      <p className='text-neutral-500'>Perspectives:</p>
      <Link href='/'>Admin</Link>
      <Link href='/teachers'>Teachers</Link>
      <Link href='/students'>Students</Link>
    </nav>
  )
}
