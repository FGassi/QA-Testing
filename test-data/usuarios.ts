export const usuarioValido = { 
  nome: 'Peter',
  sobrenome: 'Pereira',
  email: 'peter@teste.com',
  estado:'São Paulo', 
  cidade:'Santo André',
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

