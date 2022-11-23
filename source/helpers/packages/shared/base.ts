import { Command, Flags, Interfaces } from '@oclif/core'
import { LogLevel } from './consts'
import { getRepoPath } from './paths'

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<
  typeof BaseCommand['globalFlags'] & T['flags']
>

export abstract class BaseCommand<T extends typeof Command> extends Command {
  static enableJsonFlag = true

  static globalFlags = {
    dryrun: Flags.boolean({
      char: 'd',
      helpGroup: 'GLOBAL',
    }),
    force: Flags.boolean({
      char: 'f',
      helpGroup: 'GLOBAL',
    }),
    loglevel: Flags.enum<LogLevel>({
      summary: 'Specify level for logging.',
      options: Object.values(LogLevel),
      helpGroup: 'GLOBAL',
      hidden: true,
    }),
    path: Flags.string({
      char: 'p',
      summary: 'Path to root of monorepo project.',
      default: getRepoPath(),
      helpGroup: 'GLOBAL',
    }),
    vvv: Flags.boolean({
      helpGroup: 'GLOBAL',
    }),
  }

  protected flags!: Flags<T>

  public async init(): Promise<void> {
    await super.init()
    const { flags } = await this.parse(this.constructor as Interfaces.Command.Class)
    this.flags = flags
  }

  protected async catch(err: Error & { exitCode?: number }): Promise<any> {
    // add any custom logic to handle errors from the command
    // or simply return the parent class error handling
    return super.catch(err)
  }

  protected async finally(_: Error | undefined): Promise<any> {
    // called after run and catch regardless of whether or not the command errored
    return super.finally(_)
  }
}
