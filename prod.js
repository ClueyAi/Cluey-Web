const { exec, execSync  } = require('child_process');
const fs = require('fs-extra');

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar o comando: ${command}`);
        console.error(stderr);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

async function removeFilesAndDirectories(path) {
  try {
    await fs.remove(path);
    console.log(`Arquivos e diretórios removidos com sucesso: ${path}`);
  } catch (error) {
    console.error(`Erro ao remover arquivos e diretórios: ${path}`);
    throw error;
  }
}

const commands = [
  'npx expo export:web',
  'node bkp_public.js',
];

async function executeCommandsInSeries() {
  for (const command of commands) {
    await executeCommand(command);
  }
}

executeCommandsInSeries()
  .then(async () => {
    await removeFilesAndDirectories('public/*');
    await fs.copy('web-build', 'public');
    await fs.copy('404.html', 'public/404.html');
    console.log('Todos os comandos foram executados com sucesso.');
    console.log('Arquivos e diretórios foram copiados e removidos.');

    try {
      execSync('firebase deploy');
      console.log('Firebase deploy bem-sucedido.');
    } catch (error) {
      console.error('Erro ao executar o comando Firebase deploy:', error);
    }
  })
  .catch((error) => {
    console.error('Erro ao executar os comandos:', error);
  });
