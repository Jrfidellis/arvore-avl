import { assertEquals } from 'https://deno.land/std/assert/mod.ts'
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
      assertEquals(arvore.raiz?.valor, 10)
      assertEquals(arvore.raiz?.esquerda?.valor, 5)
      assertEquals(arvore.raiz?.direita?.valor, 15)
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
})
