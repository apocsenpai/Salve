import { InputHTMLAttributes } from 'react'

export default function GenderOptions({ gender, onChange }: RadioProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-emphasis">
        Qual seu gênero?
      </label>
      <div className="flex flex-wrap gap-x-10 gap-y-2">
        <div>
          <input
            id={'M'}
            name={'gender'}
            value={'M'}
            type={'radio'}
            className="cursor-pointer accent-emphasis"
            checked={gender === 'M'}
            onChange={onChange}
            required
          />
          <label htmlFor={'M'} className="text-sm font-bold text-emphasis">
            {' '}
            Masculino
          </label>
        </div>
        <div>
          <input
            id={'F'}
            name={'gender'}
            value={'F'}
            type={'radio'}
            className="cursor-pointer accent-emphasis"
            checked={gender === 'F'}
            onChange={onChange}
            required
          />
          <label htmlFor={'F'} className="text-sm font-bold text-emphasis">
            {' '}
            Feminino
          </label>
        </div>
        <div>
          <input
            id={'NB'}
            name={'gender'}
            value={'NB'}
            type={'radio'}
            className="cursor-pointer accent-emphasis"
            checked={gender === 'NB'}
            onChange={onChange}
            required
          />
          <label htmlFor={'NB'} className="text-sm font-bold text-emphasis">
            {' '}
            Não-binário
          </label>
        </div>
        <div>
          <input
            id={'OT'}
            name={'gender'}
            value={'OT'}
            type={'radio'}
            className="cursor-pointer accent-emphasis"
            checked={gender === 'OT'}
            onChange={onChange}
            required
          />
          <label htmlFor={'OT'} className="text-sm font-bold text-emphasis">
            {' '}
            Outros
          </label>
        </div>
        <div>
          <input
            id={'NI'}
            name={'gender'}
            value={'NI'}
            type={'radio'}
            className="cursor-pointer accent-emphasis"
            checked={gender === 'NI'}
            onChange={onChange}
            required
          />
          <label htmlFor={'NI'} className="text-sm font-bold text-emphasis">
            {' '}
            Prefiro não dizer
          </label>
        </div>
      </div>
    </div>
  )
}

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  gender: string
}
