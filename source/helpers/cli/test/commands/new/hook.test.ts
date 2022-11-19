import {expect, test} from '@oclif/test'

describe('new:hook', () => {
  test
  .stdout()
  .command(['new:hook'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['new:hook', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
