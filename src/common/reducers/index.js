import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ui from './ui';
import support from './support';
import services from './services';
import domains from './domains';
import nic from './nic';
import auth from './auth';
import wallet from './wallet';
import profile from './profile';
import settings from './settings';
import themePicker from './themePicker';
import notifications from './notifications';

const rootReducer = combineReducers({
  ui,
  support,
  services,
  domains,
  nic,
  auth,
  wallet,
  profile,
  settings,
  themePicker,
  notifications,
  routing: routerReducer
});

export default rootReducer;
