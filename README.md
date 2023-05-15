# Uppy.ts example

[React | Uppy](https://uppy.io/docs/react/)  
[tus/tus-js-client: A pure JavaScript client for the tus resumable upload protocol](https://github.com/tus/tus-js-client)

[tus - resumable file uploads](https://tus.io/)

## Server setup

```sh
# terminal 1
# listens on port 35000 for webhook
# format logs with bunyan
npx httpbin.js@latest | npx bunyan@latest
```

```sh
# terminal 2
tusd -hooks-http http://localhost:35000
# files will be stored in `${pwd}/data/`
```

## Client setup

```sh
yarn # install dependencies
yarn dev
# visit the webpage locally and try uploading some files
```

[tusd log](./tusd.log)
[webhook log](./webhook.log)

## Findings

[tus-js-client/faq.md at main · tus/tus-js-client · GitHub](https://github.com/tus/tus-js-client/blob/main/docs/faq.md)

- tus client POST metadata to tus server to generate an upload URL (which usually contains an unique id)
- client will store the metadata and uploadUrl in local database (`localStorage` for web client)
- but creation time is not part of POST metadata
- the client **should** use its local database to detect if a file has been changed and a reupload is needed
- the uploadUrl is used to trace the state of file upload
- an example of Uppy's `localStorage` record:
  - key: `tus::tus-uppy-2023/0306/tst/jor/current/box/mp4-2v-2v-1d-1d-1d-1e-video/mp4-6545969-1680095328000-http://localhost:1080/files/::413373138270`
  - value: `{"size":6545969,"metadata":{"relativePath":null,"name":"2023_0306_TST-JOR-current-box.mp4","type":"video/mp4","filetype":"video/mp4","filename":"2023_0306_TST-JOR-current-box.mp4"},"creationTime":"Fri May 12 2023 13:03:23 GMT+0800 (Hong Kong Standard Time)","uploadUrl":"http://localhost:1080/files/247524ba12201be30679b229bc1aad2e"}`
- hence these will generate different ids
  - different machines
  - different clients (or the same client in different URL)
  - different browser on the same machine
  - different incognito browser sessions

tusd specifics:

- if `-hooks-http` is specified but target is not reachable, tusd will retry and then return 500, uploading will not be available
- `-hooks-enabled-events` can be used to only listen for `post-finish` events
- `{id}`, `{id}.info` will be generated on server's `data/`
- deleting the any of the above will cause tus client to generate a new id (and new upload)
