import { UserJwtPayload } from '@/lib/utils/protocols/resources'
import { FaHistory } from '@react-icons/all-files/fa/FaHistory'
import { RiArrowLeftSLine } from '@react-icons/all-files/ri/RiArrowLeftSLine'
import { RiArrowRightSLine } from '@react-icons/all-files/ri/RiArrowRightSLine'
import { RiDashboardLine } from '@react-icons/all-files/ri/RiDashboardLine'
import { ImCoinDollar } from '@react-icons/all-files/im/ImCoinDollar'
import { HiOutlineUser } from '@react-icons/all-files/hi/HiOutlineUser'
import { MdColorLens } from '@react-icons/all-files/md/MdColorLens'
import { getCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useTheme } from 'next-themes'

export default function Menu({
  handleToggleMenu,
  active,
}: {
  handleToggleMenu: () => void
  active: boolean
}) {
  const { theme, setTheme } = useTheme()

  const token = getCookie('token')?.toString() || ''

  const { username, coins } = jwtDecode(token) as UserJwtPayload

  const [showThemeOptions, setShowThemeOptions] = useState(false)

  const path = usePathname()

  return (
    <div className={`fixed left-0 top-0 z-10 flex w-full `}>
      <nav
        className={`absolute z-10 ${
          active ? 'left-0' : '-left-full'
        } top-0  h-screen w-[min(100%,_375px)] bg-alternative transition-all duration-500`}
      >
        <div className="relative flex items-center justify-between px-10 py-14 text-emphasis">
          <span
            onClick={handleToggleMenu}
            className="absolute left-2 top-2 cursor-pointer text-3xl hover:text-dark-main"
          >
            <RiArrowLeftSLine />
          </span>
          <p className="font-alt text-3xl font-bold">Olá, {username}</p>
          <p className="flex items-center gap-1 text-xl font-bold">
            <ImCoinDollar /> {coins.toFixed(2)}
          </p>
        </div>
        <div
          className={`flex items-center gap-4 py-4 pl-10 font-alt text-2xl font-bold ${
            path === '/'
              ? 'bg-dark-main text-alternative'
              : 'cursor-pointer text-emphasis hover:bg-zinc-200'
          }`}
        >
          <RiDashboardLine />
          <span>Dashboard</span>
        </div>
        <div
          className={`flex items-center gap-4 py-4 pl-10 font-alt text-2xl font-bold ${
            path === '/profile'
              ? 'bg-dark-main text-alternative'
              : 'cursor-pointer text-emphasis hover:bg-zinc-200'
          }`}
        >
          <HiOutlineUser />
          <span>Perfil</span>
        </div>
        <div
          className={`flex items-center gap-4 py-4 pl-10 font-alt text-2xl font-bold ${
            path === '/history'
              ? 'bg-dark-main text-alternative'
              : 'cursor-pointer text-emphasis hover:bg-zinc-200'
          }`}
        >
          <FaHistory />
          <span>Histórico</span>
        </div>
        <div
          onClick={() => setShowThemeOptions(!showThemeOptions)}
          className="group relative flex cursor-pointer items-center gap-4 py-4 pl-10 font-alt text-2xl font-bold text-emphasis hover:bg-zinc-200"
        >
          <MdColorLens />
          <span>Temas</span>
          <button
            className={`absolute right-8 transition-all duration-200 group-hover:text-dark-main ${
              showThemeOptions && 'rotate-90'
            }`}
          >
            <RiArrowRightSLine />
          </button>
        </div>
        <nav className="overflow-hidden">
          <ul
            className={`relative transition-all duration-200 ${
              showThemeOptions ? 'top-0' : '-top-40'
            }`}
          >
            <li
              onClick={() => setTheme('watermelon')}
              className="mb-3 mt-2 flex cursor-pointer items-center gap-3 pl-14 hover:bg-zinc-200"
            >
              <div className="flex h-10 w-10 overflow-hidden rounded-full border border-zinc-300">
                <div className="w-full bg-watermelon-main"></div>
                <div className="w-full bg-watermelon-emphasis"></div>
              </div>
              <span className="text-lg font-bold text-emphasis">
                Watermelon
              </span>
            </li>
            <li
              onClick={() => setTheme('blueberry')}
              className="mb-3 flex cursor-pointer items-center gap-3 pl-14 hover:bg-zinc-200"
            >
              <div className="flex h-10 w-10 overflow-hidden rounded-full border border-zinc-300">
                <div className="w-full bg-blueberry-main"></div>
                <div className="w-full bg-blueberry-emphasis"></div>
              </div>
              <span className="text-lg font-bold text-emphasis">Blueberry</span>
            </li>
            <li
              onClick={() => setTheme('banana')}
              className="relative mb-3 flex cursor-pointer items-center gap-3 overflow-hidden pl-14 hover:bg-zinc-200"
            >
              <div className="flex h-10 w-10 overflow-hidden rounded-full border border-zinc-300">
                <div className="w-full bg-banana-main"></div>
                <div className="w-full bg-banana-emphasis"></div>
              </div>
              <span className="text-lg font-bold text-emphasis">Banana</span>
              <img
                src="/images/minion.png"
                className={`duration-[400ms] absolute right-8 h-24 transition-all ${
                  theme === 'banana' && showThemeOptions ? '-bottom-12' : '-bottom-40'
                }`}
              />
            </li>
          </ul>
        </nav>
      </nav>
      {active && (
        <div
          className="h-screen w-full bg-black opacity-40"
          onClick={handleToggleMenu}
        ></div>
      )}
    </div>
  )
}
