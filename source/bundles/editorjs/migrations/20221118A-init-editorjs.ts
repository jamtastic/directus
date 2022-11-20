import Directus from '@jamtastic/directus'
import { Knex } from 'knex'

const collections = [
  {
    table: 'content',
    description: 'Modular content for use in websites, apps, etc.',
    icon: 'edit_note',
    options: {
      id: 'uuid',
      virtual: true,
    },
    fields: [],
  },
  {
    table: 'content_block',
    name: {
      singular: 'Block',
      plural: 'Blocks',
    },
    description: 'Editor.js content blocks for reuse in various content types',
    icon: 'widgets',
    options: {
      id: 'uuid',
      virtual: false,
      group: 'content',
      order: 1,
      hidden: true,
    },
    fields: [],
  },
  {
    table: 'page',
    description: 'Landing pages and generic site copy',
    icon: 'text_snippet',
    options: {
      id: 'uuid',
      virtual: false,
      group: 'content',
      order: 2,
    },
    fields: [
      {
        name: 'permalink',
        builder: async (t) => {
          await t.string('permalink')
        },
        presentation: {
          interface: {
            type: 'jamtastic-permalink-interface',
            options: { template: 'https://distinguished.dating' },
          },
        },
      },
    ],
  },
  {
    table: 'page_content',
    description: 'Content blocks of a page',
    icon: 'widgets',
    options: {
      id: false,
      virtual: false,
      group: 'page',
      sortable: true,
      order: 1,
      hidden: true,
    },
    fields: [
      {
        name: 'permalink',
        builder: async (t) => {
          await t.uuid('page').notNullable().references('id').inTable('page')
        },
        // presentation: {
        //   interface: {
        //     type: 'jamtastic-permalink-interface',
        //     options: {template: "https://distinguished.dating"}
        //   }
        // }
      },
      {
        name: 'permalink',
        builder: async (t) => {
          await t.uuid('block').notNullable().references('id').inTable('content_block')
          await t.primary(['page', 'block'], {
            constraintName: 'page_content_pk',
            deferrable: 'deferred',
          })
        },
        // presentation: {
        //   interface: {
        //     type: 'jamtastic-permalink-interface',
        //     options: {template: "https://distinguished.dating"}
        //   }
        // }
      },
    ],
  },
  {
    table: 'article',
    description: 'Blogs, op-eds, tutorials, etc.',
    icon: 'view_agenda',
    options: {
      id: 'uuid',
      virtual: false,
      group: 'content',
      order: 3,
    },
    fields: [
      /*
        table.string('type')
          - blog
          - trending
          - review
          - entertainment
          - lifestyle
          - how to guide
          - tutorial
          - listicle
          - oped
          - guest
          - other
      */
    ],
  },
  {
    table: 'article_content',
    description: 'Content blocks of an article',
    icon: 'widgets',
    options: {
      id: false,
      virtual: false,
      group: 'article',
      sortable: true,
      order: 1,
      hidden: true,
    },
    fields: [
      {
        name: 'article',
        builder: async (t) => {
          await t.uuid('article')
        },
      },
      //   table.uuid('article')
      //   table.uuid('block')
    ],
  },
  {
    table: 'faq',
    description: 'Frequently asked questions',
    icon: 'contact_support',
    options: {
      id: 'uuid',
      virtual: false,
      group: 'content',
      order: 4,
    },
    fields: [
      // table.string('question').notNullable()
      // table.string('answer').notNullable()
    ],
  },
]

export const up = async (knex: Knex): Promise<any> => {
  const directus = new Directus.SchemaBuilder(knex)

  collections.forEach(async (collection) => {
    await directus.createCollection(collection)
  })
}

export const down = async (knex: Knex): Promise<any> => {
  const directus = new Directus.SchemaBuilder(knex)

  collections.reverse().forEach(async (collection) => {
    await directus.dropCollection(collection)
  })
}
