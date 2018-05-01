import 'es6-promise' // Test code splitting
import './components'

// Import custom colors
if (process.env.PANGOLIN_ENV === 'dev' || process.env.PANGOLIN_ENV === 'build:dev') {
  require('../config/branding.scss')
}
