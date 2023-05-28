const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;

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

// Copia todos os arquivos e pastas da pasta "public" para a pasta com o timestamp atual
const publicFolderPath = 'public';
ncp(publicFolderPath, timestampFolderPath, (error) => {
  if (error) {
    console.error('Erro ao copiar os arquivos:', error);
  } else {
    console.log(`Backup criado em ${timestampFolderPath}`);
  }
});
