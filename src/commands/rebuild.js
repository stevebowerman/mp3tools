const glob = require('glob')
const id3 = require('node-id3')
const {flags} = require('@oclif/command')
const Base = require('../base.js')
const fs = require('fs')

class RebuildCommand extends Base {
  async run() {
    const {flags} = this.parse(RebuildCommand)
    this.main(flags)
  }

  async main(flags) {
    // Get files
    this.cli.action.start('Getting files')
    const files = glob.sync(`${flags.source}/**/*.mp3`)
    this.cli.action.stop(`${files.length} found`)

    // Remove old db
    try {
      fs.unlinkSync(this.dbFilename)
    } catch (error) {}

    // Build mp3 list
    const simpleBar = this.cli.progress()
    simpleBar.start(files.length, 0)
    let i = 1
    for (const file of files) {
      try {
        const tags = id3.read(file)
        delete tags.raw
        delete tags.image
        delete tags.private
        delete tags.comment
        delete tags.userDefinedText
        this.db.insert(tags)

        simpleBar.update(i++)
      } catch (error) {
        this.error(`ERROR file: ${file}, error: ${error}`)
      }
    }
    simpleBar.stop()
  }
}

RebuildCommand.description = `Indexes mp3 source and creates JSON file DB
...
TO-DO
`

RebuildCommand.flags = {
  source: flags.string({
    char: 's',
    description: 'Source of mp3 files',
  }),
}

module.exports = RebuildCommand
