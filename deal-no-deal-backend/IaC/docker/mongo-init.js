print(
  'Start #################################################################',
);

db = db.getSiblingDB('dnd-db');
db.createCollection('games');
db.createCollection('users');

print('END #################################################################');
