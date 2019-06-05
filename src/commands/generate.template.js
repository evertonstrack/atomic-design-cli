module.exports = {
  name: 'generate:template',
  alias: ['g:t'],
  description: 'Create new template',
  run: async toolbox => {
    const {
      parameters,
      createComponent
    } = toolbox;

    const name = parameters.first;
    await createComponent('components/templates', name);
  }
}
