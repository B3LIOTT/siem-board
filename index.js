const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');


app.commandLine.appendSwitch('ignore-certificate-errors');
app.disableHardwareAcceleration();


let config = { thehive: "", wazuh: "", proxmox: "", n8n: "" };

try {
    const configPath = path.join(__dirname, 'config.json');
    const data = fs.readFileSync(configPath, 'utf-8');
    config = JSON.parse(data);
} catch (error) {
    console.error('Erreur de lecture du fichier config.json:', error);
}

app.whenReady().then(() => {

    const templatePath = path.join(__dirname, 'index_template.html');
    let templateHtml = fs.readFileSync(templatePath, 'utf-8');

    templateHtml = templateHtml
        .replace("{{thehive}}", config.thehive)
        .replace("{{wazuh}}", config.wazuh)
        .replace("{{proxmox}}", config.proxmox)
        .replace("{{n8n}}", config.n8n);;

    fs.writeFileSync(path.join(__dirname, 'index.html'), templateHtml);

    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            contextIsolation: true
        }
    });     

    win.loadFile('index.html');
});
