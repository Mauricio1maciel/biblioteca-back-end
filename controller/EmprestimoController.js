import { DATE } from "sequelize";
import moment from 'moment';
import Emprestimo from "../model/EmprestimoModel.js";
import Livro from "../model/LivroModel.js";
import Usuario from "../model/UsuarioModel.js";

async function listar(req, res)  {
    const respostaBanco = await Emprestimo.findAll();
    res.json(respostaBanco);
}

 async function selecionar(req, res)  {
    const id = req.params.id;
    const respostaBanco = await Emprestimo.findByPk(id);
    res.json(respostaBanco);
    }

async function emprestar(req, res)  {
        const idlivro = req.body.idlivro;
        const idusuario = req.body.idusuario;
        
        //verifica se existe o parametro idlivro
        if (!idlivro) {
            res.status(422).send('O parâmetro idlivro é obrigatório.');
        }
        if (!idusuario) {
            res.status(422).send('O parâmetro idusuario é obrigatório.');
        }

        //verifica se o livro existe
        const livroBanco = await Livro.findByPk(idlivro);
        if (!livroBanco) {
            res.status(404).send('Livro não encontrado.');
            }
        
        //verifica se o livro existe
        const usuarioBanco = await Usuario.findByPk(idusuario);
        if (!usuarioBanco) {
                res.status(404).send('Usuário não encontrado.');
        }

        //verifica se o livro esta inativo
        if (!livroBanco.ativo) {
            res.status(422).send('Este livro está inativo.');
        }

        //verifica se o livro esta emprestado
        if (livroBanco.emprestado) {
            res.status(422).send('Este livro já está emprestado');
        }

        //verifica se o usuário tem um emprétimo pendente
        //falta fazer
        
        //setando a data de emprestimo e data vencimento
        const emprestimo = moment().format('YYYY-MM-DD');
        const vencimento = moment().add(15, 'days').format('YYYY-MM-DD');
        
        //inserindo o emprestimo no banco
        const respostaBanco = await Emprestimo.create({
            idlivro, idusuario, emprestimo, vencimento});

        //alterando o campo emprestado do livro para true 
        const emprestado = true;
        await Livro.update(
            {emprestado},
            {where: {idlivro}});
        res.json(respostaBanco);
    }

 async function devolver(req, res)  {
    const observacao = req.body.observacao;

    const idemprestimo = req.params.id;
    
    //verifica se existe o parametro observacao
    if (!observacao) {
        res.status(422).send('O parâmetro observacao é obrigatório.');
    }

    //verifica se o idemprestimo existe
    const emprestimoBanco = await Emprestimo.findByPk(idemprestimo);
    if (!emprestimoBanco) {
        res.status(404).send('idemprestimo não válido.');
        }

     // Verifica se o empréstimo já foi devolvido
  if (emprestimoBanco.devolucao) {
    return res.status(400).send('Este empréstimo já foi devolvido.');
  }

    //setando a data de devolução
     const devolucao = moment();
     //verifica se o usuário tem um emprétimo pendente
     const vencimento = moment(emprestimoBanco.vencimento);

if (devolucao.isAfter(vencimento)) {
    res.json ( 'A devolução está atrasada.');
  // Aqui você pode guardar essa informação em um campo "multa", "atraso", etc.
}else{
    
    // //inserindo o devolução no banco
    const respostaBanco =  await Emprestimo.update(
        {
          devolucao,
          observacao
        },
        {
          where: { idemprestimo }
        }
      );
  
      // Atualiza o livro para emprestado = false
      const idlivro = emprestimoBanco.idlivro;
      await Livro.update(
        { emprestado: false },
        { where: { idlivro } });
      res.json(respostaBanco);
    }
}



export default {listar, selecionar, emprestar, devolver};