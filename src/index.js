import loadComponents from './components';
import loadBlocks from './blocks';
import loadTraits from './traits';
import loadCommands from './commands';
import loadPanels from './panels';
import en from './locale/en';

export default (editor, opts = {}) => {
  const options = {
    ...{
      i18n: {},
      tailwindPlayCdn: 'https://cdn.tailwindcss.com',
      plugins: [],
      config: {},
      cover: `.object-cover { filter: sepia(1) hue-rotate(190deg) opacity(.46) grayscale(.7) !important; }`,
      changeThemeText: 'Change Theme',
      openCategory: 'Blog',
    }, ...opts
  };

  loadComponents(editor, options);
  loadBlocks(editor, options);
  loadCommands(editor, options);
  loadPanels(editor, options);
  loadTraits(editor, options);

  editor.I18n && editor.I18n.addMessages({
      en,
      ...options.i18n,
  });

  const appendTailwindCss = async (frame) => {
    const iframe = frame.view.getEl();

    if (!iframe) return;

    const { tailwindPlayCdn, plugins, config, cover } = options;
    const init = () => {
      iframe.contentWindow.tailwind.config = config;
    }

    const script = document.createElement('script');
    script.src = tailwindPlayCdn + (plugins.length ? `?plugins=${plugins.join()}` : '');
    script.onload = init;

    const cssStyle = document.createElement('style');
    cssStyle.innerHTML = cover;

    // checks iframe is ready before loading Tailwind CSS - issue with firefox
    const f = setInterval(() => {
      const doc = iframe.contentDocument;
      if (doc && doc.readyState && doc.readyState === 'complete') {
        doc.head.appendChild(script);
        doc.head.appendChild(cssStyle);
        clearInterval(f);
      }
    }, 100)
  }

  editor.Canvas.getModel()['on']('change:frames', (m, frames) => {
    frames.forEach(frame => frame.once('loaded', () => appendTailwindCss(frame)));
  });
};