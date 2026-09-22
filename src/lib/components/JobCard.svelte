<script lang="ts">
  import type { Job } from "$lib/types";

  let { job }: { job: Job } = $props();

  const expires = $derived(
    new Date(job.expires + "T00:00:00Z").toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }),
  );

  function handleEvent() {
    if (typeof window !== "undefined" && window.fathom) {
      window.fathom.trackEvent("job click");
    }
  }
</script>

<article class="job-card">
  <div class="job-card-header">
    <span class="ui-tag is-interactive">{job.type}</span>
    <span class="job-date">Expires {expires}</span>
  </div>

  <div class="job-card-main">
    <h3 class="job-title">{job.title}</h3>
    <p class="job-company">{job.company}</p>
    <p class="job-location">{job.location}</p>
  </div>

  <div class="job-card-footer">
    <a
      class="job-action-btn"
      href={job.url}
      target="_blank"
      rel="noopener"
      onclick={handleEvent}>View role &rarr;</a
    >
  </div>
</article>

<style>
  .job-card {
    background: var(--gray-850);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-xl);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transition:
      transform var(--transition-fast),
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);
  }

  .job-card:hover {
    border-color: var(--border-focus);
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  .job-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .job-card-main {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-grow: 1;
  }

  .job-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-heading);
    margin: 0;
    line-height: 1.3;
  }

  .job-company {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--gray-300);
    margin: 0;
  }

  .job-location {
    font-size: 0.95rem;
    color: var(--text-muted);
    margin: 0;
  }

  .job-date {
    font-size: 0.85rem;
    color: var(--text-muted);
    font-weight: 500;
  }

  .job-card-footer {
    margin-top: auto;
    display: flex;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .job-action-btn {
    color: var(--color-white, #fff);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: color var(--transition-fast);
  }

  .job-action-btn:hover {
    color: var(--gray-300);
  }
</style>
