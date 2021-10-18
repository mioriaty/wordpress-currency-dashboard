import { isBrowser } from './isBrowser';

const NullWebFont = {
  load: () => {},
};

const webfontloader = isBrowser ? require('webfontloader') : NullWebFont;

export default webfontloader;
