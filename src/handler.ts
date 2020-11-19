const BASE_URL = 'https://msfjarvis.dev/'
const GITHUB_USERNAME = 'msfjarvis'
const APS_SLUG = 'Android-Password-Store/Android-Password-Store'
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`
const APS_GITHUB_URL = `https://github.com/${APS_SLUG}`

export async function handleRequest(event: FetchEvent): Promise<Response> {
  if (event.request.url.startsWith(BASE_URL)) {
    return redirectGitHub(event)
  } else {
    return fetch(event.request)
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
  }
  return fetch(event.request)
}
