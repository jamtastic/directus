import { create } from '@directus/extensions-sdk/cli'
import { EXTENSION_PACKAGE_TYPES as OFFICIAL_EXTENSION_PACKAGE_TYPE } from '@directus/shared/constants'
import json from 'jsonfile'
import { join } from 'path'
import { BaseCommand, EXTENSION_PACKAGE_TYPES, HELPER_EXTENSION_TYPES } from '../../packages/shared'

export default class NewCommand extends BaseCommand<typeof NewCommand> {
  static summary = 'Create a new extension'
  static examples = ['<%= config.bin %> <%= command.id %>']
  static args = [
    {
      name: 'type',
      required: true,
      description: 'Type of new extension',
      options: Object.values(EXTENSION_PACKAGE_TYPES),
    },
    {
      name: 'name',
      required: true,
      description: 'Name of the new extension',
    },
  ]

  public async run(): Promise<any> {
    const { args, flags } = await this.parse(NewCommand)

    const type = Object.values(HELPER_EXTENSION_TYPES).includes(args.type)
      ? join('helpers', args.type)
      : args.type
    const path = join(flags.path, type + 's')

    process.chdir(path)

    if (OFFICIAL_EXTENSION_PACKAGE_TYPE.includes(args.type)) {
      create(args.type, args.name, { language: 'typescript' }).then(() => {
        const file = join('.', args.name, 'package.json')
        const pkg = json.readFileSync(file)

        pkg.version = '0.0.0'
        pkg.author = 'Jamtastic! (https://jamtastic.dev/)'
        pkg.contributors = ['Benny Michaels <foss@bnry.be> (https://bnry.be/)']

        json.writeFileSync(file, pkg, { spaces: 2 })
      })
    }

    return 1
  }
}
