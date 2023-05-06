module.exports = {
  port: {
    option: '-p,--port <v>',  //program.option('-p, --port<val>', 'xxx')
    descriptor: 'set your server port',
    usage: 'zz --port 3000',
    default: 8080
  },
  directory: {
    option: '-d,--directory <v>',  //program.option('-p, --port<val>', 'xxx')
    descriptor: 'set your server start directory',
    usage: 'zz --directory D:',
    default: process.cwd()
  }
}

module