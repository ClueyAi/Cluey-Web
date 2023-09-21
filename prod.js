const { exec, execSync  } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const ncp = require('ncp').ncp;

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error when executing the command: ${command}`);
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
    console.log(`Files and Directories successfully removed: ${path}`);
  } catch (error) {
    console.error(`Error removing files and directories: ${path}`);
    throw error;
  }
}

const commands = [
  'npx expo export:web',
];

async function executeCommandsInSeries() {
  for (const command of commands) {
    await executeCommand(command);
  }
}

const backupFolderPath = '.public_bkp';

if (!fs.existsSync(backupFolderPath)) {
  fs.mkdirSync(backupFolderPath);
}

const now = new Date();
const timestampFolderName = `backup_${now.getTime()}`;
const timestampFolderPath = path.join(backupFolderPath, timestampFolderName);
fs.mkdirSync(timestampFolderPath);

const publicFolderPath = 'public';
ncp(publicFolderPath, timestampFolderPath, (error) => {
  if (error) {
    console.error('Error to copy file:', error);
  } else {
    console.log(`Backup created on ${timestampFolderPath}`);
  }
});


executeCommandsInSeries()
  .then(async () => {
    await removeFilesAndDirectories('public/*');
    await fs.copy('web-build', 'public');
    await fs.copy('404.html', 'public/404.html');
    console.log('All commands were successfully executed.');
    console.log('Files and directories were copied and removed.');

    try {
      execSync('firebase deploy');
      console.log('Successful Deploy Firebase.');
    } catch (error) {
      console.error('Error running the deploy firebase command:', error);
    }
  })
  .catch((error) => {
    console.error('Error when executing the commands:', error);
  });
