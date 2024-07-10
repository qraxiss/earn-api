import type { Schema, Attribute } from '@strapi/strapi';

export interface QuestOption extends Schema.Component {
  collectionName: 'components_quest_options';
  info: {
    displayName: 'Option';
    icon: 'alien';
  };
  attributes: {
    option: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'quest.option': QuestOption;
    }
  }
}
