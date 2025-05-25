<script lang="ts">
  import NewPoll from "./NewPoll.svelte";
  import YourVote from "./YourVote.svelte";
  import Results from "./Results.svelte";
  import { pollState, activeView } from "../state.svelte";

  if (pollState.votes[window.webxdc.selfAddr]) {
    activeView.active = "results";
  }
</script>

{#if pollState.poll}
  <div class="space-y-4">
    <h4 class="h4">{pollState.poll.question}</h4>
    {#if activeView.active === "yourvote"}
      <YourVote />
    {:else}
      <Results />
    {/if}
  </div>
{:else}
  <NewPoll />
{/if}
