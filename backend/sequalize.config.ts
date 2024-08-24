import { Dialect } from 'sequelize';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const config: SequelizeModuleOptions = {
  dialect: 'mysql' as Dialect,
  host: 'localhost',
  port: 3306,
  username: 'user',
  password: 'p123',
  database: 'TestDB',
  autoLoadModels: true,
  synchronize: true,
}
