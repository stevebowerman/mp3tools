const {flags} = require('@oclif/command')
const Base = require('../base.js')

class QueryCommand extends Base {
  async run() {
    const {flags} = this.parse(QueryCommand)
    this.find(flags)
  }

  async find(flags) {
    let query = {}
    Object.keys(flags).forEach(field => {
      if (field === 'missing') {
        flags[field].forEach(missing => {
          query[missing] = {$exists: false}
        })
      } else {
        query[field] = new RegExp(flags[field], 'i')
      }
    })

    if (Object.keys(query).length > 0) {
      this.cli.action.start(`Find: ${JSON.stringify(query)}`)
      this.db.find(query).sort({album: 1, partOfSet: 1, trackNumber: 1}).exec((error, data) => {
        if (error) this.error(error)
        this.cli.action.stop(data.length)
        this.cli.table(data, {
          artist: {},
          // performerInfo:{},
          album: {},
          title: {},
          trackNumber: {},
          partOfSet: {},
          genre: {},
          year: {},
          bpm: {},
          initialKey: {},
        })
        // console.table(data)
        // console.log(data)
      })
    }
  }
}

QueryCommand.description = `
Run queries on the mp3 DB
`

QueryCommand.flags = {
  artist: flags.string({
    description: 'Artist',
  }),
  album: flags.string({
    description: 'Album',
  }),
  genre: flags.string({
    description: 'Genre',
  }),
  title: flags.string({
    description: 'Title',
  }),
  missing: flags.string({
    description: 'Missing',
    multiple: true,
  }),
}

module.exports = QueryCommand
