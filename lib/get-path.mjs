import path from 'path'

/**
 * Get path
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default function ({ context }) {
  return {
    assets: path.join(context, 'public', 'assets'),
    build: path.join(context, 'dist'),
    components: path.join(context, 'src', 'components'),
    docs: path.join(context, 'src', 'docs'),
    public: path.join(context, 'public'),
    static: path.join(context, 'static')
  }
}
