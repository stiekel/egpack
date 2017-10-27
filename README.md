# egret-pack
`egpack` use to combine all Egret release web js files as a single js file, it will add a file content hash code in the filename, and change the `manifest.json` automatic.

`egpack` 用于将白鹭（Egret）项目生成的 Web 页面所使用的所有 js 文件，打包为一个单一的文件，并在文件名中加入一个 hash 码，相应的 `manifest.json` 也会自动修改。

## Setup

please install egpack as global module:

需要使用全局的方式来安装 `egpack`：

```sh
npm i -g egpack
```

## Usage

Go to your egret release web folder:

有两种方式运行，一种是进入到 Egret 的打包目录中运行 `egpack` 命令：

```sh
cd /Volumes/Macmite/stiekel/labs/projects/testGame/bin-release/web/alpha-0.0.1
```

and run:

```sh
egpack
```

or you can pass the release web folder as the param like this:

另外还可以直接运行 `egpack` 命令，并将 Egret 的打包目录作为参数传入：

```sh
egpack /Volumes/Macmite/stiekel/labs/projects/testGame/bin-release/web/alpha-0.0.1

```

then it will create a combined js and new `manifest.json`.
