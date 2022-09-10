import { PoetryRequestData, ErrorPoetryRequestData } from './types'

export const STORAGE_TOKEN = "jinrishici-token"

export function isWindow(): boolean {
  return typeof window !== 'undefined'
}

function corsLoad() {
  return sendRequest("https://v2.jinrishici.com/one.json?client=npm-sdk/1.0").then((result) => {
    if (isWindow()) {
      window.localStorage.setItem(STORAGE_TOKEN, result.token)
    }
    return result
  })
}

function commonLoad(token: string) {
  return sendRequest("https://v2.jinrishici.com/one.json?client=npm-sdk/1.0&X-User-Token=" + encodeURIComponent(token))
}

function sendRequest(apiUrl: string) {
  return new Promise<PoetryRequestData>((resolve, reject) => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => {
        console.error("[jinrishici] api loading failed，error reason is：" + error.errMessage)
        reject(error as ErrorPoetryRequestData)
      })
  })
}

export function load(): Promise<PoetryRequestData> {
  if (isWindow() && window.localStorage && window.localStorage.getItem(STORAGE_TOKEN)) {
    return commonLoad(window.localStorage.getItem(STORAGE_TOKEN) as string)
  } else {
    return corsLoad()
  }
}