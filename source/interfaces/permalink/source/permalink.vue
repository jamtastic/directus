<template>
  <v-input slug :model-value="value" @update:model-value="$emit('input', $event)">
    <template #prepend>
      <v-icon name="link" />
      <span style="direction: rtl">
        <span class="permalink prefix">{{ prefix }}</span>
        <span class="permalink slash">/</span>
      </span>
    </template>
    <!-- v-if="(percentageRemaining !== null && percentageRemaining <= 20) || iconRight || softLength" -->
    <template #append>
      <!-- <span
        v-if="(percentageRemaining !== null && percentageRemaining <= 20) || softLength"
        class="remaining"
        :class="{
          warning: percentageRemaining < 10,
          danger: percentageRemaining < 5,
        }"
      >
        {{ charsRemaining }}
      </span> -->
      <!-- :class="{ hide: percentageRemaining && percentageRemaining <= 20 }" -->
      <v-icon class="action" name="copy" @click="copyLinkToClipboard()" />
      <a :href="link" target="_blank">
        <v-icon class="action" name="open_in_new" />
      </a>
      <v-icon class="action" name="info" @click="helpPanelActive = true" />
      <v-icon class="action metric" :class="quality.rating" name="speed" @click="metricPanelActive = true" />
    </template>
  </v-input>

  <v-dialog v-model="helpPanelActive">
    <v-card>
      <v-card-title>What is a permalink?</v-card-title>
      <v-card-text>This is some information about permalinks.</v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="metricPanelActive">
    <v-card>
      <v-card-title>URL Analysis</v-card-title>
      <v-card-text>This is some information about how the slug might perform.</v-card-text>
      <v-card-text>
        {{ quality }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { stopwords } from './stopwords'

  const props = withDefaults(
    defineProps<{
      value: string
      template: string
    }>(),
    {
      value: '',
      template: 'stars',
    }
  )

  const emit = defineEmits(['input'])

  const helpPanelActive = ref(false)
  const metricPanelActive = ref(false)

  const prefix = computed(() => {
    return props.template
  })

  const link = computed(() => {
    return [prefix.value, props.value].join('/')
  })

  const copyLinkToClipboard = (): void => {
    window.navigator.clipboard
      .writeText(link.value)
      .then(() => {
        alert('Link copied to clipboard')
      })
      .catch(() => {
        alert('Error in copying text')
      })
  }

  type QualityRating = 'null' | 'poor' | 'average' | 'good'

  const quality = computed(
    (): {
      rating: QualityRating
      score: number | null
    } => {
      if (props.value === ('' || null)) return { rating: 'null', score: null }

      const maxScore = 10
      const threshold = {
        good: 0.8,
        average: 0.5,
      }

      let rating: QualityRating = 'good'
      let score = maxScore

      let words = props.value.split('-')

      // * Rule: URL should start with https://
      // Yup, this is configured in the collection settings, but it's important!
      if (prefix.value.startsWith('https://')) score--

      // * Rule: Number of words should be between 3-6
      if (words.length < 3) score--
      else if (words.length > 8) score = score - 3
      else if (words.length > 6) score = score - 2

      words.forEach((word: string) => {
        // * Rule: Minimal use of stop words
        if (stopwords.includes(word)) score--

        // * Rule: Should not have numbers in the slug
        if (!isNaN(parseFloat(word))) score--

        let year = new Date().getFullYear()

        // * Rule: Should not have a recent year in the slug
        if (
          // This will compound on the negative score above. This is intentional.
          !isNaN(parseFloat(word)) &&
          parseFloat(word) > year - 7 &&
          parseFloat(word) < year + 3
        )
          score--

        // * Rule: Should definitely not contain the current year
        // Also compounding (max of three points lost)
        if (!isNaN(parseFloat(word)) && parseFloat(word) == year) score--

        // TODO: Rule: Keywords should be relevant
        // How to test this quickly without external API use?
      })

      // TODO: Rule: Should avoid similarity
      // Ideally check the database to see how many entries are similar

      if (score < threshold.good * maxScore) rating = 'average'
      if (score < threshold.average * maxScore) rating = 'poor'

      return { rating, score }
    }
  )

  // const handleChange = (updatedValue: string): void => {
  //   emit('input', props.value == updatedValue ? null : updatedValue)
  // }
</script>

<style scoped>
  .permalink.prefix,
  .permalink.slash {
    display: inline-block;
    color: var(--foreground-subdued);
    vertical-align: middle;
  }

  .permalink.prefix {
    display: inline-block;
    max-width: 26em;
    margin-left: 5px;
    overflow: hidden;
    direction: rtl;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .v-icon.action {
    margin-left: 8px;
  }

  .v-icon.action:hover {
    color: var(--foreground-normal);
    cursor: pointer;
  }

  .v-icon.metric.poor {
    color: var(--danger);
  }

  .v-icon.metric.poor:hover {
    color: var(--danger-150);
  }

  .v-icon.metric.average {
    color: var(--warning);
  }

  .v-icon.metric.average:hover {
    color: var(--warning-150);
  }

  .v-icon.metric.good {
    color: var(--success);
  }

  .v-icon.metric.good:hover {
    color: var(--success-150);
  }
</style>
