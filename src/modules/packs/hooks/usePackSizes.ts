import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deletePackSize,
  listPackSizes,
  setActivePackSize,
  upsertPackSize
} from '../api/packsApi'

export function usePackSizes() {
  const qc = useQueryClient()
  const query = useQuery({
    queryKey: ['pack-sizes'],
    queryFn: () => listPackSizes(true)
  })
  const upsert = useMutation({
    mutationFn: (vars: { size: number; active?: boolean }) =>
      upsertPackSize(vars.size, vars.active),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pack-sizes'] })
  })
  const setActive = useMutation({
    mutationFn: (vars: { size: number; active: boolean }) =>
      setActivePackSize(vars.size, vars.active),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pack-sizes'] })
  })
  const del = useMutation({
    mutationFn: (size: number) => deletePackSize(size),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['pack-sizes'] })
  })
  return { query, upsert, setActive, del }
}


