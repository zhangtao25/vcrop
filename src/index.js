import Vcrop from './vcrop'

const install = function(Vue) {
  Vue.component('Vcrop', Vcrop);
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { Vcrop }

export default {
  version: '1.0.3',
  install,
  Vcrop,
  vcrop: Vcrop
}
