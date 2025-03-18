import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
      adapter: adapter(),
      paths: {
          base: '/data-folks'
      }
  }
};

export default config;
