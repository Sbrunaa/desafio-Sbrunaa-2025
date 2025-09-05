class AbrigoAnimais {
  // Dicionário de animais e seus brinquedos favoritos
  animais = {
    Rex:   { tipo: "cão",   brinquedos: ["RATO", "BOLA"] },
    Mimi:  { tipo: "gato",  brinquedos: ["BOLA", "LASER"] },
    Fofo:  { tipo: "gato",  brinquedos: ["BOLA", "RATO", "LASER"] },
    Zero:  { tipo: "gato",  brinquedos: ["RATO", "BOLA"] },
    Bola:  { tipo: "cão",   brinquedos: ["CAIXA", "NOVELO"] },
    Bebe:  { tipo: "cão",   brinquedos: ["LASER", "RATO", "BOLA"] },
    Loco:  { tipo: "jabuti",brinquedos: ["SKATE", "RATO"] }
  };

  // Lista de brinquedos válidos
  brinquedosValidos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"];

  // Função auxiliar dentro da classe
  verificaOrdem(lista, animal, jaAdotados) {
    if (jaAdotados >= 3) return false;
    if (animal === this.animais["Loco"]) return true;

    let index = 0;
    for (let b of lista) {
      if (b === animal.brinquedos[index]) {
        index++;
        if (index === animal.brinquedos.length) return true;
      }
    }
    return false;
  }

  // Método principal exigido pelo desafio
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const lista1 = brinquedosPessoa1.split(",");
    const lista2 = brinquedosPessoa2.split(",");
    const listaAnimais = ordemAnimais.split(",");

    // ---- validação de brinquedos ----
    if (new Set(lista1).size !== lista1.length || new Set(lista2).size !== lista2.length) {
      return { erro: "Brinquedo inválido" };
    }
    for (let b of [...lista1, ...lista2]) {
      if (!this.brinquedosValidos.includes(b)) {
        return { erro: "Brinquedo inválido" };
      }
    }

    // ---- validação de animais ----
    if (new Set(listaAnimais).size !== listaAnimais.length) {
      return { erro: "Animal inválido" };
    }
    for (let nome of listaAnimais) {
      if (!this.animais[nome]) {
        return { erro: "Animal inválido" };
      }
    }

    let adotadosPessoa1 = 0;
    let adotadosPessoa2 = 0;
    const resultado = [];

    // ---- processar animais ----
    for (let nome of listaAnimais) {
      const animal = this.animais[nome];
      const podePessoa1 = this.verificaOrdem(lista1, animal, adotadosPessoa1);
      const podePessoa2 = this.verificaOrdem(lista2, animal, adotadosPessoa2);

      let destino = "abrigo";

      if (podePessoa1 && !podePessoa2 && adotadosPessoa1 < 3) {
        destino = "pessoa 1";
        adotadosPessoa1++;
      } else if (podePessoa2 && !podePessoa1 && adotadosPessoa2 < 3) {
        destino = "pessoa 2";
        adotadosPessoa2++;
      }

      // regra do Loco (jabuti)
      if (nome === "Loco") {
        if (destino === "pessoa 1" && adotadosPessoa1 < 2) destino = "abrigo";
        if (destino === "pessoa 2" && adotadosPessoa2 < 2) destino = "abrigo";
      }

      resultado.push(`${nome} - ${destino}`);
    }

    return { lista: resultado.sort() };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
