# egret-pack
`egpack` will combine all Egret release web js as a combine js file, and change the `manifest.json` automatic.

## Setup

please install egpack as global module:

```sh
npm i -g egpack
```

## Usage

Go to your egret release web folder:

```sh
cd /Volumes/Macmite/kangya/labs/projects/czbGame/bin-release/web/alpha-0.0.1
```

and run:

```sh
egpack
```

or you can pass the release web folder as the param like this:

```sh
egpack /Volumes/Macmite/kangya/labs/projects/czbGame/bin-release/web/alpha-0.0.1

```

then it will create a combined js and new `manifest.json`.
