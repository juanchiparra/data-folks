<script lang="ts">
    let {
        text,
        action,
        href = "https://github.com/juanchiparra/data-folks/issues/new",
    }: { text: string; action: string; href?: string } = $props();

    function handleEvent() {
        if (typeof window !== "undefined" && window.fathom) {
            window.fathom.trackEvent("suggest click");
        }
    }
</script>

<div class="suggest-cta">
    <p>
        {text}
        <a href={href} target="_blank" rel="noopener" onclick={handleEvent}
            >{action} &rarr;</a
        >
    </p>
</div>

<style>
    .suggest-cta {
        margin-top: var(--space-xl);
        text-align: center;
    }

    .suggest-cta p {
        font-size: var(--text-sm);
        color: var(--text-muted);
        margin: 0;
    }

    .suggest-cta a {
        color: var(--text-muted);
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 3px;
    }

    .suggest-cta a:hover {
        color: var(--text-body);
    }
</style>
