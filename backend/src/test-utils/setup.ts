import { testConn } from './testConn';

// Create a typeorm connection that drops a schema and sync the tables
testConn(true).then(() => process.exit());
