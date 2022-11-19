import {expect, test} from '@oclif/test'

describe('new:layout', () => {
  test
  .stdout()
  .command(['new:layout'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['new:layout', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
