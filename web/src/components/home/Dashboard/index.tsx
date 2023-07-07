'use client'

import { useState } from 'react'
import MenuTabs from "../MenuTabs";
import Painel from "../Painel";

export default function Dashboard() {
  const [active, setActive] = useState(true)

  const handleTabClick = () => setActive(!active)

  return <div className="h-[736px] w-full flex flex-col"> <MenuTabs active={active} handleTabClick={handleTabClick} /> <Painel myTroubles={active}/></div>
}
