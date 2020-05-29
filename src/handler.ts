const BASE_URL = 'https://msfjarvis.dev/'
const GITHUB_USERNAME = 'msfjarvis'

export async function handleRequest(request: Request): Promise<Response> {
  const relURL = request.url.replace(BASE_URL, '')
  const URLparts = relURL.split('/')
  if (URLparts[0] === 'g') {
    switch (URLparts.length) {
      case 2:
        return Response.redirect(
          `https://github.com/${GITHUB_USERNAME}/${URLparts[1]}`,
          301,
        )
      case 3:
        return Response.redirect(
          `https://github.com/${GITHUB_USERNAME}/${URLparts[1]}/commit/${URLparts[2]}`,
          301,
        )
      default:
        break
    }
  }
  return new Response(`Illegal redirect path: ${relURL}`)
}
