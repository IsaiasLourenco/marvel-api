import axios from "axios";
import md5 from "blueimp-md5";

export default async function handler(req, res) {
  try {
    const ts = Date.now();
    const publicKey = process.env.MARVEL_PUBLIC_KEY;
    const privateKey = process.env.MARVEL_PRIVATE_KEY;
    const hash = md5(`${ts}${privateKey}${publicKey}`);

    const response = await axios.get("https://gateway.marvel.com/v1/public/characters", {
      params: {
        limit: 10,
        offset: req.query.offset || 0,
        apikey: publicKey,
        ts,
        hash,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar personagens" });
  }
}