module.exports = (toolbox) => {
  const {
    system, 
    print: { success, error } 
  } = toolbox;

  async function createComponent(folder, name) {

    // Exit process if no name
    if (!name) {
      error('Name must be specified');
      return;
    }

    // Create routing with its page
    const routing = folder.includes('pages') ? '--routing=true' : '';

    // Execute Angular CLI commands to generate files
    const generated = await system.run(`ng g m ${folder}/${name} ${routing} && ng g c ${folder}/${name}`);

    // Generate Angular CLI logs
    console.log(generated);
    
    success(`Generated ${folder}/${name}`);
  }

  toolbox.createComponent = createComponent;
} 