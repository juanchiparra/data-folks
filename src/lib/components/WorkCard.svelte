<script lang="ts">
  import type { Work } from "$lib/types";

  let { work }: { work: Work } = $props();

  const videoSrc = $derived(`/works/${work.id}.mp4`);
  const videoWebmSrc = $derived(`/works/${work.id}.webm`);
  const posterSrc = $derived(`/works/${work.id}.jpg`);
  const gifSrc = $derived(work.gif ? `/works/${work.gif}` : null);

  function lazyAutoplay(el: HTMLVideoElement) {
    const play = () => el.play().catch(() => {});
    if (typeof IntersectionObserver === "undefined") {
      play();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          play();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  function handleWorkClick() {
    if (typeof window !== "undefined" && window.fathom) {
      window.fathom.trackEvent("work click");
    }
  }
</script>

<article class="work-card" style:--work-accent={work.accent}>
  {#if gifSrc}
    <div class="work-media">
      <img src={gifSrc} alt="{work.title} preview" loading="lazy" decoding="async" />
    </div>
  {:else}
    <div class="work-media">
      <video
        use:lazyAutoplay
        poster={posterSrc}
        muted
        loop
        playsinline
        preload="none"
        aria-label="{work.title} preview"
      >
        <source src={videoWebmSrc} type="video/webm" />
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  {/if}

  <div class="work-cover">
    <p class="work-source">{work.source}</p>
    <h3 class="work-title">{work.title}</h3>
    <p class="work-authors">{work.authorNames.join(", ")}</p>
  </div>

  <div class="work-body">
    <p class="work-note">{work.note}</p>

    <a
      class="featured-action"
      href={work.url}
      target="_blank"
      rel="noopener"
      onclick={handleWorkClick}
    >
      Open visualization
    </a>
  </div>
</article>
