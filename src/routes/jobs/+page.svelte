<script lang="ts">
    import { onMount } from "svelte";
    import JobCard from "$lib/components/JobCard.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import Seo from "$lib/components/Seo.svelte";
    import Suggest from "$lib/components/Suggest.svelte";
    import { jobs } from "$lib/data/jobs";

    function parseDate(dateStr: string) {
        return new Date(dateStr + "T00:00:00Z");
    }

    let now = $state<Date | null>(null);

    onMount(() => {
        now = new Date();
    });

    const sortedJobs = $derived(
        [...jobs].sort(
            (a, b) =>
                parseDate(a.expires).getTime() - parseDate(b.expires).getTime(),
        ),
    );

    const activeJobs = $derived.by(() => {
        const current = now;

        if (!current) {
            return sortedJobs;
        }

        const today = Date.UTC(
            current.getUTCFullYear(),
            current.getUTCMonth(),
            current.getUTCDate(),
        );

        return sortedJobs.filter(
            (job) => parseDate(job.expires).getTime() >= today,
        );
    });
</script>

<Seo pageId="jobs" />

<main>
    <section class="site-header l-container">
        <Nav current="jobs" />
        <header>
            <h1 class="site-header-title">Jobs</h1>
        </header>
        <p class="site-header-desc">
            Open roles and freelance opportunities in information design
        </p>
    </section>

    <section class="l-container l-section">
        <p>
            A small board of open positions and freelance gigs for information
            designers and data visualization practitioners. Each listing points
            to the original offer, so you can apply directly with the hiring
            team.
        </p>
    </section>

    <section class="l-container is-wide l-section">
        {#if activeJobs.length === 0}
            <div class="empty-state">
                <h2>No jobs available</h2>
                <p>Check back later or submit a new offering.</p>
            </div>
        {:else}
            <div class="jobs-grid">
                {#each activeJobs as job (job.id)}
                    <JobCard {job} />
                {/each}
            </div>
        {/if}

        <Suggest
            text="Are we missing an open role?"
            action="Suggest a job"
            href="https://github.com/juanchiparra/data-folks/issues/new?template=job.yml&title=Job+suggestion&labels=job"
        />
    </section>
</main>

<style>
    .jobs-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
        gap: 2rem;
    }
</style>
