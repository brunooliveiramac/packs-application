import { useState } from 'react'
import { usePackSizes } from '../hooks/usePackSizes'

export function PackSizesManager() {
  const { query, upsert, setActive, del } = usePackSizes()
  const [input, setInput] = useState<string>('')

  const submitNew = (e: React.FormEvent) => {
    e.preventDefault()
    const size = Number(input)
    if (!Number.isFinite(size) || size <= 0) return
    upsert.mutate({ size, active: true })
    setInput('')
  }

  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold mb-3">Order Packs Calculator</h2>

      <div className="rounded border border-amber-300 bg-amber-200/60 p-4 max-w-xl">
        <h3 className="text-lg font-semibold mb-3">Pack Sizes</h3>
        {query.isLoading ? (
          <div>Loading...</div>
        ) : query.isError ? (
          <div className="text-red-600">Failed to load sizes</div>
        ) : (
          <table className="w-full mb-3">
            <thead>
              <tr className="text-left">
                <th className="p-1">Size</th>
                <th className="p-1">Active</th>
                <th className="p-1" />
              </tr>
            </thead>
            <tbody>
              {query.data?.map((s) => (
                <tr key={s.ID} className="odd:bg-white/50">
                  <td className="p-1">{s.Size}</td>
                  <td className="p-1">
                    <input
                      type="checkbox"
                      checked={s.Active}
                      onChange={(e) => setActive.mutate({ size: s.Size, active: e.target.checked })}
                    />
                  </td>
                  <td className="p-1">
                    <button
                      className="text-sm text-red-700 hover:underline"
                      onClick={() => del.mutate(s.Size)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <form onSubmit={submitNew} className="grid gap-2 w-60">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add size"
            type="number"
            min={1}
            className="border rounded px-2 py-1"
          />
          <button
            type="submit"
            disabled={upsert.isPending}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
          >
            Submit pack sizes change
          </button>
        </form>
      </div>
    </div>
  )
}


