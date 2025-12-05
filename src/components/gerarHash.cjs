const crypto = require("crypto");

const ts = Date.now(); // Timestamp fixo para testar
const publicKey = "e907b9af041b536a1c92305fe823e5b5"; // Substitua pela sua chave pública
const privateKey = "4a1702cf25820353824485807689b59fb8512d8a"; // Substitua pela sua chave privada

const hash = crypto.createHash("md5").update(ts + privateKey + publicKey).digest("hex");

console.log("Hash gerada:", hash);
