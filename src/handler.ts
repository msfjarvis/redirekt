const BASE_URL = 'https://msfjarvis.dev/'
const DOWNLOAD_URL = 'https://download.msfjarvis.dev/'
const DOWNLOAD_DEST_URL = 'https://dl.msfjarvis.dev/'
const STATS_URL = 'https://stats.msfjarvis.dev/'
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
const BLACKLIST_REGEX = new RegExp('wp-|php|css|js|txt|ico|xml|webp$/');

export async function handleRequest(request: Request): Promise<Response> {
  if (request.headers.get('Accept') == 'application/btc-mainnet+json') {
    return sendPayID(request)
  } else if (request.url.startsWith(DOWNLOAD_URL)) {
    return redirectDownload(request)
  } else if (request.url.startsWith(BASE_URL)) {
    return redirectGitHub(request)
  } else {
    if (!BLACKLIST_REGEX.test(request.url)) {
      await submitStats(request)
    }
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

async function redirectDownload(request: Request): Promise<Response> {
  return Response.redirect(
    request.url.replace(DOWNLOAD_URL, DOWNLOAD_DEST_URL),
    301,
  )
}

async function redirectGitHub(request: Request): Promise<Response> {
  await submitStats(request)
  const urlParts = request.url.replace(BASE_URL, '').split('/')
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
    case 'ga':
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
  return fetch(request)
}

async function submitStats(request: Request): Promise<Response> {
  return fetch(`${STATS_URL}/view?url=${request.url}`)
}
