import path from 'path'

/**
 * Get paths
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default function ({ context }) {
  return {
    inputComponents: path.join(context, 'src', 'components'),
    inputDocs: path.join(context, 'src', 'docs'),
    inputPublic: path.join(context, 'public'),
    outputAssets: path.join(context, 'public', 'assets'),
    outputBuild: path.join(context, 'dist'),
    outputStatic: path.join(context, 'static')
  }
}
