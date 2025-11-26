import { useState } from 'react'
import { usePacksCalculator } from '../hooks/usePacksCalculator'

type Props = {
  onResult: (r: { requested: number; shipped: number; packs: { size: number; count: number }[] }) => void
}

export function PackCalculatorForm({ onResult }: Props) {
  const [quantity, setQuantity] = useState<number>(1)
  const calc = usePacksCalculator()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    calc.mutate({ quantity }, { onSuccess: onResult })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-2 max-w-xl">
      <div className="grid gap-1">
        <label className="font-medium">Items</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border border-slate-600 bg-slate-800 text-slate-100 rounded px-2 py-1"
        />
      </div>
      <button
        type="submit"
        disabled={calc.isPending}
        className="w-fit px-4 py-2 bg-slate-700 text-slate-100 rounded hover:bg-slate-600 disabled:opacity-50"
      >
        {calc.isPending ? 'Calculating...' : 'Calculate'}
      </button>
      {calc.isError && <div className="text-red-400">{(calc.error as Error).message}</div>}
    </form>
  )
}


