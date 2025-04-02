import express from "express";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize('bibliotecla2025', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    define:{
        timestamps: false,
        freezeTableName: true
    }
  });

  try {
    await sequelize.authenticate();
    console.log('A conexão com o banco foi feita com sucesso.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const app = express();
app.use(express.json());

app.get('/teste',(req, res)=> {
    res.send('Teste ok');

});




app.listen(3000, ()=>{console.log('Servidor rodando na porta 3000')})