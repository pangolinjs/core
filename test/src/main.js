// Import JavaScript
import 'es6-promise' // Test code splitting
import './components'

// Import CSS
import './main.scss'

// Import Frond End Styleguide branding
if (process.env.PANGOLIN_ENV === 'dev' || process.env.PANGOLIN_ENV === 'build:dev') {
  require('../config/branding.scss')
}
