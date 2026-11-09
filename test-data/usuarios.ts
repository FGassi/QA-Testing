//UI
export const usuarioValido = { 
  nome: 'Peter',
  sobrenome: 'Pereira',
  pais: 'Singapore',
  estado:'São Paulo', 
  cidade:'Santo André',
  
  //dados .env
  password:`${process.env.SENHA_NOVO_USUARIO}`,
  email:`${process.env.EMAIL_CADASTRADO}`,
  enderecoUm:`${process.env.ENDERECO}`,
  cep:`${process.env.CEP}`,
  celular:`${process.env.CELULAR}`,

  //dados adicionais 
  titulo: 'Mr.',
  diaNascimento: '15',
  mesNascimento: '08',
  anoNascimento: '1999',
  empresa: 'Empresa Teste',
  enderecoDois: 'Avenida dos Testes',
};

export const usuarioInvalido = { 
  email: 'peterteste.com',
};

//hora - cresce a cada instante
//math random entre 0 e 1
//math floor arredondamento

export function emailGerado(): string {
  const sufixo = `${Date.now()}${Math.floor(Math.random() * 1000)}`; //string, template literal
  return `peter.${sufixo}@example.com`;
}

//API

//funcao para gerar algo novo toda vez, principalmente pelo email
export function criarParametrosObrigatorios() {
    return {
        name: usuarioValido.nome,
        email: emailGerado(),
        password: usuarioValido.password,
        firstname: usuarioValido.nome,
        lastname: usuarioValido.sobrenome,
        address1: usuarioValido.enderecoUm,
        country: usuarioValido.pais,
        zipcode: usuarioValido.cep,
        state: usuarioValido.estado,
        city: usuarioValido.cidade,
        mobile_number: usuarioValido.celular,
    };
}

export const parametrosOpcionais = {
    title: usuarioValido.titulo,
    birth_date: usuarioValido.diaNascimento,
    birth_month: usuarioValido.mesNascimento,
    birth_year: usuarioValido.anoNascimento,
    company: usuarioValido.empresa,
    address2: usuarioValido.enderecoDois,
};
