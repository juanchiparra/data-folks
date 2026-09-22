<script lang="ts">
  import { page } from "$app/stores";
  import { seoConfig, siteUrl } from "$lib/data/seo";

  let {
    pageId,
    image = `${siteUrl}/og-image.png`,
  }: {
    pageId: keyof typeof seoConfig;
    image?: string;
  } = $props();

  let meta = $derived(seoConfig[pageId] || seoConfig.home);
  let url = $derived(`${siteUrl}${$page.url.pathname}`);
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <meta name="keywords" content="Data Folks, Data visualization, Information design" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Data Folks" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:image" content={image} />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={meta.title} />
  <meta property="twitter:description" content={meta.description} />
  <meta property="twitter:image" content={image} />
  <link rel="canonical" href={url} />
</svelte:head>
