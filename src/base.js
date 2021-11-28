const {Command} = require('@oclif/command')
const cli = require('cli-ux').default
const Datastore = require('nedb')
const dbFilename = './mp3tools.db'
const db = new Datastore({filename: dbFilename})

class Base extends Command {
  async init() {
    db.loadDatabase()
  }

  get cli() {
    return cli
  }

  get dbFilename() {
    return dbFilename
  }

  get db() {
    return db
  }
}

module.exports = Base
