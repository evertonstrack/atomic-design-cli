module.exports = {
  name: 'generate:page',
  alias: ['g:p'],
  description: 'Create new page',
  run: async toolbox => {
    const {
      parameters,
      createComponent
    } = toolbox;

    const name = parameters.first;
    await createComponent('components/pages', name);
  }
}
