<script lang="ts">
    import { resolve } from "$app/paths";

    type NavItem = "folks" | "works" | "events" | "jobs";
    let { current = "folks" }: { current: NavItem } = $props();
</script>

<nav class="site-nav" aria-label="Primary">
    <a
        href={resolve("/")}
        class="site-nav-link"
        class:is-active={current === "folks"}
    >
        Folks
    </a>
    <a
        href={resolve("/works/")}
        class="site-nav-link"
        class:is-active={current === "works"}
    >
        Works
    </a>
    <a
        href={resolve("/events/")}
        class="site-nav-link"
        class:is-active={current === "events"}
    >
        Events
    </a>
    <a
        href={resolve("/jobs/")}
        class="site-nav-link"
        class:is-active={current === "jobs"}
    >
        Jobs
    </a>
</nav>
