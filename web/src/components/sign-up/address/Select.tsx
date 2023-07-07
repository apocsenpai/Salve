import { InputHTMLAttributes } from 'react'

export function SelectInput({ label, name, onChange, required }: InputProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={name} className="text-sm font-bold text-emphasis">
        {label}
      </label>
      <select
        id={name}
        name={name}
        onChange={onChange}
        required={required}
        defaultValue={'home'}
        className={`h-12 w-full rounded border-2 border-solid px-5 focus:outline-none`}
      >
        <option value="home" className="text-emphasis">
          Casa
        </option>
        <option value="work" className="text-emphasis">
          Trabalho
        </option>
        <option value="" className="text-emphasis">
          Outro
        </option>
      </select>
    </div>
  )
}

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string
}
