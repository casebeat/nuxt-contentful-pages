import { JSDOM } from 'jsdom'

export default function enrichMarkup(html: string, renderOptions: any): string {
  if (!html) return ''
  html = addTargetBlankToAllExternalLinks(html, renderOptions)
  return html
}

function addTargetBlankToAllExternalLinks(html: string, renderOptions: any): string {
  const dom = new JSDOM(html)
  const document = dom.window.document
  const links = document.querySelectorAll<HTMLAnchorElement>('a')

  const internalHosts = renderOptions.internalHosts ?? []

  links.forEach((link) => {
    const href = link.getAttribute('href')

    // set link attribute to _blank if it
    if (!isInternalLink(href, internalHosts)) {
      link.setAttribute('target', '_blank')
    }
  })

  return document.body.innerHTML
}

function isInternalLink(url: string, internalHosts: string[] = []): boolean {
  // Check if the href starts with '/'
  if (url.startsWith('/')) {
    return true
  }

  const linkHost = extractHost(url)

  // If linkHost is null, it means href is a relative URL and not starting with '/'
  if (!linkHost) {
    return false
  }

  const isInternal = internalHosts.some(host => linkHost.endsWith(host))

  return isInternal
}

function extractHost(url: string) {
  try {
    return new URL(url).host
  }
  catch (e) {
    // If URL constructor fails, it's likely a relative URL
    return null
  }
}
