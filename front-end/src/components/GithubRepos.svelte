<script lang="ts">
  import type { Repo } from "../types/repo";
  import { onMount } from "svelte";
  import Loading from "./Loading.svelte";

  let repos: Repo[] = [];

  onMount(async () => {
    await fetch("https://api.github.com/users/GllmJln/repos")
      .then((res) => res.json())
      .then((res) => {
        repos = (res as Repo[]).sort(
          (a, b) =>
            new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
        );
      });
  });
</script>

{#each repos as repo}
  <a class="project" href={repo.html_url}>
    <h3>{repo.name}</h3>
    <p>{repo.description}</p>
    <p>Last updated: {new Date(repo.pushed_at).toLocaleDateString()}</p>
  </a>
{:else}
  <Loading />
{/each}

<style>
  .project {
    padding: 1rem;
    font-size: 1.2rem;
    text-decoration: none;
    color: var(--blue);
    text-align: center;
    border-radius: 10px;
    text-decoration: none;
    border-radius: 20px;
    background-color: var(--light-gray);
    box-sizing: border-box;

    flex-basis: 25vw;
    flex-grow: 1;
  }

  .project:hover {
    color: var(--green);
    background-color: var(--dark-gray);
  }

  @media (max-width: 900px) {
    .project {
      flex-basis: 70vw;
    }
  }
</style>
