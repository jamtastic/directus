import { defineInterface } from '@directus/extensions-sdk';
import { DeepPartial, Field } from '@directus/shared/types';
import SentimentInterface from './sentiment.vue';

export default defineInterface({
	id: 'jamtastic-sentiment-interface',
	name: 'Sentiment',
	description: 'Select a quantitative sentiment rating',
	icon: 'thumbs_up_down',
	component: SentimentInterface,
	types: ['integer'],
	group: 'selection',
	recommendedDisplays: ['rating'],
	options: ({ field }) => {
		const opts: { standard: DeepPartial<Field>[]; advanced: DeepPartial<Field>[] } = {
			standard: [
				{
					field: 'ratingSystem',
					name: 'Rating system',
					meta: {
						width: 'half',
						interface: 'select-dropdown',
						options: {
							choices: [
								{ text: 'Star rating', value: 'stars' },
								{ text: 'Binary', value: 'binary' },
								{ text: 'Ternary', value: 'ternary' },
								{ text: 'Voting', value: 'vote' },
								{ text: 'Satisfaction', value: 'satisfaction' },
								{ text: 'Helpful', value: 'helpful' },
								{ text: 'Cumulative', value: 'medium' },
							],
						},
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
