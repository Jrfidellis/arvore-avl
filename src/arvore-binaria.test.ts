import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import { ArvoreBinaria } from './arvore-binaria.ts'

Deno.test('ArvoreBinaria', async (t) => {
  await t.step('deve inserir primeiro nó na raiz', () => {
    const arvore = new ArvoreBinaria()
    arvore.inserir(10)
    assertEquals(arvore.raiz?.valor, 10)
  })

  await t.step(
    'deve inserir menores valores na esquerda e maiores na direita',
    () => {
      const arvore = new ArvoreBinaria()
      arvore.inserir(10)
      arvore.inserir(5)
      arvore.inserir(15)
      arvore.inserir(12)
      arvore.inserir(1)
      assertEquals(arvore.raiz?.valor, 10)
      assertEquals(arvore.raiz?.esquerda?.valor, 5)
      assertEquals(arvore.raiz?.direita?.valor, 15)
      assertEquals(arvore.raiz?.direita?.esquerda?.valor, 12)
      assertEquals(arvore.raiz?.esquerda?.esquerda?.valor, 1)
    }
  )

  await t.step('deve calcular fator de balanceamento corretamente', () => {
    const arvore = new ArvoreBinaria()
    arvore.inserir(10)
    arvore.inserir(5)
    arvore.inserir(15)
    arvore.inserir(3)
    assertEquals(arvore.calculaFatorDeBalanceamento(arvore.raiz!), 1)
  })

  await t.step('deve pesquisar valor existente na árvore', () => {
    const arvore = new ArvoreBinaria()
    arvore.inserir(10)
    arvore.inserir(5)
    arvore.inserir(15)
    const no = arvore.pesquisar(5)
    assertEquals(no?.valor, 5)
  })

  await t.step('deve retornar null ao pesquisar valor inexistente', () => {
    const arvore = new ArvoreBinaria()
    arvore.inserir(10)
    const no = arvore.pesquisar(20)
    assertEquals(no, null)
  })

  await t.step('deve deletar nó por fusão', () => {
    const arvore = new ArvoreBinaria()
    arvore.inserir(10)
    arvore.inserir(5)
    arvore.inserir(15)
    arvore.deletarPorFusao(5)
    assertEquals(arvore.pesquisar(5), null)
  })

  await t.step('deve deletar nó por cópia', () => {
    const arvore = new ArvoreBinaria()
    arvore.inserir(10)
    arvore.inserir(5)
    arvore.inserir(15)
    arvore.deletarPorCopia(5)
    assertEquals(arvore.pesquisar(5), null)
  })

  await t.step('deve encontrar pai de um nó', () => {
    const arvore = new ArvoreBinaria()
    arvore.inserir(10)
    arvore.inserir(5)
    arvore.inserir(15)
    const pai = arvore.procurarPai(5)
    assertEquals(pai?.valor, 10)
  })

  await t.step('deve retornar null ao procurar pai da raiz', () => {
    const arvore = new ArvoreBinaria()
    arvore.inserir(10)
    const pai = arvore.procurarPai(10)
    assertEquals(pai, null)
  })

  await t.step(
    'deve balancear automaticamente a árvore após inserção - rotação à direita',
    () => {
      const arvore = new ArvoreBinaria()
      arvore.inserir(10)
      arvore.inserir(5)
      arvore.inserir(3)
      assertEquals(arvore.raiz?.valor, 5)
      assertEquals(arvore.raiz?.direita?.valor, 10)
    }
  )

  await t.step(
    'deve balancear automaticamente a árvore após inserção - rotação à esquerda',
    () => {
      const arvore = new ArvoreBinaria()
      arvore.inserir(10)
      arvore.inserir(15)
      arvore.inserir(20)
      assertEquals(arvore.raiz?.valor, 15)
      assertEquals(arvore.raiz?.esquerda?.valor, 10)
    }
  )

  await t.step(
    'deve balancear automaticamente a árvore após inserção - rotação dupla à direita',
    () => {
      const arvore = new ArvoreBinaria()
      arvore.inserir(10)
      arvore.inserir(5)
      arvore.inserir(7)
      assertEquals(arvore.raiz?.valor, 7)
      assertEquals(arvore.raiz?.esquerda?.valor, 5)
      assertEquals(arvore.raiz?.direita?.valor, 10)
    }
  )

  await t.step(
    'deve balancear automaticamente a árvore após inserção - rotação dupla à esquerda',
    () => {
      const arvore = new ArvoreBinaria()
      arvore.inserir(10)
      arvore.inserir(15)
      arvore.inserir(12)
      assertEquals(arvore.raiz?.valor, 12)
      assertEquals(arvore.raiz?.esquerda?.valor, 10)
      assertEquals(arvore.raiz?.direita?.valor, 15)
    }
  )
  
  await t.step(
    'deve percorrer a árvore pelo caminhamento Pré-ordem', 
    () => {
      const arvore = new ArvoreBinaria()
      arvore.inserir(10)
      arvore.inserir(5)
      arvore.inserir(15)
      const resultado = arvore.preordem()
      assertEquals(resultado, [10, 5, 15])
  })

  await t.step(
    'deve percorrer a árvore pelo caminhamento Em ordem', 
    () => {
      const arvore = new ArvoreBinaria()
      arvore.inserir(10)
      arvore.inserir(5)
      arvore.inserir(15)
      const resultado = arvore.emOrdem()
      assertEquals(resultado, [5, 10, 15])
  })

  await t.step(
    'deve percorrer a árvore pelo caminhamento Pós-ordem', 
    () => {
      const arvore = new ArvoreBinaria()
      arvore.inserir(10)
      arvore.inserir(5)
      arvore.inserir(15)
      const resultado = arvore.posOrdem()
      assertEquals(resultado, [5, 15, 10])
  })
  
})
