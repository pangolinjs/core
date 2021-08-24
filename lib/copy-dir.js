import fs from 'fs/promises'
import path from 'path'

/**
 * Copy directory (similar to `cp -r`)
 * @param {string} source Source path
 * @param {string} destination Destination path
 */
export default async function copyDir (source, destination) {
  try {
    await fs.access(destination)
  } catch {
    await fs.mkdir(destination, { recursive: true })
  }

  const files = await fs.readdir(source)

  for (const file of files) {
    const filePath = path.join(source, file)
    const fileDest = path.join(destination, file)
    const fileStats = await fs.lstat(filePath)

    if (fileStats.isDirectory()) {
      await copyDir(filePath, fileDest)
    } else {
      await fs.copyFile(filePath, fileDest)
    }
  }
}
