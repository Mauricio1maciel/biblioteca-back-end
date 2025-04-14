import { DataTypes } from "sequelize";
import banco from "../banco.js";

export default banco.define(
  'livro',
  {
    idlivro: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    edicao: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: 'Nao definida'
    },
    paginas: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    publicacao: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    localizacao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resumo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    condicaofisica: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    emprestado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    ideditora: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    idcategoria: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }
);
