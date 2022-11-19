import { Knex } from 'knex'

// Local imports
import {
  addCollectionToDirectusAdmin, Collection,
  CollectionOptions,
  CollectionStub,
  mergeCollectionOptionsWithDefaults
} from './collection'
import {
  addFieldToDirectusAdmin,
  Field,
  mergeFieldWithDefaults,
  SystemFields
} from './field'
import { TranslationTitle } from './translation'

export class SchemaBuilder {
	knex: Knex
  schema: CollectionStub[]
  directus: boolean

	constructor(db: Knex) {
		this.knex = db
    this.schema = []
    this.directus = true
	}

  // Remove placeholder column once another column has been added

  private removePlaceholderColumn = async (table: string) => {
    await this.knex(table).columnInfo().then(async (info) => {
      const names = Object.keys(info)
      if (names.length > 1 && names.includes('placeholder')) {
        await this.knex.schema.hasColumn(table, 'placeholder')
          .then(async (result: boolean) => {
            if (result)
              await this.knex.schema.alterTable(table, async (t) => {
                t.dropColumn('placeholder')
            })
          })
      }
    })
  }

  public createField = async (
    table: string,
    group: string | null,
    field: Field,
  ) => {
    if (field.builder !== false) {
      await this.knex.schema.alterTable(table, async (t) => {
        // Don't remove this ... yes, we already know this ... damn it Typescript
        if (field.builder !== false)
          await field.builder(t, this.knex)
      })
    }

    let f: Field = mergeFieldWithDefaults(field)
    await addFieldToDirectusAdmin(this.knex, table, group, f)

    // * Add the children fields

    f.children!.forEach((child: Field) => {
      this.createField(table, f.name, child)
    })

    await this.removePlaceholderColumn(table)
  }

  private createTable = async (collection: Collection) => {
    await this.knex.schema.createTable(collection.table, (table) => {
      table.uuid('placeholder')
    })

    if (collection!.options!.id == 'uuid') // * Add ID field
      await this.createField(collection.table, null, SystemFields.id.uuid)
    else if (collection!.options!.id == 'int')
      await this.createField(collection.table, null, SystemFields.id.int)

    if ( // * Track item creation
      typeof collection!.options!.accountability == "object"
      && collection!.options!.accountability.created
    ) {
      await this.createField(collection.table, null, SystemFields.created.user)
      await this.createField(collection.table, null, SystemFields.created.date)
    }

    if ( // * Track item updates
      typeof collection!.options!.accountability == "object"
      && collection!.options!.accountability.updated
    ) {
      await this.createField(collection.table, null, SystemFields.updated.user)
      await this.createField(collection.table, null, SystemFields.updated.date)
    }

    // TODO: Status / workflow

    // * Add the fields to the tables and collections

    await collection.fields.forEach(async (field: Field) => {
      await this.createField(collection.table, null, field)
    })
  }

  public createCollection = async (collection: Collection) => {

    // * Merge defaults and configured options

    let translations: TranslationTitle[] = []
    if (typeof collection.name == 'object') {
      let languages: string[] = collection.name.languages instanceof Array
        ? collection.name.languages
        : [
          'en-US',
          'en-GB',
          'en-CA',
        ]
      for (let language of languages) {
        translations.push({
          language,
          translation: collection.name.title ? collection.name.title : collection.name.singular,
          singular: collection.name.singular,
          plural: collection.name.plural,
        })
      }
    }

    let opts: CollectionOptions = mergeCollectionOptionsWithDefaults(
      collection.options
    )

    let c: Collection = {
      table: collection.table,
      description: collection.description,
      icon: collection.icon,
      options: opts,
      fields: collection.fields,
    }

    if (c.options!.virtual) {
      await this.createTable(c)
    }

    await addCollectionToDirectusAdmin(this.knex, c, translations)
  }

  public dropCollection = async (collection: Collection) => {
    // remove from directus_fields
    // remove from directus_collections
    // drop table
    console.log(collection.table)
  }
}
