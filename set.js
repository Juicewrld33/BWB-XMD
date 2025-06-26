
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEdDYThBTGV2L0l6TDFWSitBeWl6bWlMd0dhdzhvaVpyTnBtbU9VaEVYRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWjU3OW9TTG5Lcm9nZmNCcGJBM0Urc0dORW5vNTRZSm10RTRseUg1T21Sdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5RVY2UEtDZ2tHSjg5N1pXRmNBU05yZ3VQNXlnOFV4YnJBZVhJN3J3eldNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxMnh0Um8zWFV1dkFrOFJYcDlFeWRCeEFPYnJlYld4bWtlL0VCSmdtNTBnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlKTXFobVBrUlh2ek1rMFlJWnFqajVxeHc3RmNzUEkwMUprSlh2TWhwSE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklwOFM4aURheGlzM1BCd0RDYWppZFZtdXFidE0xUGx3WG0xYzIvRzQybmM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0FnSWZjSFA1WEhybGNWWWQ4VnNZTHVvRFhiR0NRanB0ckdVTWgyWUpGTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicmxYMU1ETy9FTkJ6ZHhNVlJQMmtiSWlDd0lDeDUyNjlXcXVyS1cwSVZBbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJxb1VQVGpLS1A0L1FPMFluZlFBVnFKME94QmQ5U0ZuL1JiaGx1SVRNQWthZy9abmcyaXY1aUt1NmxUTWJVOWJJb3drZnNlTU1IVVljeExlajQzcmdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAyLCJhZHZTZWNyZXRLZXkiOiJZWk5jZUdiZm0yZnhleElBYUNBbnUzbEJNZC9xVmRCanc5T3BrcVFtZ0xFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxMzgxNTIwODVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMTY0NTA5RDU2MTk4OUIxQUEzNENCQTM0MjM0QjBCNzUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDkyMTU4MX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODEzODE1MjA4NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3OUJCMEI0QjQ3OUU4NEFFRkUyMDNDREI0MEYxOEJEQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwOTIxNTgzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJWRlM2WlFQUCIsIm1lIjp7ImlkIjoiMjM0ODEzODE1MjA4NTozNkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNUiBXSUxMSUFNUyBQSElMTElQIiwibGlkIjoiMjAxNzEzNzkzMzg0Njk2OjM2QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS1RIZ3FjRUVNL2k4OElHR0FrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZGNIVnVsN2tHd0JPL2JxZmdtaGw2OThQczFvb3RPekxlcnJKRkRWQWNCUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSEVIYm02N1QzejBGWERRbzZlRWRUY3pyR2hhOXFMc2NZZWxiTjQ1T2VaWWF1bG81cEhHek1tc0FBK05ZQS9YbDRZYjBCUG5OVXprRFBBV3YrVmI5Qnc9PSIsImRldmljZVNpZ25hdHVyZSI6IllreXlDdmtIN1BkTUJxeiszS1JlcFE4dlc4VmRHOUhpUU1uTnoyUTMrQ2pRb2crUzloVWZnSkV0RmtYa0EycC9KV2ZOTFFTZ1lvU0cvR1ZYWXBXcGh3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODEzODE1MjA4NTozNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYWEIxYnBlNUJzQVR2MjZuNEpvWmV2ZkQ3TmFLTFRzeTNxNnlSUTFRSEFVIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTA5MjE1NjUsImxhc3RQcm9wSGFzaCI6IjJHNEFtdSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQS9YIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "princetech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255614545735",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BWB-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/ygvlzy.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
