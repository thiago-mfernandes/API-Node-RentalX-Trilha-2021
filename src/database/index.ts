import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'docker',
  password: 'ignite',
  database: 'rentalx', // o nome correto do database é 'rentx'
});

// Deve exportar essa função
export function createConnection(
  host = 'database_ignite',
): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;