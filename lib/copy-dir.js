import fs from 'fs/promises'
import path from 'path'

/**
 * Copy directory (similar to `cp -r`)
 * @param {string} source Source path
 * @param {string} destination Destination path
 */
export default async function copyDir (source, destination) {
  const files = await fs.readdir(source)

  for (const file of files) {
    const filePath = path.join(source, file)
    const fileDest = path.join(destination, file)
    const fileStats = await fs.lstat(filePath)

    if (fileStats.isDirectory()) {
      await fs.mkdir(fileDest, { recursive: true })
      await copyDir(filePath, fileDest)
    } else {
      await fs.copyFile(filePath, fileDest)
    }
  }
}
