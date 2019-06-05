module.exports = {
  name: 'generate:molecule',
  alias: ['g:m'],
  description: 'Create new molecule',
  run: async toolbox => {
    const {
      parameters,
      createComponent
    } = toolbox;

    const name = parameters.first;
    await createComponent('components/molecules', name);
  }
}
