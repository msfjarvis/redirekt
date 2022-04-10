use worker::kv::{Key, KvStore};
use worker::{console_log, event, Env, Request, Response, Result};

mod utils;

async fn list_keys(kv: &KvStore, prefix: String) -> Vec<Key> {
    let mut cursor: Option<String> = None;
    let mut list_complete = false;
    let mut all_keys = vec![];
    while !list_complete {
        let builder = if let Some(c) = cursor.clone() {
            kv.list().prefix(prefix.clone()).cursor(c)
        } else {
            kv.list().prefix(prefix.clone())
        };
        if let Ok(response) = builder.execute().await {
            all_keys.extend(response.keys);
            cursor = response.cursor;
            list_complete = response.list_complete;
        }
    }
    return all_keys;
}

#[event(fetch)]
pub async fn main(_req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
    // Optionally, get more helpful error messages written to the console in the
    // case of a panic.
    utils::set_panic_hook();

    return if let Ok(kv) = env.kv("BINDING") {
        let mut result = String::new();
        result.push_str("<html><head><title>Stats page</title></head><body><table><tr><th>URL</th><th>Count</th></tr>");
        for key in list_keys(&kv, "stats_".to_string()).await {
            if let Some(value) = kv.get(&key.name).cache_ttl(600).text().await.unwrap_or_else(|_| None) {
                result.push_str(&format!(
                    "<tr><td>{key}</td><td>{value}</td></tr>",
                    key = key.name.strip_prefix("stats_").unwrap()
                ));
            }
        }
        result.push_str("</body>");
        Response::from_html(result)
    } else {
        console_log!("Failed to get KV");
        Response::error("", 400)
    };
}
