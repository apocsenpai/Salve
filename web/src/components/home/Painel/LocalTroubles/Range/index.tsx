import { useEffect, useRef, useState } from 'react'

export default function Range({
  handleRangeChange,
  activeRange,
}: {
  handleRangeChange: (range: number) => void
  activeRange: number
}) {
  const handleRangeOnChange = (range: number) => handleRangeChange(range)

  const [step, setStep] = useState(0)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const rangeLinePadding = 16

    if (ref.current) {
      const calcStep = ref.current.offsetWidth

      setStep(calcStep)
    }
  }, [])

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={'category'}
        className="font-alt text-xl font-bold text-emphasis"
      >
        Selecione o range:
      </label>
      <div className="flex h-10 w-full items-center justify-center gap-3">
        <span className="font-alt text-lg font-bold text-emphasis">500m</span>
        <div className="group relative flex-1">
          <input
            onChange={(e) => handleRangeOnChange(+e.target.value)}
            type="range"
            max={2000}
            min={500}
            value={activeRange}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-dark-main"
            ref={ref}
          />
          <div
            style={{
              transform: `translateX(${
                step * ((activeRange - 500) / 1500) - 40
              }px)`,
            }}
            className={`invisible absolute z-10 w-20 rounded-lg bg-dark-main text-center font-bold text-alternative group-hover:visible`}
          >
            {formatDistance(activeRange)}
          </div>
        </div>
        <span className="font-alt text-xl font-bold text-emphasis">2Km</span>
      </div>
    </div>
  )
}

function formatDistance(range: number) {
  return range >= 1000 ? `${(range / 1000).toFixed(2)}Km` : `${range}m`
}
