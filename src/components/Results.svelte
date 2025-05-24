<script lang="ts">
  import { pollState, activeView } from "../state.svelte";
  import VoteProgress from "./VoteProgress.svelte";

  let totalVotes = $derived.by(() => {
    let total = 0;
    Object.values(pollState.votesCount).forEach((val) => {
      total += val;
    });
    return total;
  });

  let totalPeople = $derived(Object.keys(pollState.votes).length);
</script>

<div class="space-y-4">
  {#each pollState.poll!.answers as answer, i}
    <VoteProgress {answer} votes={pollState.votesCount[i] || 0} {totalVotes} />
  {/each}

  <div>
    {totalPeople} people voted
  </div>

  <div>
    <button
      class="btn preset-outlined-surface-500"
      onclick={() => (activeView.active = "yourvote")}>Your vote</button
    >
  </div>
</div>
