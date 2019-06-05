module.exports = {
  name: 'generate:organism',
  alias: ['g:o'],
  description: 'Create new organism',
  run: async toolbox => {
    const {
      parameters,
      createComponent
    } = toolbox;

    const name = parameters.first;
    await createComponent('components/organisms', name);
  }
}
