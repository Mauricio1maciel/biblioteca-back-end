import { Sequelize, DataTypes } from "sequelize";

//configuração da conexão com banco de dados
const sequelize = new Sequelize('bibliotecla2025', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    define:{
        timestamps: false,
        freezeTableName: true
    }
  });

  export default sequelize;