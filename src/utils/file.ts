import fs from "fs"

export const deleteFile = async(filename: string) => {
  //.stat verifica se existe um arquivo com a url passada
  try {
    await fs.promises.stat(filename);
  } catch {
    return;
  }  
  //.unlink remove o arquivo se ele existir
  await fs.promises.unlink(filename)
}