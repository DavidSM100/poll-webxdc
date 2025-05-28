<script lang="ts">
  import type { SendingStatusUpdate } from "@webxdc/types";
  import { pollState, activeView } from "../state.svelte";
  import type { NewVote } from "../types";

  let myVote = pollState.votes[window.webxdc.selfAddr];
  let votes: number[] = $state(myVote || []);
  let vote = $state(myVote && myVote[0]);
  let canVote = $derived.by(() => {
    if (pollState.poll!.allowMultipleVotes) {
      return votes.length > 0;
    } else {
      return vote !== undefined;
    }
  });

  function sendVote(): void {
    let totalPeople = Object.keys(pollState.votes).length;
    if (!myVote) {
      totalPeople += 1;
    }

    const payload: NewVote = {
      type: "vote",
      sender: window.webxdc.selfAddr,
      votes: votes,
    };
    if (!pollState.poll!.allowMultipleVotes) {
      payload.votes = [vote!];
    }

    const update: SendingStatusUpdate<NewVote> = {
      payload: payload,
      summary: totalPeople + " people voted",
    };

    window.webxdc.sendUpdate(update, "");
    activeView.active = "results";
  }
</script>

<div class="space-y-4">
  <div class="space-y-2">
    {#each pollState.poll!.answers as answer, i}
      <label class="flex items-center space-x-2 select-none">
        {#if pollState.poll!.allowMultipleVotes}
          <input
            class="checkbox"
            type="checkbox"
            value={i}
            bind:group={votes}
          />
        {:else}
          <input class="radio" type="radio" value={i} bind:group={vote} />
        {/if}
        <span>{answer}</span>
      </label>
    {/each}
  </div>
  <div class="flex justify-between">
    <button
      class="btn preset-outlined-surface-500"
      onclick={() => (activeView.active = "results")}
    >
      View Results
    </button>
    <button
      class="btn preset-filled-primary-500"
      disabled={!canVote}
      onclick={sendVote}
    >
      Vote
    </button>
  </div>
</div>
