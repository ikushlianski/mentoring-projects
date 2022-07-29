import { Entity } from 'electrodb';
import { ELECTRO_DB_SERVICE } from '../db.constants';

export const SettingModel = new Entity({
  model: {
    entity: 'settings',
    version: '1',
    service: ELECTRO_DB_SERVICE,
  },
  attributes: {
    username: {
      type: 'string',
      required: true,
    },
    notifications: {
      type: 'map',
      properties: {
        notifyWhenBookingCreated: {
          type: 'boolean',
        },
        notifyWhenBookingChanged: {
          type: 'boolean',
        },
      },
    },
    rideCompletionText: {
      type: 'string',
    },
  },
  indexes: {
    userSettings: {
      pk: {
        field: 'pk',
        composite: ['username'],
      },
      sk: {
        field: 'sk',
        composite: [],
      },
    },
  },
});
