type Props = {
  requested: number
  shipped: number
  packs: { size: number; count: number }[]
}

export function PackBreakdown({ requested, shipped, packs }: Props) {
  const sorted = [...packs].sort((a, b) => b.size - a.size)
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Result</h3>
      <div className="mb-1">Requested: {requested}</div>
      <div className="mb-2">Shipped: {shipped}</div>
      <table className="min-w-[320px]">
        <thead>
          <tr className="text-left">
            <th className="p-1">Pack</th>
            <th className="p-1">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr key={p.size} className="odd:bg-white/50">
              <td className="p-1">{p.size}</td>
              <td className="p-1">{p.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


