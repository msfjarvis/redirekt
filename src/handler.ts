const BASE_URL = 'https://msfjarvis.dev/'
const DOWNLOAD_URL = 'https://download.msfjarvis.dev/'
const GITHUB_USERNAME = 'msfjarvis'
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`

export async function handleRequest(request: Request): Promise<Response> {
  if (request.url.includes(DOWNLOAD_URL)) {
    const relURL = request.url.replace(DOWNLOAD_URL, '')
    return Response.redirect(`https://dl.msfjarvis.dev/${relURL}`, 301)
  }
  const relURL = request.url.replace(BASE_URL, '')
  const URLparts = relURL.split('/')
  switch (URLparts[0]) {
    case 'g':
      switch (URLparts.length) {
        case 1:
          return Response.redirect(`${GITHUB_URL}`, 301)
        case 2:
          return Response.redirect(`${GITHUB_URL}/${URLparts[1]}`, 301)
        case 3:
          return Response.redirect(
            `${GITHUB_URL}/${URLparts[1]}/commit/${URLparts[2]}`,
            301,
          )
      }
    default:
      return fetch(request)
  }
}
