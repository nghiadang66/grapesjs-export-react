import { id as i1, component as c1 } from './tailwindcss/page-section/hero-section-01';

export default (editor, opts = {}) => {
  const domc = editor.DomComponents;
  
  domc.addType(i1, c1);
};
