export function redirect(): string {
  if (typeof window === 'undefined') {
    return
  }

  let lang: string

  if (window?.localStorage) {
    lang = window?.localStorage?.getItem('locale')
  }

  if (lang) {
    return lang
  }

  if (window?.navigator?.language) {
    lang = window?.navigator?.language?.substring(0, 2)
  }

  if (lang) {
    return lang
  }

  return
}
