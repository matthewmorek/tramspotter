<template>
  <div v-if="lastUpdate" class="update-timestamp">
    Updated {{ lastUpdate }} ago
  </div>
</template>

<script>
export default {
  props: {
    lastUpdate: {
      type: String,
      required: false,
      default: null
    }
  }
};
</script>

<style lang="postcss">
.update-timestamp {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-color-dimmed);
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
