import fs from "fs";

// lê o arquivo original
const raw = JSON.parse(fs.readFileSync("./data/characters.json", "utf-8"));

// se tiver chave "characters", pega ela; senão assume que é array direto
const data = Array.isArray(raw) ? raw : raw.characters;

// aplica padronização
const normalized = data.map((item) => {
  return {
    ...item,
    Character: item.Character
      .toLowerCase()        // tudo minúsculo
      .replace(/\s+/g, "-") // troca espaços por hífen
  };
});

// mantém a estrutura original (com ou sem chave "characters")
const output = Array.isArray(raw) ? normalized : { characters: normalized };

// salva de volta
fs.writeFileSync("./data/characters.json", JSON.stringify(output, null, 2));

console.log("Arquivo normalizado com sucesso!");