# redirekt

A dead simple and very stupid Cloudflare Worker that does straightforward redirections to GitHub.

## Example redirections

```shell
https://msfjarvis.dev/g/redirekt => https://github.com/msfjarvis/redirekt
https://msfjarvis.dev/g/redirekt/8436184361 => https://github.com/msfjarvis/redirekt/commit/8436184361
https://download.msfjarvis.dev/adblock => https://dl.msfjarvis.dev/adblock
```

## How to use

To use this, follow the Worker documentation to setup wrangler, then create a new app using this repository as the template.

In `src/handler.ts`, change the `BASE_URL` and `GITHUB_USERNAME` properties to match you, then publish the worker with wrangler.
