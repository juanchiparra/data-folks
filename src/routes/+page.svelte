<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import FeaturedCard from "$lib/components/FeaturedCard.svelte";
  import FolkCard from "$lib/components/FolkCard.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import Suggest from "$lib/components/Suggest.svelte";
  import { weeklyFeatured } from "$lib/data/featured";
  import { folks } from "$lib/data/folks";
  import { siteUrl } from "$lib/data/seo";
  import { browser } from "$app/environment";
  import type { Field } from "$lib/types";

  const featuredFolk = folks.find((folk) => folk.id === weeklyFeatured.folkId);

  let filterType = $derived(
    browser ? (($page.url.searchParams.get("filter") as Field | null) ?? "all") : "all",
  );
  let scrollY = $state(0);
  let showTooltip = $state(false);
  let currentLetter = $state("");

  function getLetter(name: string) {
    return name
      .charAt(0)
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function setFilter(type: Field | "all") {
    const nextUrl = new URL($page.url);

    if (type === "all") {
      nextUrl.searchParams.delete("filter");
    } else {
      nextUrl.searchParams.set("filter", type);
    }

    goto(nextUrl, { keepFocus: true, noScroll: true });
  }

  const filteredFolks = $derived(
    folks.filter((folk) => {
      return filterType === "all" || folk.data.type === filterType;
    }),
  );

  const sortedFolks = $derived(
    filteredFolks
      .slice()
      .sort((first, second) => first.data.name.localeCompare(second.data.name)),
  );

  const firstLetter = $derived(
    sortedFolks.length > 0 ? getLetter(sortedFolks[0].data.name) : "",
  );

  $effect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    currentLetter = "";

    if (sortedFolks.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (!visibleEntry) {
          return;
        }

        const name = visibleEntry.target.getAttribute("data-name");

        if (name) {
          currentLetter = getLetter(name);
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    const cards = document.querySelectorAll<HTMLElement>(".folk-card-wrapper");
    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  });

  const schemaData = $derived({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Data Folks - Information Designers",
    description: "A curated list of awesome information designers.",
    itemListElement: sortedFolks.map((folk, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: folk.data.name,
        url: folk.data.page,
        image: `${siteUrl}${folk.data.image}`,
        jobTitle: "Information Designer",
        knowsAbout: ["Data Visualization", folk.data.type],
      },
    })),
  });

  // Built without a literal "<script>" so Svelte/ESLint don't treat it as a script tag
  const schemaJsonLd = $derived(
    "<" + `script type="application/ld+json">${JSON.stringify(schemaData)}</` + "script>",
  );
</script>

<svelte:window bind:scrollY />

<Seo pageId="home" />

<svelte:head>
  {@html schemaJsonLd}
</svelte:head>

<main>
  <section class="site-header l-container">
    <Nav current="folks" />
    <header>
      <h1 class="site-header-title">Data Folks</h1>
    </header>
    <p class="site-header-desc">A curated list of awesome information designers</p>
    <span class="site-header-author"
      >By <a href="https://github.com/juanchiparra" class="site-link" target="_blank"
        >Juanchi Parra</a
      ></span
    >
  </section>

  <section class="l-container l-section">
    <p>
      During the process of creating something it will always be more complicated when we
      are alone. Beyond being able to have the support of others, sometimes we'll need
      resources or references that allow us to go a step further, make us think outside
      the box, inspire us, and make us overcome our limits. That's why <b>data folks</b> were
      created, to make it easier to get inspiration from these information designers.
    </p>
    <p>
      Beyond the list, the site gathers a weekly selection of works worth studying, a
      calendar of events, and a board of open roles, so there's always a next step.
    </p>
  </section>

  {#if featuredFolk}
    <FeaturedCard
      {featuredFolk}
      reason={featuredFolk.data.reason ?? ""}
      reasonMobile={featuredFolk.data.reasonMobile}
    />
  {/if}

  <div class="filter-nav-wrapper l-container is-wide l-section" style="margin-top: 2rem;">
    <div class="filter-nav">
      <button
        class="filter-btn"
        class:is-active={filterType === "all"}
        onclick={() => setFilter("all")}>All</button
      >
      <button
        class="filter-btn"
        class:is-active={filterType === "interactive"}
        onclick={() => setFilter("interactive")}>Interactive</button
      >
      <button
        class="filter-btn"
        class:is-active={filterType === "designer"}
        onclick={() => setFilter("designer")}>Designer</button
      >
      <button
        class="filter-btn"
        class:is-active={filterType === "mastermind"}
        onclick={() => setFilter("mastermind")}>Mastermind</button
      >
      <button
        class="filter-btn"
        class:is-active={filterType === "maps"}
        onclick={() => setFilter("maps")}>Maps</button
      >
      <button
        class="filter-btn"
        class:is-active={filterType === "hands"}
        onclick={() => setFilter("hands")}>Hands-on</button
      >

      <div
        class="filter-info-wrapper"
        role="group"
        aria-label="Filter explanations"
        onmouseenter={() => (showTooltip = true)}
        onmouseleave={() => (showTooltip = false)}
      >
        <button
          class="filter-info-btn"
          type="button"
          aria-label="Field definitions"
          aria-expanded={showTooltip}
          onclick={() => (showTooltip = !showTooltip)}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"
            ></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg
          >
        </button>
        {#if showTooltip}
          <div
            class="filter-info-backdrop"
            role="presentation"
            aria-hidden="true"
            onclick={() => (showTooltip = false)}
          ></div>
          <div class="filter-info-popup">
            <ul>
              <li>
                <strong>All:</strong> Every folk, no field filter.
              </li>
              <li>
                <strong>Interactive:</strong> Builds interactive charts and visual stories,
                usually with code (D3, Svelte, P5)
              </li>
              <li>
                <strong>Designer:</strong> Focuses on static visuals and craft, often with Illustrator
                or Photoshop
              </li>
              <li>
                <strong>Mastermind:</strong> Someone to learn from through books, courses, videos,
                or their writing
              </li>
              <li>
                <strong>Maps:</strong> Works with geography and cartography
              </li>
              <li>
                <strong>Hands-on:</strong> Creates physical or hand-drawn visualizations, with
                pen and paper
              </li>
            </ul>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <section id="projects" class="l-container is-wide l-section">
    {#if sortedFolks.length === 0}
      <div class="empty-state">
        <h2>No folks matched these filters</h2>
        <p>Try another field or return to all.</p>
      </div>
    {:else}
      <ul class="l-grid">
        {#each sortedFolks as folk (folk.id)}
          <li class="folk-card-wrapper" data-name={folk.data.name}>
            <FolkCard {folk} />
          </li>
        {/each}
      </ul>
    {/if}

    <div class="fab-wrapper {scrollY > 500 ? 'is-visible' : ''}">
      <button
        class="fab-top"
        aria-label="Scroll to top"
        onclick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div class="fab-icon-up"></div>
      </button>
    </div>
  </section>

  <div
    class="scroll-letter-indicator"
    class:is-visible={scrollY > 300 && (currentLetter || firstLetter) !== ""}
    aria-hidden="true"
  >
    {currentLetter || firstLetter}
  </div>

  <Suggest text="Know an information designer we're missing?" action="Suggest a folk" />
</main>
