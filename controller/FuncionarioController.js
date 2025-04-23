import Funcionario from "../model/FuncionarioModel.js";

async function listar(req, res)  {
    const respostaBanco = await Funcionario.findAll();
    res.json(respostaBanco);
}

 async function selecionar(req, res)  {
    const id = req.params.id;
    const respostaBanco = await Funcionario.findByPk(id);
    res.json(respostaBanco);
    }

async function inserir(req, res)  {
    const nomefuncionario = req.body.nomefuncionario;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const nascimento = req.body.nascimento;
    const salario = req.body.salario;
    const contratacao = req.body.contratacao;


    if (!nomefuncionario) {
        res.status(422).send('O parâmetro nomefuncionario é obrigatório.');
    }
    if (!email) {
        res.status(422).send('O parâmetro email é obrigatório.');
    }
    if (!salario) {
        res.status(422).send('O parâmetro salario é obrigatório.');
    }
    if (!contratacao) {
        res.status(422).send('O parâmetro contratacao é obrigatório.');
    }

    const respostaBanco = await Funcionario.create(
        {nomefuncionario, cpf, email, telefone, nascimento, salario, contratacao},)
    res.json(respostaBanco);
    }

 async function alterar(req, res)  {
        const nomefuncionario = req.body.nomefuncionario;
        const cpf = req.body.cpf;
        const email = req.body.email;
        const telefone = req.body.telefone;
        const nascimento = req.body.nascimento;
        const salario = req.body.salario;
        const contratacao = req.body.contratacao;
    
        const idfuncionario = req.params.id;

        if (!nomefuncionario) {
            res.status(422).send('O parâmetro nomefuncionario é obrigatório.');
        }
        if (!email) {
            res.status(422).send('O parâmetro email é obrigatório.');
        }
        if (!salario) {
            res.status(422).send('O parâmetro salario é obrigatório.');
        }
        if (!contratacao) {
            res.status(422).send('O parâmetro contratacao é obrigatório.');
        }
    
        const respostaBanco = await Funcionario.update(
            {nomefuncionario, cpf, email, telefone, nascimento, salario, contratacao},
            {where: {idfuncionario}});
        res.json(respostaBanco);
    }

        async function demitir(req, res) {
            const idfuncionario = req.body.idfuncionario;
            const demissao = req.body.demissao;
          
            
            //   verifica se o funcionario existe
              const funcionarioBanco = await Funcionario.findByPk(idfuncionario);
              if (!funcionarioBanco) {
                return res.status(404).send('Funcionário não encontrado.');
              }
          
              // verifica se o funcionario já foi demitido
              if (!funcionarioBanco.ativo) {
                return res.status(422).send('Este funcionário já foi demitido.');
              }
          
              // atualiza os campos de demissão e ativo
              const respostaBanco = await Funcionario.update({
                demissao,
                ativo: false
              },
              { where: { idfuncionario } });
          
              res.json(respostaBanco); 
            
          }
          
          async function definirSenha(req, res) {
            const idfuncionario = req.params.id;
            const senha = req.body.senha;
          
            // Verifica se o id é válido (existe no banco)
            const funcionarioBanco = await Funcionario.findByPk(idfuncionario);
            if (!funcionarioBanco) {
              return res.status(404).send('Funcionário não encontrado.');
            }
          
            // Valida a senha
            if (!senha || senha.length < 6 || senha.length > 20) {
              return res.status(422).send('A senha deve ter entre 6 e 20 caracteres.');
            }
          
            // Atualiza a senha e limpa o token
            const respostaBanco = await funcionarioBanco.update({
              senha,
              token: null
            });
          
            res.json(respostaBanco);
          }
          

export default {listar, selecionar, inserir, alterar, demitir, definirSenha};