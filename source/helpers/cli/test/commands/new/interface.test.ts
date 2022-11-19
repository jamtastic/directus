import {expect, test} from '@oclif/test'

describe('new:interface', () => {
  test
  .stdout()
  .command(['new:interface'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['new:interface', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
