import { handleRequest } from "./handler";

addEventListener("fetch", (event) => {
  if (event instanceof FetchEvent) {
    event.respondWith(handleRequest(event));
  }
});
