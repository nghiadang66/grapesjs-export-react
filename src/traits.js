export default (editor, opts = {}) => {
  const tm = editor.Traits;

  tm.addType('json', {
    noLabel: true,
    templateInput({ trait }) {
      trait = JSON.parse(JSON.stringify(trait));
      return  `
      <div class="custom-input-wrapper">
        <div class="gjs-label">${trait.label} (JSON)</div>
        <div data-input></div>
      </div>
      `;
    },
    createInput({ trait }) {
      const el = document.createElement('textarea');
      el.name = trait.attributes.name;
      el.style.width = '100%';
      el.style.minHeight = trait.attributes.minHeight || '100px';
      el.placeholder = trait.attributes.placeholder || '';
      el.value = trait.attributes.value || '';
      return el;
    },
    onUpdate({ elInput, component, trait }) {
      let value = elInput.value || '';

      try {
        value = JSON.parse(value);
        value = JSON.stringify(value);
      } catch {
        value = "";
      }
      
      component.set(trait.name, value);
    }
  });
}