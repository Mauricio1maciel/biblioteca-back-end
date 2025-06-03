import { DataTypes } from "sequelize";
import  banco  from "../banco.js"; 

// mapeamento da model Multa
export default banco.define(
    'multa', 
    {
      idmulta: {
        type: DataTypes.BIGINT, 
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      idemprestimo: {
        type: DataTypes.BIGINT, 
        allowNull: false
      },
      valor: {
        type: DataTypes.DECIMAL(11, 2), 
        allowNull: false,
        defaultValue: 0.00 
      },
      vencimento: {
        type: DataTypes.DATEONLY, 
        allowNull: false
      },
      pagamento: {
        type: DataTypes.DATEONLY, 
        allowNull: true
      }
    },
    {
    
      tableName: 'multa', 
      timestamps: false 
                        
    }
  );