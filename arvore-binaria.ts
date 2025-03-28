class No {
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

  mostrarAlturas() {
    this.nos.forEach((no) => {
      console.log(this.calculaFatorDeBalanceamento(no))
    })
  }

  inserir(valor: number) {
    if (this.pesquisar(valor)) {
      console.log(valor, 'já existe na árvore')
      return
    }

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
    } else {
      if (noAtual.direita === null) {
        noAtual.direita = novoNo
        this.nos.push(novoNo)
      } else {
        this.inserirRecursivo(noAtual.direita, valor)
      }
    }

    const fatorDeBalanceamento = this.calculaFatorDeBalanceamento(noAtual)
    if (fatorDeBalanceamento > 1 || fatorDeBalanceamento < -1) {
      console.log(noAtual.valor + ' desbalanceado', fatorDeBalanceamento)
      //this.balancearArvore()
    }
  }

  balancearArvore() {
    this.nos.sort()
    const posNovaRaiz = Math.floor(this.nos.length / 2)
    const novaRaiz = this.nos[posNovaRaiz]
    this.inserir(novaRaiz.valor)
    // TO-DO: finalizar
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
      console.log('elemento não está na árvore')
      return
    }

    if (this.raiz == null) {
      console.log('árvore está vazia')
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
      console.log('elemento não está na árvore')
      return
    }

    if (this.raiz == null) {
      console.log('árvore está vazia')
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
}
