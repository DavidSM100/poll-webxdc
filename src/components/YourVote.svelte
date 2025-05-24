<script lang="ts">
  import type { SendingStatusUpdate } from "@webxdc/types";
  import { pollState, activeView } from "../state.svelte";
  import type { NewVote } from "../types";

  let votes = $state(new Array(pollState.poll!.answers.length).fill(false));
  let canVote = $derived(votes.some((val) => val));

  let myVote = pollState.votes[window.webxdc.selfAddr];
  if (myVote) {
    myVote.forEach((val) => {
      votes[val] = true;
    });
  }

  function vote(): void {
    let voteIndexes: number[] = [];
    votes.forEach((val, i) => {
      if (val) {
        voteIndexes.push(i);
      }
    });

    let totalPeople = Object.keys(pollState.votes).length;
    if (!myVote) {
      totalPeople += 1;
    }

    const payload: NewVote = {
      type: "vote",
      sender: window.webxdc.selfAddr,
      votes: voteIndexes,
    };
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
        <input class="checkbox" type="checkbox" bind:checked={votes[i]} />
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
      onclick={vote}
    >
      Vote
    </button>
  </div>
</div>
