<script lang="ts">
    import type { Folk } from "$lib/types";

    export let folk: Folk;

    function handleEvent() {
        if (typeof window !== "undefined" && window.fathom) {
            window.fathom.trackEvent(`portfolio click: ${folk.data.name}`);
        }
    }
</script>

<a
    class="folk-card"
    href={folk.data.page}
    target="_blank"
    aria-label="Visit {folk.data.name}'s page"
    on:click={handleEvent}
>
    <div
        class="folk-bg-image"
        style="background-image: url({folk.data.image});"
        aria-label="{folk.data.name} - {folk.data.type}"
    ></div>
    <div class="folk-content">
        <div class="folk-info">
            <h3 class="folk-title">{folk.data.name}</h3>
            <p class="folk-type">{folk.data.type}</p>
        </div>
    </div>
</a>
