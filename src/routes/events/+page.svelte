<script lang="ts">
  import { onMount } from "svelte";
  import EventCard from "$lib/components/EventCard.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import Suggest from "$lib/components/Suggest.svelte";
  import { events } from "$lib/data/events";

  function parseDate(dateStr: string) {
    return new Date(dateStr + "T00:00:00Z");
  }

  let now = $state<Date | null>(null);

  onMount(() => {
    now = new Date();
  });

  const sortedEvents = $derived(
    [...events].sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()),
  );

  const activeEvents = $derived.by(() => {
    const current = now;

    if (!current) {
      return sortedEvents;
    }

    const today = Date.UTC(
      current.getUTCFullYear(),
      current.getUTCMonth(),
      current.getUTCDate(),
    );

    return sortedEvents.filter(
      (evt) => parseDate(evt.endDate ?? evt.date).getTime() >= today,
    );
  });
</script>

<Seo pageId="events" />

<main>
  <section class="site-header l-container">
    <Nav current="events" />
    <header>
      <h1 class="site-header-title">Events</h1>
    </header>
    <p class="site-header-desc">
      Conferences, meetups, and talks from the information design community
    </p>
  </section>

  <section class="l-container l-section">
    <p>
      A calendar of gatherings where data designers and journalists meet, from big
      conferences to local meetups. Each event links to its site so you can dig into the
      program, the speakers, or the call for talks.
    </p>
  </section>

  <section class="l-container l-section">
    {#if activeEvents.length === 0}
      <div class="empty-state">
        <h2>No events available</h2>
        <p>Check back later or submit a new event.</p>
      </div>
    {:else}
      <ul class="agenda-list">
        {#each activeEvents as evt (evt.id)}
          <li>
            <EventCard event={evt} />
          </li>
        {/each}
      </ul>
    {/if}

    <Suggest
      text="Know about an upcoming conference or meetup?"
      action="Suggest an event"
      href="https://github.com/juanchiparra/data-folks/issues/new?template=event.yml&title=Event+suggestion&labels=event"
    />
  </section>
</main>

<style>
  .agenda-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 0;
    margin: 0;
  }

  .agenda-list > li {
    margin: 0;
  }
</style>
