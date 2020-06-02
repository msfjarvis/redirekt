# redirekt

A dead simple and very stupid Cloudflare Worker that does straightforward redirections to GitHub.

## Example redirections

```shell
https://msfjarvis.dev/g => https://github.com/msfjarvis
https://msfjarvis.dev/g/redirekt => https://github.com/msfjarvis/redirekt
https://msfjarvis.dev/g/redirekt/8436184361 => https://github.com/msfjarvis/redirekt/commit/8436184361
https://download.msfjarvis.dev/adblock => https://dl.msfjarvis.dev/adblock
```

## How to use

This bit of code is very personalized to my needs, so there's no 1-2-3 steps to just make it work for you. I've abstracted away some of the 'personalization' aspect to easily changeable variables so it is easier to make this fit your needs.

Follow the Worker documentation to setup wrangler, then create a new app using this repository as the template. `src/handler.ts` has the real logic for this worker. It's fairly simple, so hack away as per your needs and then use `wrangler publish` to deploy.
