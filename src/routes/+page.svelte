<script>
	import { folks } from "./folks.js";
	import { writable } from "svelte/store";
	import { onMount } from "svelte";

	export let filteredFolks = [];

	let filterType = writable("all");

	$: filteredFolks =
		$filterType === "all"
			? folks
			: folks.filter((folk) => folk.data.type === $filterType);

	function setFilter(type) {
		filterType.set(type);
	}

	$: sortedFolks = filteredFolks
		.slice()
		.sort((a, b) => a.data.name.localeCompare(b.data.name));

	let currentLetter = writable("?");

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

<main class="container">
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

<style>
	:root {
		--black: #212121;
		--white: #f5f5f5;
		font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
		line-height: 1.5;
		font-weight: 400;
		color: var(--white);
		background-color: var(--black);
		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.container {
		padding: 0 1rem;
	}

	h1 {
		text-align: center;
		font-size: 2em;
		margin-bottom: 0.5em;
	}

	.header {
		width: 100%;
		max-width: 650px;
		margin: 30px auto;
		padding: 0px auto;
		text-align: center;
	}

	.introduction,
	.explanation {
		width: 100%;
		max-width: 650px;
		margin: 30px auto;
		padding: 0px auto;
		text-align: left;
	}

	.explanation li {
		margin-bottom: 0.5em;
	}

	h1 {
		font-size: 3.815rem;
		margin: 40px;
		text-transform: uppercase;
		font-weight: bold;
		text-align: center;
	}

	p {
		margin-bottom: 30px;
		font-size: 1.25em;
		line-height: 1.5em;
		word-wrap: break-word;
	}

	.header p {
		font-size: 1.3em;
		text-align: center;
	}

	.header span {
		font-size: 1.1em;
		display: block;
		text-align: center;
		font-style: italic;
	}

	.external {
		color: var(--white);
		text-decoration: underline;
		text-decoration-style: dotted;
		text-decoration-thickness: 1px;
	}

	.external:hover {
		text-decoration: none;
	}

	.disclaimer {
		text-align: center;
		font-weight: normal;
		color: #ff825c;
		margin-top: 1em;
	}

	.projects-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}

	.portfolio-item {
		display: block;
		width: 100%;
		padding-top: 100%;
		background-color: var(--black);
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		text-align: center;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		color: var(--white);
		overflow: hidden;
		text-decoration: none;
		position: relative;
	}

	.background-image {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-size: cover;
		background-position: center;
		transition: opacity 0.3s ease;
	}

	.portfolio-item:hover .background-image {
		opacity: 0.1;
	}

	.portfolio-item .content {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		display: none;
	}

	.portfolio-item:hover {
		transform: scale(1.04);
		box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
	}

	.portfolio-item:hover .content {
		display: flex;
	}

	.portfolio-item .name,
	.portfolio-item .type {
		color: var(--white);
		text-decoration: none;
		margin: 0;
		font-size: 1em;
		text-transform: capitalize;
		word-wrap: break-word;
	}

	h3 {
		margin: 0;
		font-size: 1.2rem;
	}

	.filter-buttons {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
		border: 2px solid transparent;
		border-radius: 4px;
		background-color: #ebffa8;
		color: var(--black);
		cursor: pointer;
		transition:
			background-color 0.3s,
			border-color 0.3s;
	}

	button:hover {
		background-color: rgba(217, 255, 92, 0.95);
		color: var(--black);
	}

	button.active {
		background-color: #d9ff5c;
		color: var(--black);
	}

	.scroll-to-top {
		position: fixed;
		bottom: 20px;
		right: 20px;
		width: 40px;
		height: 40px;
		background-color: var(--black);
		border: none;
		border-radius: 50%;
		cursor: pointer;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: center;
		align-items: center;
		transition:
			background-color 0.3s,
			transform 0.3s;
	}

	.scroll-to-top:hover {
		background-color: var(--white);
		transform: scale(1.1);
	}

	.triangle-up {
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-bottom: 15px solid var(--white);
	}

	.scroll-to-top:hover .triangle-up {
		border-bottom-color: var(--black);
	}

	.current-letter {
		position: fixed;
		top: 10px;
		right: 20px;
		background-color: var(--black);
		color: var(--white);
		padding: 10px;
		border-radius: 5px;
		font-size: 1.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		z-index: 4;
	}

	@media (max-width: 768px) {
		.projects-list {
			grid-template-columns: 1fr;
		}

		.scroll-to-top {
			right: 50%;
			transform: translateX(50%);
		}

		.current-letter {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.filter-buttons {
			flex-direction: row;
			justify-content: space-around;
		}

		button {
			flex: 1 1 25%;
			margin-bottom: 0.5rem;
			font-size: 0.8rem;
		}

		.projects-list {
			grid-template-columns: 1fr;
		}

		.portfolio-item {
			width: 100%;
		}

		.scroll-to-top {
			left: 50%;
			transform: translateX(-50%);
		}

		.current-letter {
			display: none;
		}
	}
</style>
