import { Command, Config /* Interfaces */, Flags } from '@oclif/core'

// Local imports
import { getRepoPath /* LogLevel */ } from '@jamtastic/directus/shared'

/*
! Something about this does not work

This is supposed to be a base class (https://oclif.io/docs/base_class)
but I cannot figure out why global flags defined here are causing errors.
Help and PRs are very welcome, even if it makes me look like an idiot
for whatever reason.
*/

export abstract class BaseCommand extends Command {
  static enableJsonFlag = true

  static globalFlags = {
    force: Flags.boolean({
      char: 'f',
      helpGroup: 'GLOBAL',
    }),
    path: Flags.string({
      char: 'p',
      summary: 'Path to root of monorepo project.',
      default: getRepoPath(),
      helpGroup: 'GLOBAL',
    }),
  }

  constructor(public argv: string[], public config: Config) {
    super(argv, config)
  }

  // protected flags!: Flags<T>

  public async init(): Promise<void> {
    await super.init()
    //   const { flags } = await this.parse(this.constructor as Interfaces.Command.Class)
    //   this.flags = flags
  }

  protected async catch(err: Error & { exitCode?: number }): Promise<unknown> {
    return super.catch(err)
  }

  protected async finally(_: Error | undefined): Promise<unknown> {
    return super.finally(_)
  }
}
