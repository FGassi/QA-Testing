export const usuarioValido = { 
  nome: 'Peter',
  sobrenome: 'Pereira',
  email: 'peter@teste.com',
  endereco: 'Av. dos Estados, 5001 - Bangú, Santo André - SP',
  estado:'São Paulo',
  cidade:'Santo André',
  cep:'09210-580',
  celular:'(11) 3356-7000',
};

export const usuarioInvalido = { 
  email: 'peterteste.com',
};

export const usuarioExistente = { 
  email: 'ds@ds.com.br',
};

//hora - cresce a cada instante
//math random entre 0 e 1
//math floor arredondamento

export function emailGerado(): string {
  const sufixo = `${Date.now()}${Math.floor(Math.random() * 1000)}`; //string, template literal
  return `peter.${sufixo}@example.com`;
}

