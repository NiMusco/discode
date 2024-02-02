import { Sequelize } from 'sequelize';
import { config } from "./config";

const DB_NAME = config.DB_NAME || 'discode';
const DB_USER = config.DB_USER || 'discode';

export const sequelize = new Sequelize(DB_NAME, DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate()
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });