import { PropsWithChildren } from 'react'
import Tab, { TabParams } from './Tab'

export default function MenuTabs({
  active,
  handleTabClick,
}: PropsWithChildren<TabParams>) {
  return (
    <div className="flex h-14 w-full items-center justify-center">
      <Tab active={active} handleTabClick={handleTabClick}>
        Meus perrengues
      </Tab>
      <Tab active={!active} handleTabClick={handleTabClick}>
        Perrengues locais
      </Tab>
    </div>
  )
}
