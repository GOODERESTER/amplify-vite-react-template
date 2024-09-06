import { defineStorage } from '@aws-amplify/backend';

export const clothingPhotos = defineStorage({
    name: 'clothingPhotos',
    access: (allow) => ({
      'clothing-photos/{entity_id}/*': [
        allow.guest.to(['read']),
        allow.entity('identity').to(['read', 'write', 'delete'])
      ],
      'picture-submissions/*': [
        allow.authenticated.to(['read','write']),
        allow.guest.to(['read', 'write'])
      ],
    })
  });