const fs = require('fs');
const path = require('path');

const backupFolderPath = 'public_bkp';

// Cria a pasta de backup se ela não existir
if (!fs.existsSync(backupFolderPath)) {
  fs.mkdirSync(backupFolderPath);
}

// Cria uma pasta com o timestamp atual dentro da pasta de backup
const now = new Date();
const timestampFolderName = `backup_${now.getTime()}`;
const timestampFolderPath = path.join(backupFolderPath, timestampFolderName);
fs.mkdirSync(timestampFolderPath);

// Copia os arquivos da pasta "public" para a pasta com o timestamp atual
const publicFolderPath = 'public';
const files = fs.readdirSync(publicFolderPath);
files.forEach((file) => {
  const sourcePath = path.join(publicFolderPath, file);
  const targetPath = path.join(timestampFolderPath, file);
  fs.copyFileSync(sourcePath, targetPath);
});

console.log(`Backup criado em ${timestampFolderPath}`);
