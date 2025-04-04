import { ArvoreBinaria, No } from './arvore-binaria.ts'

let listaDeVisita: No[] = []
function visitar(no: No | null) {
  if (no != null) {
    listaDeVisita.push(no)
  }
}

function piscar(no: No) {
  return new Promise((resolve) => {
    const div = document.getElementById(no.valor.toString())
    div?.style.setProperty('background-color', 'red')
    setTimeout(() => {
      div?.style.setProperty('background-color', '#4caf50')
      resolve(true)
    }, 500)
  })
}

let arvore = new ArvoreBinaria(visitar)

async function atualizarInterface(mostrarPiscadas: boolean = false) {
  const div = document.getElementById('main')
  // representar a arvore em HTML, cada nível é um UL e cada Nó um LI
  if (div) {
    div.innerHTML = ''
    const ul = document.createElement('ul')
    div.appendChild(ul)

    const li = document.createElement('li')
    if (!arvore.raiz) {
      li.innerHTML = `<div class="no">Árvore vazia</div>`
    } else {
      li.innerHTML = `<div id="${arvore.raiz?.valor}" class="no">${arvore.raiz?.valor}</div>`
    }
    ul.appendChild(li)

    representarNos(arvore.raiz, li)
  }

  if (mostrarPiscadas) {
    for (const no of listaDeVisita) {
      await piscar(no)
    }
  }

  listaDeVisita = []
}

function representarNos(no: No | null, pai: HTMLLIElement, level = 0) {
  if (no == null) {
    return
  }
  const ul = document.createElement('ul')

  pai.appendChild(ul)

  if (no.esquerda != null) {
    const liEsquerda = document.createElement('li')
    liEsquerda.innerHTML = `<div id="${no.esquerda?.valor}" class="no">${
      no.esquerda?.valor ?? ''
    }</div>`
    ul.appendChild(liEsquerda)
    representarNos(no.esquerda, liEsquerda, level + 1)
  } else {
    const liEsquerda = document.createElement('li')
    liEsquerda.innerHTML = `<span></span>`
    ul.appendChild(liEsquerda)
  }

  if (no.direita != null) {
    const liDireita = document.createElement('li')
    liDireita.innerHTML = `<div id="${no.direita?.valor}" class="no">${
      no.direita?.valor ?? ''
    }</div>`
    ul.appendChild(liDireita)
    representarNos(no.direita, liDireita, level + 1)
  } else {
    const liDireita = document.createElement('li')
    liDireita.innerHTML = `<span></span>`
    ul.appendChild(liDireita)
  }
}

globalThis.inserir = function (valor: number) {
  arvore.inserir(valor)
  atualizarInterface()
}

globalThis.pesquisar = function (valor: number) {
  const no = arvore.pesquisar(valor)
  if (!no) {
    alert('Valor não encontrado')
    return
  }
  alert(
    'Fator de balanceamento do nó é ' + arvore.calculaFatorDeBalanceamento(no)
  )
  atualizarInterface(true)
}

globalThis.preOrdem = function () {
  globalThis.alert(arvore.preordem())
}

globalThis.posOrdem = function () {
  globalThis.alert(arvore.posOrdem())
}

globalThis.emOrdem = function () {
  globalThis.alert(arvore.emOrdem())
}

globalThis.deletarPorCopia = function (valor: number) {
  arvore.deletarPorCopia(valor)
  atualizarInterface()
}

globalThis.limpar = function () {
  arvore = new ArvoreBinaria(visitar)
  atualizarInterface()
}

atualizarInterface()
