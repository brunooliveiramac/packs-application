import { useState } from 'react'
import { PackBreakdown } from '../components/PackBreakdown'
import { PackCalculatorForm } from '../components/PackCalculatorForm'
import { PackSizesManager } from '../components/PackSizesManager'

export function PacksPage() {
  const [result, setResult] = useState<
    { requested: number; shipped: number; packs: { size: number; count: number }[] } | null
  >(null)

  return (
    <div className="min-h-screen flex items-start justify-center p-8">
      <div className="w-full max-w-3xl space-y-6">
        <PackSizesManager />
        <div className="rounded border border-amber-300 bg-amber-200/60 p-4 max-w-xl">
          <h2 className="text-2xl font-semibold mb-3">Calculate packs for order</h2>
          <PackCalculatorForm onResult={setResult} />
          {result && (
            <div className="mt-4">
              <PackBreakdown
                requested={result.requested}
                shipped={result.shipped}
                packs={result.packs}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


