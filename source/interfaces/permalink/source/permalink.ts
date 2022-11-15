import { defineInterface } from '@directus/extensions-sdk';
import { DeepPartial, Field } from '@directus/shared/types';
import PermalinkInterface from './permalink.vue';

export default defineInterface({
	id: 'jamtastic-permalink-interface',
	name: 'Permalink',
	description: 'Enter the slug used to create a permalink',
	icon: 'link',
	component: PermalinkInterface,
	types: ['string', 'text'],
	group: 'standard',
	recommendedDisplays: ['rating'],
	options: ({ field }) => {
		const opts: { standard: DeepPartial<Field>[]; advanced: DeepPartial<Field>[] } = {
			standard: [
				{
					field: 'template',
					name: 'Prefix template',
					type: 'string',
					meta: {
						width: 'full',
						interface: 'input',
						options: {
							placeholder: 'https://{{domain}}/blog/',
						}
					},
				},
			],
			advanced: [
				{
					field: 'softLength',
					name: '$t:soft_length',
					type: 'integer',
					meta: {
						width: 'half',
						interface: 'input',
						options: {
							placeholder: '255',
							min: 1,
							max: field.schema?.max_length,
						},
					},
				},
			],
		}

		return opts
	},
});
