import { http } from './client'

export type CalcRequest = {
  quantity: number
  sizes?: number[]
}

export type CalcResponse = {
  requested: number
  shipped: number
  packs: { size: number; count: number }[]
}

export async function calculatePacks(req: CalcRequest): Promise<CalcResponse> {
  const { data } = await http.post<CalcResponse>('/api/packs/calc', req)
  return data
}

// Pack sizes admin
export type PackSize = { ID: number; Size: number; Active: boolean }

export async function listPackSizes(includeInactive = false): Promise<PackSize[]> {
  const { data } = await http.get<PackSize[]>(
    `/api/pack-sizes${includeInactive ? '?all=true' : ''}`
  )
  return data
}

export async function upsertPackSize(size: number, active = true): Promise<void> {
  await http.post('/api/pack-sizes', { size, active })
}

export async function setActivePackSize(size: number, active: boolean): Promise<void> {
  await http.patch(`/api/pack-sizes/${size}`, { active })
}

export async function deletePackSize(size: number): Promise<void> {
  await http.delete(`/api/pack-sizes/${size}`)
}


