# redirekt

A dead simple and very stupid Cloudflare Worker that does straightforward redirections to GitHub. As of recently, it also serves a static site out of Cloudflare's Workers KV product.

## Example redirections

```shell
https://msfjarvis.dev/g => https://github.com/msfjarvis
https://msfjarvis.dev/g/redirekt => https://github.com/msfjarvis/redirekt
https://msfjarvis.dev/g/redirekt/8436184361 => https://github.com/msfjarvis/redirekt/commit/8436184361
https://msfjarvis.dev/aps => https://github.com/android-password-store/Android-Password-Store
https://msfjarvis.dev/aps/f56086cd78e8 => https://github.com/android-password-store/Android-Password-Store/commit/f56086cd78e8
https://msfjarvis.dev/aps/issue/1232 => https://github.com/Android-Password-Store/Android-Password-Store/issues/1232
```

## How to use

The redirects are specific to my personal use so you might want to tweak/remove them before deploying to your own website.

Follow the [Workers documentation](https://developers.cloudflare.com/workers/) to install `wrangler`, then copy `wrangler.example.toml` to `wrangler.toml` and update the `routes` and `vars` fields. You can also add your zone and account ID there, or use the environment variables as recommended in the Workers documentation.

Run `wrangler publish` and that should be it!
