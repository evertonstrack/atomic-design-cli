module.exports = (toolbox) => {
  const {
    template,
    strings,
    patching,
    filesystem,
    print: { success, error } 
  } = toolbox;

  async function createComponent(type, name) {

    /**
     * kebabCase: Format file name for 'componenet-name' format 
     * pascalCase: Format file name for 'ComponentName' format 
     */
    const fileName = strings.kebabCase(name);
    const componentName = strings.pascalCase(name);
    const folder = `src/components/${type}/${fileName}/`;

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


    /**
     * TODO: Check if atoms.module.ts already exists
     * IF exists: patch file if a new atom component
     * ELSE: Create a new module;
     */
    
    // await patching.patch('src/components/atoms/atoms.module.ts', {
    //   insert: `${name}Component, `, after: 'declarations: ['
    // });
    
    // await patching.patch('src/components/atoms/atoms.module.ts', {
    //   insert: `\nimport { ${name}Component } from './${fileName}';`, after: `import { CommonModule } from '@angular/common';`,
    // });

  }

  toolbox.createComponent = createComponent;
} 