// Import JavaScript
import 'es6-promise' // Test code splitting
import './components'

// Import CSS
import './main.scss'

// Import Frond End Styleguide branding
if (process.env.NODE_ENV === 'development') {
  require('../config/branding.scss')
}
