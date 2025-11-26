import { useMutation } from '@tanstack/react-query'
import { calculatePacks, CalcRequest, CalcResponse } from '../api/packsApi'

export function usePacksCalculator() {
  return useMutation<CalcResponse, Error, CalcRequest>({
    mutationFn: calculatePacks
  })
}


