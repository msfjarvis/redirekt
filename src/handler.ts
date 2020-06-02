const BASE_URL = 'https://msfjarvis.dev/'
const DOWNLOAD_URL = 'https://download.msfjarvis.dev/'
const GITHUB_USERNAME = 'msfjarvis'

export async function handleRequest(request: Request): Promise<Response> {
  if (request.url.includes(DOWNLOAD_URL)) {
    const relURL = request.url.replace(DOWNLOAD_URL, '')
    return Response.redirect(`https://dl.msfjarvis.dev/${relURL}`, 301)
  }
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
