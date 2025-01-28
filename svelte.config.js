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
        // Ignore 404 errors for specific paths
        if (path === '/projects') {
          return;
        }

        // Log other errors
        console.error('Prerendering error:', message);
      }
    }
  }
};
