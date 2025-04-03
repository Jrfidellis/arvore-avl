export class No {
  valor: number
  esquerda: No | null
  direita: No | null

  constructor(valor: number) {
    this.valor = valor
    this.esquerda = null
    this.direita = null
  }
}

export class ArvoreBinaria {
  raiz: No | null = null
  nos: No[] = []

  constructor(private visitar = (_no: No | null) => {}) {}

  inserir(valor: number) {
    if (this.raiz === null) {
      const novaRaiz = new No(valor)
      this.raiz = novaRaiz
      this.nos.push(novaRaiz)
    } else {
      this.inserirRecursivo(this.raiz, valor)
    }
  }

  private inserirRecursivo(noAtual: No, valor: number) {
    const novoNo = new No(valor)
    if (valor < noAtual.valor) {
      if (noAtual.esquerda === null) {
        noAtual.esquerda = novoNo
        this.nos.push(novoNo)
      } else {
        this.inserirRecursivo(noAtual.esquerda, valor)
      }
    } else if (valor > noAtual.valor) {
      if (noAtual.direita === null) {
        noAtual.direita = novoNo
        this.nos.push(novoNo)
      } else {
        this.inserirRecursivo(noAtual.direita, valor)
      }
    } else {
      globalThis.alert('Elemento já existe na árvore')
      return
    }

    this.balancear(noAtual)
  }

  balancear(no: No) {
    const pai = this.procurarPai(no.valor)
    const fatorDeBalanceamento = this.calculaFatorDeBalanceamento(no)

    let noBalanceado: No | null = no

    if (fatorDeBalanceamento > 1) {
      if (this.calculaFatorDeBalanceamento(no.esquerda!) < 0) {
        no.esquerda = this.rotacaoEsquerda(no.esquerda!)
      }
      noBalanceado = this.rotacaoDireita(no)
    } else if (fatorDeBalanceamento < -1) {
      if (this.calculaFatorDeBalanceamento(no.direita!) > 0) {
        no.direita = this.rotacaoDireita(no.direita!)
      }
      noBalanceado = this.rotacaoEsquerda(no)
    } 

    // Atualiza a raiz se necessário
    if (pai === null) {
      this.raiz = noBalanceado
    } else {
      // Atualiza a referência do pai
      if (pai.esquerda === no) {
        pai.esquerda = noBalanceado
      } else {
        pai.direita = noBalanceado
      }
    }

    return noBalanceado
  }

  rotacaoDireita(no: No) {
    const novoNo = no.esquerda
    if(!novoNo) {
      return no
    }
  
    const temp = novoNo.direita
    novoNo.direita = no
    no.esquerda = temp

    return novoNo
  }

  rotacaoEsquerda(no: No) {
    const novoNo = no.direita
    if(!novoNo) {
      return no
    }
  
    const temp = novoNo.esquerda
    novoNo.esquerda = no
    no.direita = temp

    return novoNo
  }

  calculaFatorDeBalanceamento(no: No) {
    const alturaEsquerda = this.calculaAltura(no.esquerda)
    const alturaDireita = this.calculaAltura(no.direita)
    return alturaEsquerda - alturaDireita
  }

  private calculaAltura(lado: No | null, altura: number = 0): number {
    if (lado === null) {
      return altura
    }

    return Math.max(
      this.calculaAltura(lado.esquerda, altura + 1),
      this.calculaAltura(lado.direita, altura + 1)
    )
  }

  pesquisar(valor: number) {
    const { no } = this.pesquisarComNo(this.raiz, valor)
    return no
  }

  procurarPai(valor: number) {
    const { noAnterior } = this.pesquisarComNo(this.raiz, valor)
    return noAnterior
  }

  private pesquisarComNo(no: No | null, valor: number) {
    let noAnterior: No | null = null

    while (no != null) {
      this.visitar(no)
      if (valor == no.valor) {
        return { no, noAnterior }
      } else if (valor < no.valor) {
        noAnterior = no
        no = no.esquerda
      } else {
        noAnterior = no
        no = no.direita
      }
    }

    return {
      no: null,
      noAnterior: null,
    }
  }

