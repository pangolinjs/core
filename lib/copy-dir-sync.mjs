import fs from 'fs'
import path from 'path'

/**
 * Copy directory (similar to `cp -r`)
 * @param {string} source Source path
 * @param {string} destination Destination path
 */
export default function copyDirSync (source, destination) {
  fs.readdirSync(source).forEach(file => {
    const filePath = path.join(source, file)
    const fileDest = path.join(destination, file)

    const fileStats = fs.lstatSync(filePath)

    if (fileStats.isDirectory()) {
      fs.mkdirSync(fileDest, { recursive: true })
      copyDirSync(filePath, fileDest)
    } else {
      fs.copyFileSync(filePath, fileDest)
    }
  })
}
