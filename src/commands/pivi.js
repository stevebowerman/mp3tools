const glob = require('glob')
const id3 = require('node-id3')
const {Command, flags} = require('@oclif/command')

const re = /^\(\d{2}-\d{2}\)./ // string starts with (99-99)

class PiviCommand extends Command {
  async run() {
    const {flags} = this.parse(PiviCommand)
    this.main(flags)
  }

  main(flags) {
    let updated = []
    let errors = []
    let skipped = []

    const files = glob.sync(`${flags.source}/**/*.mp3`)

    for (const file of files) {
      try {
        const tags = id3.read(file)
        if (re.test(tags.title)) {
          this.warn(`Skipping ${file} as already processed`)
          skipped.push(file)
        } else {
          const disc = ('partOfSet' in tags) ? tags.partOfSet.split('/')[0].padStart(2, '0') : '01'

          if ('trackNumber' in tags) {
            const track = tags.trackNumber.split('/')[0].padStart(2, '0')
            const title = `(${disc}-${track}) ${tags.title}`
            this.warn(`Updating ${file}, title: ${title}`)
            tags.title = title
            id3.update(tags, file)
            updated.push(file)
          } else {
            this.warn(`Skipping ${file} as no track number`)
            skipped.push(file)
          }
        }
      } catch (error) {
        errors.push(file)
        this.error(`ERROR file: ${file}, error: ${error}`)
      }
    }
    this.log(`\nUpdated: ${updated.length}, Skipped: ${skipped.length}, Errors: ${errors.length}\n`)
  }
}

PiviCommand.description = `Updates title tag with (DISC-TRACK) in the title to accommodate JLR Pivi Pro issue of not using track number for ordering music on USB
...
Workaround for JLR's PiviPro system that doesn't recognise id3 "track" tag and orders tracks alphabetically
`

PiviCommand.flags = {
  source: flags.string({
    char: 's',
    description: 'Source of mp3 files',
    default: './test',
  }),
}

module.exports = PiviCommand
