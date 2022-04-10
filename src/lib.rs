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
    if let Ok(kv) = env.kv("BINDING") {
        for key in list_keys(&kv, "stats_".to_string()).await {
            console_log!("{}", key.name);
        }
    } else {
        console_log!("Failed to get KV");
    }

    // Optionally, get more helpful error messages written to the console in the
    // case of a panic.
    utils::set_panic_hook();
    Response::error("", 400)
}
