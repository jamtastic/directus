import {expect, test} from '@oclif/test'

describe('new:endpoint', () => {
  test
  .stdout()
  .command(['new:endpoint'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['new:endpoint', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
