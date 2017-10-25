#!/usr/bin/env node

'use strict';
var path = require('path')
var fs = require('fs')

// get the egret dist path
var targetPath = process.cwd()
if (process.argv.length >= 3) {
  targetPath = process.argv[process.argv.length - 1]
}
targetPath = path.resolve(targetPath)

// get manifest.json
var manifestPath = path.join(targetPath, 'manifest.json')
if (!fs.existsSync(manifestPath)) {
  console.error('Can NOT find manifest.json in', targetPath)
  process.exit()
}
var manifest = require(manifestPath)

// check manifest.json
if (!manifest || !manifest.initial || !(manifest.initial instanceof Array) || !manifest.game || !(manifest.game instanceof Array)) {
  console.error('manifest.json content is illegal')
  process.exit()
}

// combine all js file
var jsfiles = manifest.initial.concat(manifest.game)

// combine all js content to one string
let jscontent = ''
jsfiles.map(function(fn){
  var fnPath = path.join(targetPath, fn)
  if (!fs.existsSync(fnPath)) {
    console.error('Can NOT found', fnPath)
    return
  }
  jscontent += ['\n/***********', fn, ' START ***********/\n'].join(' ')
  jscontent += fs.readFileSync(fnPath)
  jscontent += ['\n/***********', fn, ' END **********/\n'].join(' ')
})

// get string hash
var hashCode = 5381
var x = jscontent.length
while (x) {
  hashCode = (hashCode * 33) ^ jscontent.charCodeAt(--x)
}
hashCode = hashCode >>> 0

// create new file
var newJSfilename = 'egret.all.' + hashCode + '.js'
if (!fs.existsSync(path.join(targetPath, newJSfilename))) {
  writeFile(path.join(targetPath, newJSfilename), jscontent)
}

// backup old manifest.json
writeFile(path.join(targetPath, 'manifest_backup.json'), manifest)

// write new manifest.json
writeFile(path.join(targetPath, 'manifest.json'), {
  initial: [ newJSfilename ],
  game: []
})

console.log('egpack done!')

function writeFile (path, content) {
  var text = ''
  if (typeof content !== 'string') {
    text = JSON.stringify(content)
  }

  fs.writeFileSync(path, text || content, {
    encoding: 'utf8'
  })
}
