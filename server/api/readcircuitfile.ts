//TODO: client side only
import fs from "fs/promises";

import { readdirSync } from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const { filename } = await readBody(event);

  try {
    const projectRoot = process.cwd();
    console.log(projectRoot);
    const filePath = path.join(projectRoot, "circuits", filename);
    const data = await fs.readFile(filePath, "utf-8");
    return data;
    //res.status(200).send(data);
  } catch (error) {
    //res.status(500).send({ error: "Error reading file" });
  }
});
