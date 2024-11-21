const escapeHtml = (html) => {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#47;');
}

export default (editor, opts = {}) => {
  const cm = editor.Commands;

  cm.add('show-react-code', {
    run(editor) {
      const selected = editor.getSelected();

      if (selected && selected.props().reactContent) {
        const reactContent = selected.props().reactContent;
        editor.Modal.open({
          title: 'React Code',
          content: `<pre style="white-space: pre-wrap; padding: 15px; background-color: #f5f5f5; color: #333;">${escapeHtml(reactContent)}</pre>`,
        }).open();
      } else {
        alert('No component selected!');
      }
    },
  });
}