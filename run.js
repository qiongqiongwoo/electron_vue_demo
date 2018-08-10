'use strict'

const exec = require('child_process').exec
const treeKill = require('tree-kill')

let isElectronOpen = false

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

let children = []
function run (command, name) {
  let child = exec(command)
  child.stdout.on('data', data => {
    if (/Compiled/g.test(data.toString().trim().replace(/\n/g, '\n' + repeat(' ', command.length + 2))) && !isElectronOpen) {
      run('cross-env NODE_ENV=development electron app/src/main/index.dev.js', 'electron')
      isElectronOpen = true
    }
  })
  child.on('exit', code => exit(code))
  children.push(child)
}

function exit (code) {
  children.forEach(child => {
    treeKill(child.pid)
  })
}

run(`webpack-dev-server --hot --colors --config webpack.config.js --content-base app/dist`, 'webpack')
