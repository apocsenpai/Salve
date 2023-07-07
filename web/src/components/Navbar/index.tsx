'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MdMenu } from '@react-icons/all-files/md/MdMenu'
import Menu from './Menu'

export default function NavBar() {
  const [toggleMenu, setToggleMenu] = useState(false)

  const handleToggleMenu = () => setToggleMenu(!toggleMenu)

  return (
    <header className="flex h-28 w-full items-center justify-between px-20">
      <button className="text-4xl text-alternative" onClick={handleToggleMenu}>
        <MdMenu />
      </button>
      <Link href={'/'}>
        <img src="images/miniLogo.svg" alt="Salve!" />
      </Link>
      <Menu handleToggleMenu={handleToggleMenu} active={toggleMenu} />
    </header>
  )
}
