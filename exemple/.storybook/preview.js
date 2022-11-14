import React from 'react';
import { themes } from '@storybook/theming';
import { withDesign } from 'storybook-addon-designs';
import './root.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
  controls: { expanded: true },
  docs: {
    theme: themes.dark,
  },
};

export const decorators = [
  withDesign,
  (Story) => (
    <Story />
  ),
];
