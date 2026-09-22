<script lang="ts">
  import WorkCard from "$lib/components/WorkCard.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import { recommendedWorks } from "$lib/data/works";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Works",
    description: "A curated selection of visual works worth studying.",
    itemListElement: recommendedWorks.map((work, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: work.title,
        url: work.url,
        creator: work.authorNames.map((author) => ({
          "@type": "Person",
          name: author,
        })),
      },
    })),
  };
</script>

<Seo pageId="works" />
<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`}
</svelte:head>

<main>
  <section class="site-header l-container">
    <Nav current="works" />
    <header>
      <h1 class="site-header-title">Works</h1>
    </header>
    <p class="site-header-desc">A curated shelf of visualizations worth studying</p>
  </section>

  <section class="l-container l-section">
    <p>
      Three works every week, chosen because each one teaches something concrete: pacing,
      annotation, narrative, or technique. Every entry links to the original piece and to
      the designers behind it, so the shelf stays small, careful, and easy to browse.
    </p>
  </section>

  <section class="l-container is-wide l-section">
    <ul class="works-grid">
      {#each recommendedWorks as work (work.id)}
        <li>
          <WorkCard {work} />
        </li>
      {/each}
    </ul>
  </section>
</main>
