import { Knex } from 'knex'

export type Field = {
  name: string
  note?: string | null
  // this.builder = false: admin presentation field only
	builder: false | ((t: Knex.CreateTableBuilder, knex?: Knex) => Promise<void>)
	presentation?: {
		hidden?: boolean
		sort?: number | null
		width?: 'half' | 'full'
		group?: string | null
		display?: {
			type: string | null
			options: object | null
		}
		interface?: {
			type: string | null
			options: object | null
		}
	}
	config?: {
		special?: string[]
		readonly?: boolean
		required?: boolean
		translations?: null
		conditions?: null
		validation?: {
			options: null
			message: null
		}
	}
	children?: Field[]
}

export const SystemFields: {
  id: {
    uuid: Field,
    int: Field,
  }
  created: {
    user: Field,
    date: Field,
  },
  updated: {
    user: Field,
    date: Field,
  },
} = {
  id: {
    uuid: {
      name: 'id',
      builder: async (t) => {t.uuid('id').primary().notNullable()},
      presentation: {
        hidden: true,
        interface: {
          type: 'input',
          options: null,
        }
      },
      config: {
        required: false,
        readonly: true,
        special: ['uuid'],
      },
    },
    int: {
      name: 'id',
      builder: async (t) => {t.integer('id').primary().notNullable()},
    },
  },
  created: {
    user: {
      name: 'user_created',
      builder: async (t) => {
        t.uuid('user_created').references('id').inTable('directus_users').onDelete('SET NULL')
      },
      presentation: {
        hidden: true,
        width: 'half',
        interface: {
          type: 'select-dropdown-m2o',
          options: {template: "{{avatar.$thumbnail}} {{first_name}} {{last_name}}"},
        },
        display: {
          type: 'user',
          options: null,
        }
      },
      config: {
        required: false,
        readonly: true,
        special: ['user-created']
      }
    },
    date: {
      name: 'date_created',
      builder: async (t, knex) => {
        t.timestamp('date_created').defaultTo(knex!.fn.now())
      },
      presentation: {
        width: 'half',
        hidden: true,
        interface: {
          type: 'datetime',
          options: null,
        },
        display: {
          type: 'datetime',
          options: {relative: true},
        }
      },
      config: {
        required: false,
        readonly: true,
        special: ['date-created', 'cast-timestamp']
      }
    },
  },
  updated: {
    user: {
      name: 'user_updated',
      builder: async (t) => {
        t.uuid('user_updated')
          .references('id').inTable('directus_users')
          .onDelete('SET NULL')
      },
      presentation: {
        hidden: true,
        width: 'half',
        interface: {
          type: 'select-dropdown-m2o',
          options: {template: "{{avatar.$thumbnail}} {{first_name}} {{last_name}}"},
        },
        display: {
          type: 'user',
          options: null,
        }
      },
      config: {
        required: false,
        readonly: true,
        special: ['user-updated']
      }
    },
    date: {
      name: 'date_updated',
      builder: async (t, knex) => {
        t.timestamp('date_updated').defaultTo(knex!.fn.now())
      },
      presentation: {
        width: 'half',
        hidden: true,
        interface: {
          type: 'datetime',
          options: null,
        },
        display: {
          type: 'datetime',
          options: {relative: true},
        }
      },
      config: {
        required: false,
        readonly: true,
        special: ['date-updated', 'cast-timestamp']
      }
    },
  }
}

const defaultPresentationOptions: Field['presentation'] = {
  hidden: false,
  sort: null,
  width: 'full',
  group: null,
  display: {
    type: null,
    options: null,
  },
  interface: {
    type: null,
    options: null,
  },
}

const defaultConfigOptions: Field['config'] = {
  special: [],
  readonly: false,
  required: true,
  translations: null,
  conditions: null,
  validation: {
    options: null,
    message: null,
  },
}

export const mergeFieldWithDefaults = (field: Field): Field => {
  return {
		name: field.name,
		note: field.note == undefined ? null : field.note,
		builder: field.builder,
		presentation: {
			...defaultPresentationOptions,
			...field.presentation,
		},
		config: {
			...defaultConfigOptions,
      ...field.config,
		},
		children: field.children == undefined ? [] : field.children,
	}
}

export const addFieldToDirectusAdmin = async (
  knex: Knex,
  table: string,
  group: string | null,
  field: Field,
) => {
  await knex('directus_fields')
    .insert({
      collection: table,
      field: field.name,
      special: field.config!.special!.length == 0
        ? null
        : field.config!.special!.join(','),
      interface: field.presentation!.interface!.type,
      options: field.presentation!.interface!.options == null
        ? null
        : JSON.stringify(field.presentation!.interface!.options),
      display: field.presentation!.display!.type,
      display_options: field.presentation!.display!.options == null
        ? null
        : JSON.stringify(field.presentation!.display!.options),
      readonly: field.config!.readonly,
      hidden: field.presentation!.hidden,
      sort: field.presentation!.sort,
      width: field.presentation!.width,
      translations: field.config!.translations,
      note: field.note,
      conditions: field.config!.conditions,
      required: field.config!.required,
      group,
      validation: field.config!.validation!.options,
      validation_message: field.config!.validation!.message,
    })
}
