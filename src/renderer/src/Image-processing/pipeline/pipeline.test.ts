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
    // repete exatamente a string recebida, sem espaços adicionais
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

  // 2) Teste removeStep
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
    .addStep(s1, { foo: 1 }) // -> "Z [Step1: foo=1]"
    .addStep(s2, { name: 'X', age: 9 }) // -> "Z [Step1: foo=1] [Step2: name=X, age=9]"
    .removeStep(1) // remove o Step2
    .addStep(s3, { repeat: 2 }) // repete a saída de Step1 duas vezes

  const out7 = p2.run('Z')
  // Step1 produz "Z [Step1: foo=1]", Step3 repete sem espaço:
  // "Z [Step1: foo=1]" + "Z [Step1: foo=1]"
  assertEquals(out7, 'Z [Step1: foo=1]Z [Step1: foo=1]', 'chaining mix')

  console.log('--- Tests finished ---')
}
