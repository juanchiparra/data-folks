<script lang="ts">
  import type { Folk } from "$lib/types";

  let {
    featuredFolk,
    reason,
    reasonMobile,
  }: { featuredFolk: Folk; reason: string; reasonMobile?: string } = $props();

  function handleEvent() {
    if (typeof window !== "undefined" && window.fathom) {
      window.fathom.trackEvent(`portfolio click: ${featuredFolk.data.name}`);
      window.fathom.trackEvent(`featured click`);
    }
  }
</script>

<section class="l-container l-section-large">
  <div class="featured-card-wrapper">
    <div class="featured-badge">Featured Folk of the Week</div>
    <div class="featured-card">
      <div class="featured-body">
        <h2 class="featured-title">{featuredFolk.data.name}</h2>
        <span class="ui-tag is-{featuredFolk.data.type}">
          {featuredFolk.data.type}
        </span>

        {#if reasonMobile}
          <p class="featured-desc is-desktop">{@html reason}</p>
          <p class="featured-desc is-mobile">{@html reasonMobile}</p>
        {:else}
          <p class="featured-desc">{@html reason}</p>
        {/if}

        <a
          href={featuredFolk.data.page}
          target="_blank"
          rel="noopener"
          class="featured-action"
          onclick={handleEvent}
        >
          View portfolio
        </a>
      </div>
    </div>
  </div>
</section>
