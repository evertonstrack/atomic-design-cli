module.exports = {
  name: 'generate:atom',
  alias: ['g:a'],
  description: 'Create new atom',
  run: async toolbox => {
    const {
      parameters,
      createComponent
    } = toolbox;

    const name = parameters.first;
    await createComponent('components/atoms', name);
  }
}
