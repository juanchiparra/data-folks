import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null
    }),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        if (path === '/projects') {
          return;
        }
        console.error('Prerendering error:', message);
      }
    }
  }
};
