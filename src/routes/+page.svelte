<script lang="ts">
    import { folks } from "$lib/data/folks";
    import { weeklyFeatured } from "$lib/data/featured";
    import type { Folk, Field } from "$lib/types";
    import FeaturedCard from "$lib/components/FeaturedCard.svelte";
    import FolkCard from "$lib/components/FolkCard.svelte";
    import { writable } from "svelte/store";
    import { onMount } from "svelte";

    export let filteredFolks: Folk[] = [];

    const featuredFolk = folks.find((f) => f.id === weeklyFeatured.folkId);

    let filterType = writable<Field | "all">("all");

    $: filteredFolks =
        $filterType === "all"
            ? folks
            : folks.filter((folk) => folk.data.type === $filterType);

    function setFilter(type: Field | "all") {
        filterType.set(type);
    }

    let scrollY = 0;

    $: sortedFolks = filteredFolks
        .slice()
        .sort((a, b) => a.data.name.localeCompare(b.data.name));

    let currentLetter = writable("?");

    // JSON-LD schema for SEO
    $: schemaData = {
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
                image: `https://juanchiparra.github.io/data-folks${folk.data.image}`,
                jobTitle: "Information Designer",
                knowsAbout: ["Data Visualization", folk.data.type],
            },
        })),
    };

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const titleEl =
                            entry.target.querySelector(".folk-title");
                        if (titleEl) {
                            const name = titleEl.textContent;
                            const firstChar = name.charAt(0).toUpperCase();
                            const normalizedChar = firstChar
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "");
                            currentLetter.set(normalizedChar);
                        }
                    }
                });
            },
            { threshold: 0.5 },
        );

        document.querySelectorAll(".folk-card").forEach((item) => {
            observer.observe(item);
        });

        return () => observer.disconnect();
    });
</script>

<svelte:window bind:scrollY />

<svelte:head>
    <title>Data Folks - A Curated List of Information Designers</title>
    <meta
        name="description"
        content="A curated collection of portfolios from information designers and data visualization practitioners to inspire you."
    />
    {@html `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`}
</svelte:head>

<main class="l-wrapper">
    <section class="site-header l-container">
        <header>
            <h1 class="site-header-title">Data Folks</h1>
        </header>
        <p>A curated list of awesome information designers</p>
        <span class="site-header-author"
            >By <a
                href="https://github.com/juanchiparra"
                class="site-link"
                target="_blank">Juanchi Parra</a
            ></span
        >
    </section>
    <section class="l-container l-section">
        <p>
            During the process of creating something it will always be more
            complicated when we are alone. Beyond being able to have the support
            of others, sometimes we'll need resources or references that allow
            us to go a step further, make us think outside the box, inspire us,
            and make us overcome our limits. That's why <b>data folks</b> were created,
            to make it easier to get inspiration from these information designers.
        </p>
    </section>

    <section id="category-explanation" class="l-container l-section">
        <div
            style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;"
        >
            <p style="margin: 0;">You can select a field to filter</p>
            <button
                class="info-tooltip-wrapper"
                type="button"
                aria-label="More information about fields"
            >
                <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="info-icon"
                    ><circle cx="12" cy="12" r="10"></circle><line
                        x1="12"
                        y1="16"
                        x2="12"
                        y2="12"
                    ></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg
                >
                <div class="tooltip-content">
                    The fields were created under my personal opinion. It
                    doesn't mean that this folk only knows about that subject,
                    it's just that among everything he knows, this particular
                    one has helped me
                </div>
            </button>
        </div>
        <ul>
            <li><strong>All:</strong> All folks in one place</li>
            <li>
                <strong>Interactive:</strong> Those who usually do interactive visualizations,
                either with D3, Svelte...
            </li>
            <li>
                <strong>Designer</strong> Those good at designing visualizations
                with programs such as Illustrator or Photoshop, or who tend to make
                static visualizations
            </li>
            <li>
                <strong>Mastermind:</strong> Those from whom I have been able to
                learn over the years, either by a book, a course, or even their publications
                on social media or their blog
            </li>
            <li>
                <strong>Maps:</strong>Those who make maps in a thousand and one
                possible ways
            </li>
            <li>
                <strong>Hands-on:</strong> Those who can create visualizations with
                pen and paper
            </li>
        </ul>
    </section>

    {#if featuredFolk}
        <FeaturedCard
            {featuredFolk}
            reason={weeklyFeatured.reason}
            reasonMobile={weeklyFeatured.reasonMobile}
        />
    {/if}

    <div class="filter-nav l-container is-wide l-section">
        <button
            class="filter-btn"
            class:is-active={$filterType === "all"}
            on:click={() => setFilter("all")}>All</button
        >
        <button
            class="filter-btn"
            class:is-active={$filterType === "interactive"}
            on:click={() => setFilter("interactive")}>Interactive</button
        >
        <button
            class="filter-btn"
            class:is-active={$filterType === "designer"}
            on:click={() => setFilter("designer")}>Designer</button
        >
        <button
            class="filter-btn"
            class:is-active={$filterType === "mastermind"}
            on:click={() => setFilter("mastermind")}>Mastermind</button
        >
        <button
            class="filter-btn"
            class:is-active={$filterType === "maps"}
            on:click={() => setFilter("maps")}>Maps</button
        >
        <button class="filter-btn" on:click={() => setFilter("hands")}
            >Hands-on</button
        >
    </div>

    <section id="projects" class="l-container is-wide l-section">
        <ul class="l-grid">
            {#each sortedFolks as folk}
                <li>
                    <FolkCard {folk} />
                </li>
            {/each}
        </ul>
        <div class="fab-wrapper {scrollY > 500 ? 'is-visible' : ''}">
            <button
                class="fab-top"
                aria-label="Scroll to top"
                on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <div class="fab-icon-up"></div>
            </button>
        </div>
    </section>
    <div class="indicator-letter {scrollY > 500 ? 'is-visible' : ''}">
        {$currentLetter}
    </div>
</main>
