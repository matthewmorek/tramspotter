<template>
  <div class="app-container">
    <header v-if="hasHeaderSlot" class="app-header">
      <slot name="header"></slot>
    </header>

    <main v-if="hasDefaultSlot" class="app-main">
      <slot name="default"></slot>
    </main>

    <footer v-if="hasFooterSlot" class="app-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    hasHeaderSlot: function() {
      return !!this.$slots.header;
    },
    hasDefaultSlot: function() {
      return !!this.$slots.default;
    },
    hasFooterSlot: function() {
      return !!this.$slots.footer;
    }
  },
  created() {
    // This is a fix for having a consistent `vh` units
    // Ref: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
};
</script>

<style lang="postcss">
.app-container {
  padding: 1.5rem;
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
  max-width: 28em;
  margin: 0 auto;
  display: grid;
  grid-template-areas:
    'header'
    'main'
    'footer';
  grid-template-rows: max-content 1fr max-content;
}

.app-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  grid-area: header;
}

.app-main {
  display: flex;
  grid-area: main;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.app-footer {
  grid-area: footer;
  margin-top: auto;

  > .app-notice {
    margin-top: 1.5rem;
  }
}
</style>
