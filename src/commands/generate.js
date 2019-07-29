const { prompt } = require('enquirer');

module.exports = {
  name: 'generate',
  alias: ['g:a'],
  description: 'Create new',
  run: async toolbox => {
    const {
      template,
      strings,
      patching,
      filesystem,
      print: { success, error}
    } = toolbox;

    // // Exit process if no name
    // if (!parameters.first) {
    //   error('Name must be specified');
    //   return;
    // }

    // type of component
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

    const askName = { type: 'input', name: 'name', message: 'What is the name? eg: my-component ' }

    // ask a series of questions
    const questions = [askType, askName]
    const { type, name } = await prompt(questions);

    console.log('type', type);
    console.log('name', name);

    if (!type) {
      error('Type must be specified.');
      return;
    }

    if (!name) {
      error('Name must be specified.');
      return;
    }

    const folderName = strings.kebabCase(name);
    const fileName = `${folderName}`;
    const componentName = strings.pascalCase(name);
    const folder = `src/components/${type}/${folderName}/`;

    /**
     * Verify if component exists
     */
    const componentExists = filesystem.exists(folder);
    if( componentExists ) {
      error(`ERROR: Component already exists.`);
      return;
    }

    /**
     * Generate component controller
     */ 
    await template.generate({
      template: 'component.ts.ejs',
      target: `${folder}${fileName}.component.ts`,
      props: { componentName, fileName },
    });
    success(`Generate ${folder}${fileName}.component.ts`);

    /**
     * Generate component test
     */
    await template.generate({
      template: 'component.spec.ts.ejs',
      target: `${folder}${fileName}.component.spec.ts`,
      props: { componentName, fileName },
    });
    success(`Generate ${folder}${fileName}.component.spec.ts`);

    /**
     * Generate component tempalte
     */
    await template.generate({
      template: 'component.html.ejs',
      target: `${folder}${fileName}.component.html`,
      props: { name },
    });
    success(`Generate ${folder}${fileName}.component.html`);
    
    /**
     * Generate component style
     */
    await template.generate({
      template: 'component.scss',
      target: `${folder}${fileName}.component.scss`,
    });
    success(`Generate ${folder}${fileName}.component.scss`);

    /**
     * Generate module if its not an 'atom'
     */
    if( type !== 'atoms' ) {

      const isPage = type === 'pages';

      await template.generate({
        template: 'module.ts.ejs',
        target: `${folder}${fileName}.module.ts`,
        props: { 
          componentName, 
          fileName,
          isPage
        },
      });
      success(`Generate ${folder}${fileName}.module.ts`);

      // Generate routing file if component its a Page
      if( isPage ) {
        await template.generate({
          template: 'routing.ts.ejs',
          target: `${folder}${fileName}-routing.module.ts`,
          props: { componentName },
        });
        success(`Generate ${folder}${fileName}-routing.module.ts`);
      }
    }
    
    // await patching.patch('src/components/atoms/atoms.module.ts', {
    //   insert: `${name}Component, `, after: 'declarations: ['
    // });
    
    // await patching.patch('src/components/atoms/atoms.module.ts', {
    //   insert: `\nimport { ${name}Component } from './${fileName}';`, after: `import { CommonModule } from '@angular/common';`,
    // });
  }
}
