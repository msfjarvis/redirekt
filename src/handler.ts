const BASE_URL = 'https://msfjarvis.dev/'
const GITHUB_USERNAME = 'msfjarvis'

export async function handleRequest(request: Request): Promise<Response> {
  const relURL = request.url.replace(BASE_URL, '')
  const URLparts = relURL.split('/')
  if (URLparts[0] == 'gcp') {
    return Response.redirect(
      `https://github.com/${GITHUB_USERNAME}/${URLparts[1]}/commit/${URLparts[2]}`,
      301,
    )
  } else if (URLparts[0] == 'g') {
    return Response.redirect(
      `https://github.com/${GITHUB_USERNAME}/${URLparts[1]}`,
      301,
    )
  } else {
    return new Response(`Illegal redirect path: ${relURL}`)
  }
}
