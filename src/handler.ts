import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

const GITHUB_USERNAME = 'msfjarvis'
const APS_SLUG = 'Android-Password-Store/Android-Password-Store'
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`
const APS_GITHUB_URL = `https://github.com/${APS_SLUG}`
const CSP_POLICY = "base-uri 'self'; connect-src 'self' insights.msfjarvis.dev utteranc.es; default-src 'self'; frame-ancestors 'none'; frame-src asciinema.org github.com platform.twitter.com utteranc.es; font-src 'self'; img-src 'self' data: gfycat.com imgur.com *.imgur.com insights.msfjarvis.dev syndication.twitter.com; object-src 'none'; script-src 'self' asciinema.org platform.twitter.com utteranc.es 'nonce-MZSWC5DVOJSS23TPNZRWKCQ=' 'nonce-NFXHG2LHNB2HGLTNONTGUYLSOZUXGLTEMV3AU==='; style-src 'self' 'unsafe-inline';";
const PERMISSIONS_POLICY = "accelerometer=(), autoplay=(), camera=(), encrypted-media=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), sync-xhr=(), usb=()"

export async function handleRequest(event: FetchEvent): Promise<Response> {
  return redirectGitHub(event)
}

async function getPageFromKV(event: FetchEvent): Promise<Response> {
  const options = {}
  try {
    const page = await getAssetFromKV(event, options)
    const response = new Response(page.body, page)
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'no-referrer-when-downgrade')
    response.headers.set('Content-Security-Policy', CSP_POLICY)
    response.headers.set('Permissions-Policy', PERMISSIONS_POLICY)
    return response
  } catch (e) {
    try {
      let notFoundResponse = await getAssetFromKV(event, {
        mapRequestToAsset: (req) =>
          new Request(`${new URL(req.url).origin}/404.html`, req),
      })
      return new Response(notFoundResponse.body, {
        ...notFoundResponse,
        status: 404,
      })
    } catch (e) {}
    return new Response(e.message || e.toString(), { status: 500 })
  }
}

async function redirectGitHub(event: FetchEvent): Promise<Response> {
  const urlParts = event.request.url.replace(BASE_URL, '').split('/')
  switch (urlParts[0]) {
    case 'g':
      switch (urlParts.length) {
        case 1:
          return Response.redirect(GITHUB_URL, 301)
        case 2:
          return Response.redirect(`${GITHUB_URL}/${urlParts[1]}`, 301)
        case 3:
          return Response.redirect(
            `${GITHUB_URL}/${urlParts[1]}/commit/${urlParts[2]}`,
            301,
          )
        case 4:
          return Response.redirect(
            `${GITHUB_URL}/${urlParts[1]}/issues/${urlParts[3]}`,
            301,
          )
      }
    case 'aps':
      switch (urlParts.length) {
        case 1:
          return Response.redirect(APS_GITHUB_URL, 301)
        case 2:
          return Response.redirect(
            `${APS_GITHUB_URL}/commit/${urlParts[1]}`,
            301,
          )
        case 3:
          return Response.redirect(
            `${APS_GITHUB_URL}/issues/${urlParts[2]}`,
            301,
          )
      }
      default:
        return getPageFromKV(event)
  }
}
