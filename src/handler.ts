const BASE_URL = 'https://msfjarvis.dev/'
const DOWNLOAD_URL = 'https://download.msfjarvis.dev/'
const DOWNLOAD_DEST_URL = 'https://dl.msfjarvis.dev/'
const GITHUB_USERNAME = 'msfjarvis'
const APS_SLUG = 'Android-Password-Store/Android-Password-Store'
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`
const APS_GITHUB_URL = `https://github.com/${APS_SLUG}`
const PAYID_DATA = {
  harsh: {
    addresses: [
      {
        paymentNetwork: 'BTC',
        environment: 'MAINNET',
        addressDetailsType: 'CryptoAddressDetails',
        addressDetails: {
          address: '1LbHbfTq1ZtE8u3qipCTJTcJYptvzc54aB',
        },
      },
    ],
    payId: 'harsh$msfjarvis.dev',
  },
}

export async function handleRequest(request: Request): Promise<Response> {
  if (request.headers.get('Accept') == 'application/btc-mainnet+json') {
    return sendPayID(request)
  } else if (request.url.startsWith(DOWNLOAD_URL)) {
    return redirectDownload(request, DOWNLOAD_URL, DOWNLOAD_DEST_URL)
  } else if (request.url.startsWith(BASE_URL)) {
    return redirectGithub(request, BASE_URL, GITHUB_URL, APS_GITHUB_URL)
  } else {
    return fetch(request)
  }
}

async function sendPayID(request: Request): Promise<Response> {
  switch (request.url.split('/').reverse()[0]) {
    case 'harsh':
      return new Response(JSON.stringify(PAYID_DATA.harsh))
  }
  return fetch(request)
}

async function redirectDownload(
  request: Request,
  sourceDomain: string,
  destinationDomain: string,
): Promise<Response> {
  return Response.redirect(
    request.url.replace(sourceDomain, destinationDomain),
    301,
  )
}

async function redirectGithub(
  request: Request,
  baseDomain: string,
  githubUrl: string,
  apsUrl: string,
): Promise<Response> {
  const urlParts = request.url.replace(baseDomain, '').split('/')
  switch (urlParts[0]) {
    case 'g':
      switch (urlParts.length) {
        case 1:
          return Response.redirect(githubUrl, 301)
        case 2:
          return Response.redirect(`${githubUrl}/${urlParts[1]}`, 301)
        case 3:
          return Response.redirect(
            `${githubUrl}/${urlParts[1]}/commit/${urlParts[2]}`,
            301,
          )
      }
    case 'ga':
      switch (urlParts.length) {
        case 1:
          return Response.redirect(apsUrl, 301)
        case 2:
          return Response.redirect(`${apsUrl}/commit/${urlParts[1]}`, 301)
        case 3:
          return Response.redirect(`${apsUrl}/issues/${urlParts[2]}`, 301)
      }
  }
  return fetch(request)
}
