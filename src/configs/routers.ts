import HOME from '../pages/home.jsx';
import COLOR_RECOGNITION from '../pages/color-recognition.jsx';
import FORMULA_GENERATION from '../pages/formula-generation.jsx';
import MIXING_SIMULATION from '../pages/mixing-simulation.jsx';
import COMMUNITY from '../pages/community.jsx';
import PRODUCTS from '../pages/products.jsx';
import MARKETING from '../pages/marketing.jsx';
import USER_MANAGEMENT from '../pages/user-management.jsx';
import FORMULA_MANAGEMENT from '../pages/formula-management.jsx';
import COLOR_LIBRARY from '../pages/color-library.jsx';
export const routers = [{
  id: "home",
  component: HOME
}, {
  id: "color-recognition",
  component: COLOR_RECOGNITION
}, {
  id: "formula-generation",
  component: FORMULA_GENERATION
}, {
  id: "mixing-simulation",
  component: MIXING_SIMULATION
}, {
  id: "community",
  component: COMMUNITY
}, {
  id: "products",
  component: PRODUCTS
}, {
  id: "marketing",
  component: MARKETING
}, {
  id: "user-management",
  component: USER_MANAGEMENT
}, {
  id: "formula-management",
  component: FORMULA_MANAGEMENT
}, {
  id: "color-library",
  component: COLOR_LIBRARY
}]