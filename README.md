# poll-webxdc

Simple poll [webxdc](https://webxdc.org)

## Development

### Install dependencies

```
pnpm install
```

### Test in the browser

```
pnpm run dev
```

And after the server starts run the webxdc-dev tool for better testing:

```
pnpm run webxdc-dev
```

### Build

```
pnpm run build
```

You can set `NODE_ENV=debug` to include [eruda](https://github.com/liriliri/eruda).

```
NODE_ENV=debug pnpm run build
```