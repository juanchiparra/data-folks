<script lang="ts">
    import { folks, type Folk, type Field } from "./folks";
    import { writable } from "svelte/store";
    import { onMount } from "svelte";

    export let filteredFolks: Folk[] = [];

    let filterType = writable<Field | "all">("all");

    $: filteredFolks =
        $filterType === "all"
            ? folks
            : folks.filter((folk) => folk.data.type === $filterType);

    function setFilter(type: Field | "all") {
        filterType.set(type);
    }

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
                        const name =
                            entry.target.querySelector(".name").textContent;
                        currentLetter.set(name.charAt(0).toUpperCase());
                    }
                });
            },
            { threshold: 0.5 },
        );

        document.querySelectorAll(".portfolio-item").forEach((item) => {
            observer.observe(item);
        });

        return () => observer.disconnect();
    });
</script>

<svelte:head>
    <title>Data Folks - A Curated List of Information Designers</title>
    <meta
        name="description"
        content="A curated collection of portfolios from information designers and data visualization practitioners to inspire you."
    />
    {@html `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`}
</svelte:head>

<main class="container">
    <script type="application/ld+json">
        {@html JSON.stringify(schemaData)}
    </script>
    <section class="header">
        <header>
            <h1>Data Folks</h1>
        </header>
        <p>A curated list of awesome information designers</p>
        <span
            >By <a
                href="https://github.com/juanchiparra"
                class="external"
                target="_blank">Juanchi Parra</a
            ></span
        >
    </section>
    <section class="introduction">
        <p>
            During the process of creating something it will always be more
            complicated when we are alone. Beyond being able to have the support
            of others, sometimes we'll need resources or references that allow
            us to go a step further, make us think outside the box, inspire us,
            and make us overcome our limits. That's why <b>data folks</b> were created,
            to make it easier to get inspiration from these information designers.
        </p>
    </section>
    <section id="category-explanation" class="explanation">
        <p class="disclaimer">
            The fields were created under my personal opinion. It doesn't mean
            that this folk only knows about that subject, it's just that among
            everything he knows, this particular one has helped me.
        </p>
        <p>You can select a field to filter:</p>
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

    <div class="filter-buttons">
        <button
            class:active={$filterType === "all"}
            on:click={() => setFilter("all")}>All</button
        >
        <button
            class:active={$filterType === "interactive"}
            on:click={() => setFilter("interactive")}>Interactive</button
        >
        <button
            class:active={$filterType === "designer"}
            on:click={() => setFilter("designer")}>Designer</button
        >
        <button
            class:active={$filterType === "mastermind"}
            on:click={() => setFilter("mastermind")}>Mastermind</button
        >
        <button
            class:active={$filterType === "maps"}
            on:click={() => setFilter("maps")}>Maps</button
        >
        <button
            class:active={$filterType === "hands"}
            on:click={() => setFilter("hands")}>Hands-on</button
        >
    </div>
    <section id="projects" class="projects center-x">
        <div class="projects-list">
            {#each sortedFolks as folk}
                <a
                    class="portfolio-item"
                    href={folk.data.page}
                    target="_blank"
                    aria-label="Visit {folk.data.name}'s page"
                    on:click={() =>
                        window.fathom?.trackEvent(
                            `portfolio click: ${folk.data.name}`,
                        )}
                >
                    <div
                        class="background-image"
                        style="background-image: url({folk.data.image});"
                        alt="{folk.data.name} - {folk.data.type}"
                    ></div>
                    <div class="content">
                        <div class="text-container">
                            <h3 class="name">{folk.data.name}</h3>
                            <p class="type">{folk.data.type}</p>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
        <button
            class="scroll-to-top"
            aria-label="Scroll to top"
            on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            <div class="triangle-up"></div>
        </button>
    </section>
    <div class="current-letter">
        {$currentLetter}
    </div>
</main>
