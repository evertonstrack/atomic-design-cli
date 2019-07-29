const { prompt } = require('enquirer');

module.exports = {
  name: 'generate',
  alias: ['g:a'],
  description: 'Create new',
  run: async toolbox => {
    const {
      createComponent,
      print: { success, error}
    } = toolbox;


    /**
     * Question type of component
     */
    const askType = {
      type: 'select',
      name: 'type',
      message: 'What kind of component do you want?',
      choices: [
        { name: 'atoms', message: 'atom'},
        { name: 'molecules', message: 'molecule'},
        { name: 'organisms', message: 'organism'},
        { name: 'templates', message: 'template'},
        { name: 'pages', message: 'page'},
      ],
      autofocus: 'atoms'
    }

    /**
     * Question name of component
     */
    const askName = { 
      type: 'input', 
      name: 'name', 
      message: 'What is the name? eg: my-component'
    }

    /**
     * Ask a series of questions
     */
    const questions = [askType, askName]
    const { type, name } = await prompt(questions);

    /**
     * Validate if type its selected
     */
    if (!type) {
      error('Type must be specified.');
      return;
    }

    /**
     * Validate if name its already filled
     */
    if (!name) {
      error('Name must be specified.');
      return;
    }

    /**
     * Create component files
     */
    await createComponent(type, name);

    success('DONE!');
  }
}
