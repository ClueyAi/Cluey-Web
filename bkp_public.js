const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;

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
