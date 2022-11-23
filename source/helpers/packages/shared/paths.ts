import { join } from 'path'
import config from './config'

export const getRepoPath = (): string => {
  // Path resolution order:

  // 1. Is an environment variable set?
  if (process.env.BUNNY_PROJECT_ROOT) return process.env.BUNNY_PROJECT_ROOT

  // 2. Locally configured with conf
  if (config.get('project.fqpn') != '') return config.get('project.fqpn')

  // 3. Using GITPATH convention
  //    Check if provider, org or project are set in conf

  // 4.

  // return config.get('project.provider')

  return process.env.GITPATH
    ? join(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env.GITPATH!,
        config.get('project.provider'),
        config.get('project.org'),
        config.get('project.repo'),
        config.get('project.directory')
      )
    : 'unset'
}
