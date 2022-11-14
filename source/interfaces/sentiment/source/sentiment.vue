<template>
	<v-sheet
		v-if="ratingSystem != 'medium'"
		class="rating"
		:class="typeof value == 'number' ? '' : 'set'"
	>
		<v-button
			v-for="option in options" :key="option.value"
			:v-tooltip.bottom="option.label"
			class="rating"
			:class="ratingSystem"
			:value="option.value"
			:outlined="ratingSystem == 'stars' || value != option.value"
			@click="handleChange(option.value)"
			rounded icon exact
		>
			<v-icon class="icon rating"
				:class="(value == option.value) || (value! > option.value && ratingSystem == 'stars')
					? option.icon.on
					: option.icon.off"
				:name="(value == option.value) || (value! > option.value && ratingSystem == 'stars')
					? option.icon.on
					: option.icon.off"
			/>
		</v-button>
	</v-sheet>

	<v-sheet
		v-if="ratingSystem == 'medium'"
		class="rating medium set"
	>
		<v-button @click="emit('input', value! + 1)" rounded icon exact outlined>
			<v-icon name="plus_one"/>
		</v-button>
		{{ value }} claps
	</v-sheet>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	// const props = defineProps<>()

	const props = withDefaults(defineProps<{
		value: number | null
		ratingSystem: string
	}>(), {
  	value: null,
  	ratingSystem: 'stars'
	})

	const emit = defineEmits(['input'])

	const options = computed(() => {
		var opts: {
			label: string,
			icon: {
				on: string
				off: string
			}
			value: number
		}[] = []

		if (props.ratingSystem == 'stars') {
			for (let i = 1; i <= 5; i++) {
				opts.push({
					label: i + " star" + (i == 1 ? "" : "s"),
					icon: {
						on: "star",
						off: "star_outline",
					},
					value: i,
				})
			}
		}

		else if (['satisfaction', 'helpful'].includes(props.ratingSystem)) {
			const icons = [
				"sentiment_very_dissatisfied",
				"sentiment_dissatisfied",
				"sentiment_neutral",
				"sentiment_satisfied",
				"sentiment_very_satisfied",
			]
			const labels = {
				helpful: [
					"undefined",
					"Unhelpful",
					"Neutral",
					"Helpful",
					"undefined",
				],
				satisfaction: [
					"Very Dissatisfied",
					"Dissatisfied",
					"Neutral",
					"Satisfied",
					"Very Satisfied",
				],
			}
			for (let i = -2; i <= 2; i++) {
				opts.push({
					label: (props.ratingSystem == "satisfaction" ? labels.satisfaction[i+2] : labels.helpful[i+2]),
					icon: {
						on: icons[i+2],
						off: icons[i+2],
					},
					value: i,
				})
			}
			if (props.ratingSystem == "helpful") {
				opts.pop()
				opts.shift()
			}
		}

		else if (['binary', 'ternary', 'vote'].includes(props.ratingSystem)) {
			opts.push({
				label: props.ratingSystem == "vote" ? "Upvote" : "Like",
				icon: {
					on: props.ratingSystem == "vote" ? "arrow_upward" : "thumb_up_alt",
					off: props.ratingSystem == "vote" ? "arrow_upward" : "thumb_up_off_alt",
				},
				value: 1,
			})
			opts.push({
				label: props.ratingSystem == "vote" ? "Downvote" : "Dislike",
				icon: {
					on: props.ratingSystem == "vote" ? "arrow_downward" : "thumb_down_alt",
					off: props.ratingSystem == "vote" ? "arrow_downward" : "thumb_down_off_alt",
				},
				value: -1,
			})
			if (props.ratingSystem == 'ternary') {
				opts.reverse()
				opts.push({
					label: "Love",
					icon: {
						on: "favorite",
						off: "favorite_border",
					},
					value: 2,
				})
			}
		}

		return opts
	})

	const handleChange = (updatedValue: number): void => {
		emit('input', props.value == updatedValue ? null : updatedValue)
	}
</script>

<style>
	.rating.v-button + .rating.v-button:not(.stars) {
		margin-left: 8px;
	}
	.rating.v-button.stars button {
		border: none !important;
	}
	.rating.v-sheet {
		display: inline-block;
		padding: 10px;
		background: none;
		border: var(--border-width) solid var(--border-normal);
		padding-left: 12px;
		padding-right: 12px;
	}
	.rating.v-sheet.medium {
		display: block;
	}
	.rating.v-sheet:hover {
		border-color: var(--border-normal-alt);
	}
	.rating.v-sheet:not(.set) button {
		border: none !important;
	}

	.rating.icon.star { color: var(--yellow); }
	.rating.icon.favorite { color: var(--pink); }
	.rating.icon.thumb_down_alt { color: var(--danger-75); }
	.rating.icon.thumb_up_alt { color: var(--success-125); }
</style>
