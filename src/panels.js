export default (editor, opts = {}) => {
  const pm = editor.Panels;

  pm.addButton('options', {
    id: 'show-react-code-btn',
    className: 'fa fa-spinner',
    command: 'show-react-code',
    attributes: { title: 'Show React Code' },
  });
}