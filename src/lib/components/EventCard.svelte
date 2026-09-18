<script lang="ts">
    import type { Event } from "$lib/types";

    let { event }: { event: Event } = $props();

    function parseDate(dateStr: string) {
        return new Date(dateStr + "T00:00:00Z");
    }

    function getDateInfo(dateStr: string) {
        const d = parseDate(dateStr);
        return {
            month: d.toLocaleString("en-US", {
                month: "short",
                timeZone: "UTC",
            }),
            day: d.getUTCDate(),
            full: d.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
            }),
        };
    }

    function getDateRange(startStr: string, endStr?: string) {
        const start = getDateInfo(startStr);
        if (!endStr || endStr === startStr) return start.full;

        const end = getDateInfo(endStr);
        const startD = parseDate(startStr);
        const endD = parseDate(endStr);
        if (
            startD.getUTCMonth() === endD.getUTCMonth() &&
            startD.getUTCFullYear() === endD.getUTCFullYear()
        ) {
            return `${start.month} ${start.day} \u2013 ${end.day}, ${endD.getUTCFullYear()}`;
        }
        return `${start.full} \u2013 ${end.full}`;
    }

    const date = $derived(getDateInfo(event.date));
    const dateRange = $derived(getDateRange(event.date, event.endDate));

    function handleEvent() {
        if (typeof window !== "undefined" && window.fathom) {
            window.fathom.trackEvent("event click");
        }
    }
</script>

<article class="agenda-card">
    <div class="a-date-block">
        <span class="a-month">{date.month}</span>
        <span class="a-day">{date.day}</span>
    </div>

    <div class="a-main">
        <div class="a-header">
            <span class="ui-tag is-interactive">{event.type}</span>
            <span class="a-location a-location-header">{event.location}</span>
            <span class="a-date-text">{dateRange}</span>
        </div>
        <h3 class="a-title">{event.title}</h3>
        <p class="a-desc">{event.description}</p>
        <p class="a-location a-location-body">{event.location}</p>
    </div>

    <div class="a-action">
        <a
            class="a-btn"
            href={event.url}
            target="_blank"
            rel="noopener"
            onclick={handleEvent}>View event</a
        >
    </div>
</article>

<style>
    .agenda-card {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        background: var(--gray-850);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-xl);
        padding: 1.5rem;
        transition:
            transform var(--transition-fast),
            border-color var(--transition-fast),
            box-shadow var(--transition-fast);
    }

    .agenda-card:hover {
        border-color: var(--border-focus);
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
    }

    .a-date-block {
        display: none;
    }

    .a-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .a-header .ui-tag {
        margin-bottom: 0;
    }

    .a-date-text {
        font-size: 0.85rem;
        color: var(--text-muted);
        font-weight: 500;
    }

    .a-location {
        font-size: 0.9rem;
        color: var(--text-muted);
        font-weight: 500;
        margin: 0;
    }

    .a-desc {
        font-size: 0.95rem;
        color: var(--text-muted);
        margin: 0;
        line-height: 1.5;
    }

    .a-location-header {
        display: none;
    }

    .a-main {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        flex-grow: 1;
    }

    .a-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-heading);
        margin: 0;
        line-height: 1.3;
    }

    .a-action {
        display: flex;
        padding-top: 1.25rem;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .a-btn {
        color: var(--text-heading);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        white-space: nowrap;
        transition: color var(--transition-fast);
    }

    .a-btn:hover {
        color: var(--gray-300);
    }

    .a-btn::after {
        content: "\2192";
        margin-left: 0.35rem;
    }

    @media (min-width: 768px) {
        .agenda-card {
            flex-direction: row;
            align-items: stretch;
            gap: 0;
            padding: 0;
            background: var(--bg-surface);
            border-radius: var(--radius-lg);
            overflow: hidden;
            transition:
                transform 0.2s ease,
                border-color 0.2s ease;
        }

        .agenda-card:hover {
            transform: scale(1.01);
            box-shadow: none;
        }

        .a-date-block {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            min-width: 120px;
            padding: 1.5rem;
            background: var(--gray-850);
            border-right: 1px dashed var(--border-subtle);
        }

        .a-month {
            font-size: 1.1rem;
            text-transform: uppercase;
            font-weight: 600;
            color: var(--text-muted);
            letter-spacing: 1px;
        }

        .a-day {
            font-size: 2rem;
            font-weight: 700;
            color: var(--text-heading);
        }

        .a-date-text {
            display: none;
        }

        .a-header {
            justify-content: flex-start;
        }

        .a-location-header {
            display: inline;
        }

        .a-location-body {
            display: none;
        }

        .a-main {
            padding: 2rem;
            justify-content: center;
            gap: 0.5rem;
        }

        .a-title {
            font-size: 1.4rem;
        }

        .a-action {
            align-items: center;
            justify-content: flex-end;
            padding: 2rem;
            min-width: 150px;
            border-top: none;
        }
    }
</style>
