import { create } from '@directus/extensions-sdk/cli'
import { EXTENSION_PACKAGE_TYPES as OFFICIAL_EXTENSION_PACKAGE_TYPE } from '@directus/shared/constants'
import { Flags } from '@oclif/core'
import json from 'jsonfile'
import { join } from 'path'

// Local imports
import { BaseCommand } from '@jamtastic/directus/cli'
import {
  EXTENSION_PACKAGE_TYPES,
  getRepoPath,
  HELPER_EXTENSION_TYPES,
} from '@jamtastic/directus/shared'

export default class NewCommand extends BaseCommand {
  static state = 'beta'
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

  static flags = {
    path: Flags.string({
      char: 'p',
      summary: 'Path to root of monorepo project.',
      default: getRepoPath(),
    }),
  }

  public async run(): Promise<void> {
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
  }
}
