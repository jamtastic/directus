import { default as Conf, Schema } from 'conf'

type BunnyConfig = {
  project: {
    fqpn: string // Fully qualified path name
    provider: string
    org: string
    repo: string
    directory: string
  }
}

const schema: Schema<BunnyConfig> = {
  project: {
    type: 'object',
    properties: {
      fqpn: {
        type: 'string',
      },
      provider: {
        type: 'string',
      },
      org: {
        type: 'string',
      },
      repo: {
        type: 'string',
      },
      directory: {
        type: 'string',
      },
    },
    default: {
      fqpn: '',
      provider: 'github.com',
      org: 'jamtastic',
      repo: 'directus',
      directory: 'source',
    },
  },
}

const config = new Conf<BunnyConfig>({
  configName: 'config',
  projectName: 'bunny',
  fileExtension: '',
  clearInvalidConfig: true,
  projectSuffix: '',
  schema,
})

config.reset()

export default config
