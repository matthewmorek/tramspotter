import AppUpdate from '.';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Elements|AppUpdate',
  decorators: [withKnobs(), withA11y()]
};

export const Default = () => ({
  components: { AppUpdate },
  props: {
    message: {
      default: text('Message', 'New update available. Tap to upgrade.')
    },
    updateExists: {
      default: boolean('Updat exists', true)
    }
  },
  methods: {
    updateApp: action('button-click')
  },
  template: `<app-update :update-exists="updateExists" @update-app="updateApp"
      >{{ message }}</app-update
    >`
});
