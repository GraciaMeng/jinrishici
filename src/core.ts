import type { PoetryRequestData, ErrorPoetryRequestData } from './types'

export const TOKEN = "jinrishici-token"

export function isWindow() {
  return typeof window !== 'undefined'
}

function corsLoad() {
  return sendRequest("https://v2.jinrishici.com/one.json?client=npm-sdk/1.0").then((result) => {
    if (isWindow()) {
      window.localStorage.setItem(TOKEN, result.token)
    }
    return result
  })
}

function commonLoad(token: any) {
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

export function load() {
  if (isWindow() && window.localStorage && window.localStorage.getItem(TOKEN)) {
    return commonLoad(window.localStorage.getItem(TOKEN))
  } else {
    return corsLoad()
  }
}