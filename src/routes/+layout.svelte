<script lang="ts">
  const { children } = $props();
</script>

<div class="l-wrapper">
  {@render children()}

  <footer class="site-footer">
    <div class="site-footer-inner">
      <p class="site-footer-text">
        <span class="site-footer-line"
          >Created with <svg
            class="site-footer-heart"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            stroke="currentColor"
            stroke-width="2"
            fill="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            ><path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            ></path></svg
          >
          by
          <a href="https://github.com/juanchiparra" class="external">Juanchi Parra</a
          ></span
        >
      </p>
      <p class="site-footer-text">
        Source code available <a
          href="https://github.com/juanchiparra/data-folks/"
          class="external">here</a
        >
      </p>
    </div>
  </footer>
</div>
