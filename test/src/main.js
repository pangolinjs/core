// Import JavaScript
import 'es6-promise' // Test code splitting
import './components'

// Import CSS
import './main.scss'

// Import Frond End Styleguide JavaScript and CSS
if (process.env.NODE_ENV === 'development') {
  require(`fesg/js/scripts`)
  require(`fesg/css/styles.scss`)
  require('../config/branding.scss')
}