  deletarPorCopia(valor: number) {
    const no = this.pesquisar(valor)

    if (no == null) {
      globalThis.alert('elemento não está na árvore')
      return
    }

    if (this.raiz == null) {
      globalThis.alert('árvore está vazia')
      return
    }

    if (no == this.raiz) {
      this.raiz = null
      return
    }

    const pai = this.procurarPai(valor)
    if (!pai) {
      throw new Error('pai de ' + valor + ' não encontrado')
    }

    if (no.direita == null) {
      if (no === this.raiz) {
        this.raiz === no.esquerda
      } else if (pai.esquerda === no) {
        pai.esquerda = no.esquerda
      } else {
        pai.direita = no.esquerda
      }
    } else if (no.esquerda === null) {
      if (no === this.raiz) {
        this.raiz === no.direita
      } else if (pai.esquerda === no) {
        pai.esquerda = no.direita
      } else {
        pai.direita = no.direita
      }
    } else {
      let temp: No = no.esquerda
      while (temp.direita != null) {
        temp = temp.direita
      }
      this.deletarPorCopia(temp.valor)
      no.valor = temp.valor
    }
  }

  deletarPorFusao(valor: number) {
    const no = this.pesquisar(valor)

    if (no == null) {
      globalThis.alert('elemento não está na árvore')
      return
    }

    if (this.raiz == null) {
      globalThis.alert('árvore está vazia')
      return
    }

    if (no == this.raiz) {
      this.raiz = null
      return
    }

    const pai = this.procurarPai(valor)
    if (!pai) {
      throw new Error('pai de ' + valor + ' não encontrado')
    }

    if (no.direita == null) {
      if (no === this.raiz) {
        this.raiz === no.esquerda
      } else if (pai.esquerda === no) {
        pai.esquerda = no.esquerda
      } else {
        pai.direita = no.esquerda
      }
    } else if (no.esquerda === null) {
      if (no === this.raiz) {
        this.raiz === no.direita
      } else if (pai.esquerda === no) {
        pai.esquerda = no.direita
      } else {
        pai.direita = no.direita
      }
    } else {
      let temp: No = no.esquerda
      while (temp.direita != null) {
        temp = temp.direita
      }
      temp.direita = no.direita

      if (this.raiz == no) {
        this.raiz = no.esquerda
      } else if (pai.esquerda == no) {
        pai.esquerda = no.esquerda
      } else {
        pai.direita = no.esquerda
      }
    }
  }

  preordem(){
    const arrayNos: number[] = []
    this.preordemRecursivo(this.raiz, arrayNos)
    return arrayNos

  }

  private preordemRecursivo(no: No | null, arrayNos: number[] = []){
    if (no != null) {
      arrayNos.push(no.valor)
      this.preordemRecursivo(no.esquerda, arrayNos)
      this.preordemRecursivo(no.direita, arrayNos)
    }
  }


  emOrdem() {
    const arrayNos: number[] = []
    this.emOrdemRecursivo(this.raiz, arrayNos)
    return arrayNos
  }

  private emOrdemRecursivo(no: No | null, arrayNos: number[] = []) {
    if (no != null) {
      this.emOrdemRecursivo(no.esquerda, arrayNos)
      arrayNos.push(no.valor)
      this.emOrdemRecursivo(no.direita, arrayNos)
    }
  }

  posOrdem() {
    const arrayNos: number[] = []
    this.posOrdemRecursivo(this.raiz, arrayNos)
    return arrayNos
  }

  posOrdemRecursivo(no: No | null, arrayNos: number[] = []) {
    if (no != null) {
      this.posOrdemRecursivo(no.esquerda, arrayNos)
      this.posOrdemRecursivo(no.direita, arrayNos)
      arrayNos.push(no.valor)
    }
  }
  
}
