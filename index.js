import express from "express";
import {  DataTypes } from "sequelize";
import banco from "./banco.js";

//mapeamento da model Editora
  const Editora = banco.define(
    'editora',
    {
      // Model attributes are defined here
      ideditora: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nomeeditora: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      cnpj: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      endereco: {
        type: DataTypes.TEXT,
        allowNull: true
        },
    }
  );

  try {
    await banco.authenticate();
    console.log('A conexão com o banco realizada com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar com o obanco de dados:', error);
  }

const app = express();
app.use(express.json());

app.get('/teste',(req, res)=> {
    res.send('Teste ok');
});

//rotas crud da tabala editora
app.get('/editora', async (req, res) => {
    const respostaBanco = await Editora.findAll();
    res.json(respostaBanco);
});

app.get('/editora/:id', async (req, res) => {
    const id = req.params.id;
    const respostaBanco = await Editora.findByPk(id);
    res.json(respostaBanco);
    });

app.post('/editora', async (req, res) => {
    //const nomeeditora = req.body.nomeeditora;
    //const cnpj = req.body.cnpj;
    //const endereco = req.body.endereco;

    const respostaBanco = await Editora.create(req.body);
    res.json(respostaBanco);
});

app.put('/editora/:id', async (req, res) => {
    const nomeeditora = req.body.nomeeditora;
    const cnpj = req.body.cnpj;
    const endereco = req.body.endereco;

    const ideditora = req.params.id;

    const respostaBanco = await Editora.update(
        {nomeeditora, cnpj, endereco},
        {where: {ideditora}});
    res.json(respostaBanco);
});

app.delete('/editora/:id', async (req, res) => {
  const ideditora = req.params.id;

  const respostaBanco = await Editora.destroy({where: {ideditora}});
  res.json(respostaBanco);
  });

app.listen(3000, ()=>{console.log('Servidor rodando na porta 3000')})