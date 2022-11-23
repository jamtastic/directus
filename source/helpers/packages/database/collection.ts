import { Knex } from 'knex'

// Local imports
import { Field } from './field'
import { TranslationTitle } from './translation'

export type CollectionOptions = {
  id: false | 'uuid' | 'int'
  virtual?: boolean // Used to create folders in Directus
  group?: string | null
  order?: number | null // Display order in Directus collections list
  sortable?: boolean | string // Field to sort collection data on, if any
  accountability?:
    | {
        track: string
        created: boolean
        updated: boolean
      }
    | boolean
  archival?:
    | {
        enabled: boolean
        on: string | null
        archived: string | null
        unarchived: string | null
      }
    | boolean
  hidden?: boolean
  color?: string | null
  singleton?: boolean
  collapse?: 'locked' | 'open' | 'closed'
}

export type Collection = {
  table: string
  name?: {
    // Used to generate english translations
    title?: string
    singular: string
    plural: string
    languages?: string[]
  }
  description: string | null
  // Material Icon name: https://mui.com/material-ui/material-icons/
  icon: string
  options?: CollectionOptions
  fields: Field[]
}

export type CollectionStub = {
  name: string
  fields: Field[]
  placeholder?: boolean
}

const defaultCollectionOptions: CollectionOptions = {
  id: 'uuid',
  virtual: false,
  group: null,
  order: null,
  accountability: {
    track: 'all',
    created: true,
    updated: true,
  },
  hidden: false,
  color: null,
  singleton: false,
  collapse: 'closed',
}

export const mergeCollectionOptionsWithDefaults = (
  options?: CollectionOptions
): CollectionOptions => {
  return {
    ...defaultCollectionOptions,
    ...options,
  }
}

export const addCollectionToDirectusAdmin = async (
  knex: Knex,
  collection: Collection,
  translations: TranslationTitle[]
) => {
  await knex('directus_collections').insert({
    collection: collection.table,
    icon: collection.icon,
    note: collection.description,
    // display_template: ,
    hidden: collection.options!.hidden,
    singleton: collection.options!.singleton,
    translations: translations.length == 0 ? null : JSON.stringify(translations),
    // archive_field: ,
    // archive_app_filter: ,
    // archive_value: ,
    // unarchive_value: ,
    // sort_field: ,
    // accountability: ,
    color: collection.options!.color,
    // item_duplication_fields: ,
    sort: collection.options!.order,
    group: collection.options!.group,
    collapse: collection.options!.collapse,
  })
}
