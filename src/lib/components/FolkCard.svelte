<script lang="ts">
  import type { Folk } from "$lib/types";

  let { folk }: { folk: Folk } = $props();

  function handleEvent() {
    if (typeof window !== "undefined" && window.fathom) {
      window.fathom.trackEvent(`portfolio click: ${folk.data.name}`);
    }
  }
</script>

<a
  class="folk-card"
  href={folk.data.page}
  target="_blank"
  aria-label="Visit {folk.data.name}'s page"
  onclick={handleEvent}
>
  <div class="folk-bg-image">
    <img
      src={folk.data.image}
      alt="{folk.data.name} - {folk.data.type}"
      loading="lazy"
      decoding="async"
    />
  </div>
  <div class="folk-content">
    <div class="folk-info">
      <h3 class="folk-title">{folk.data.name}</h3>
      <p class="folk-type">{folk.data.type}</p>
    </div>
  </div>
</a>
