import { id as i1, label as l1 } from './tailwindcss/page-section/hero-section-01';

export default (editor, opts = {}) => {
  const bm = editor.BlockManager;

  bm.add(i1, { label: l1, content: { type: i1 }});
}
