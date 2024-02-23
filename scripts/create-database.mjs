import database from '../models/db/index.js';
import {mkdirSync} from 'node:fs';
import {join} from 'node:path';

const {provider, CreateDatabase} = database;

mkdirSync(join('__dirname', '..', 'db'), {recursive: true});
provider.open();
await new CreateDatabase().execute();
provider.close();
console.log('OK');
