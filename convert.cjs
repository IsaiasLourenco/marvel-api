const fs = require("fs");

const raw = JSON.parse(fs.readFileSync("./data/characters.json", "utf-8"));
const data = Array.isArray(raw) ? raw : raw.characters;

const updated = data.map((item) => {
  // Se só tiver thumbnail, cria image igual
  if (item.thumbnail && !item.image) {
    item.image = item.thumbnail;
  }

  // Se só tiver image, cria thumbnail igual
  if (item.image && !item.thumbnail) {
    item.thumbnail = item.image;
  }

  // Se nenhum dos dois existir, coloca placeholder
  if (!item.thumbnail && !item.image) {
    item.thumbnail = "/images/placeholder-small.png";
    item.image = "/images/placeholder.png";
  }

  return item;
});

const output = Array.isArray(raw) ? updated : { characters: updated };
fs.writeFileSync("./data/characters.json", JSON.stringify(output, null, 2));

console.log("Todos os personagens agora têm 'thumbnail' e 'image'.");