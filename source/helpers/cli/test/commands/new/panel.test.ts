import {expect, test} from '@oclif/test'

describe('new:panel', () => {
  test
  .stdout()
  .command(['new:panel'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['new:panel', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
