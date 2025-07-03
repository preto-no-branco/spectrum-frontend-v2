import { Pipeline } from '.'
import { PipelineStep } from '../interfaces/pipeline'

// --- mocks de steps para teste ---
class Step1 implements PipelineStep<string, { foo: number }> {
  apply(input: string, args: { foo: number }): string {
    return input + ` [Step1: foo=${args.foo}]`
  }
}

class Step2 implements PipelineStep<string, { name: string; age: number }> {
  apply(input: string, args: { name: string; age: number }): string {
    return input + ` [Step2: name=${args.name}, age=${args.age}]`
  }
}

class Step3 implements PipelineStep<string, { repeat: number }> {
  apply(input: string, args: { repeat: number }): string {
    return input.repeat(args.repeat)
  }
}

// --- utilitário simples de asserção ---
function assertEquals<T>(actual: T, expected: T, testName: string) {
  const pass = actual === expected
  console.log(`${pass ? '✅ PASS' : '❌ FAIL'} ${testName}`)
  if (!pass) {
    console.log(`    expected: ${expected}`)
    console.log(`    actual:   ${actual}`)
  }
}

function assertArrayLength<T>(arr: T[], expectedLen: number, testName: string) {
  const pass = arr.length === expectedLen
  console.log(`${pass ? '✅ PASS' : '❌ FAIL'} ${testName}`)
  if (!pass) {
    console.log(`    expected length: ${expectedLen}`)
    console.log(`    actual length:   ${arr.length}`)
  }
}

function assertTrue(value: boolean, testName: string) {
  console.log(`${value ? '✅ PASS' : '❌ FAIL'} ${testName}`)
  if (!value) console.log(`    expected true but got false`)
}

function assertFalse(value: boolean, testName: string) {
  console.log(`${!value ? '✅ PASS' : '❌ FAIL'} ${testName}`)
  if (value) console.log(`    expected false but got true`)
}

// --- testes ---
export function runTests() {
  console.log('--- Pipeline Tests ---')

  const s1 = new Step1()
  const s2 = new Step2()
  const s3 = new Step3()

  // 1) Teste básico de addStep + run
  const p1 = new Pipeline<string>().addStep(s1, { foo: 10 }).addStep(s2, { name: 'Bob', age: 30 })
  const out1 = p1.run('Hi')
  assertEquals(out1, 'Hi [Step1: foo=10] [Step2: name=Bob, age=30]', 'addStep + run')

  // 2) Test removeStep
  p1.removeStep(0) // remove Step1
  const out2 = p1.run('Hi')
  assertEquals(out2, 'Hi [Step2: name=Bob, age=30]', 'removeStep(0)')

  // 3) Test removeStep índice inválido (não deve alterar)
  p1.removeStep(99)
  const out3 = p1.run('Hi')
  assertEquals(out3, 'Hi [Step2: name=Bob, age=30]', 'removeStep(invalid)')

  // 4) Test clear()
  p1.clear()
  assertArrayLength(p1.getSteps(), 0, 'clear() deixa steps vazio')

  // 5) Test run em pipeline vazia
  const out5 = p1.run('Hey')
  assertEquals(out5, 'Hey', 'run em pipeline vazia')

  // 6) Test reuso depois de clear
  p1.addStep(s3, { repeat: 3 })
  const out6 = p1.run('A')
  assertEquals(out6, 'AAA', 'addStep após clear + run')

  // 7) Test chaining completo
  const p2 = new Pipeline<string>()
    .addStep(s1, { foo: 1 })
    .addStep(s2, { name: 'X', age: 9 })
    .removeStep(1)
    .addStep(s3, { repeat: 2 })
  const out7 = p2.run('Z')
  assertEquals(out7, 'Z [Step1: foo=1]Z [Step1: foo=1]', 'chaining mix')

  // 8) Test updateStepIfExists sucesso
  const p3 = new Pipeline<string>().addStep(s1, { foo: 5 })
  const updated = p3.updateStepIfExists((step) => step instanceof Step1, { foo: 99 })
  assertTrue(updated, 'updateStepIfExists retorna true quando encontra passo')
  const out8 = p3.run('X')
  assertEquals(out8, 'X [Step1: foo=99]', 'updateStepIfExists atualiza args do step existente')

  // 9) Test updateStepIfExists falha
  const failed = p3.updateStepIfExists((step) => step instanceof Step2, { name: 'Jane', age: 20 })
  assertFalse(failed, 'updateStepIfExists retorna false quando não encontra passo')

  // 10) Verifica que não duplicou o passo ao atualizar
  assertArrayLength(p3.getSteps(), 1, 'updateStepIfExists não altera quantidade de steps')

  console.log('--- Tests finished ---')
}
