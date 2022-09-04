export interface JingrishiciData {
  id: string
  content: string
  popularity: number
  origin: {
    title: string
    dynasty: string
    author: string
    content: string[]
    translate: string[]
  },
  matchTags: string[]
  recommendedReason: string
  cacheAt: string
}

export interface PoetryRequestData {
  status: string
  data: JingrishiciData
  token: string
  ipAddress: string
  warning: null | string
}

export interface ErrorPoetryRequestData extends PoetryRequestData {
  errMessage: string
}