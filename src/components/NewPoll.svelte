<script lang="ts">
  import {
    Trash as TrashIcon,
    Plus as PlusIcon,
    ArrowRight as ArrowRightIcon,
  } from "@lucide/svelte";
  import type { NewPoll } from "../types";
  import type { SendingStatusUpdate } from "@webxdc/types";
  import { Switch } from "@skeletonlabs/skeleton-svelte";

  let question: string = $state("");
  let answers: string[] = $state(["", ""]);
  let allowMultipleVotes = $state(false);
  let validQuestion: string = $derived(question.trim());
  let validAnswers: string[] = $derived(answers.filter((val) => val.trim()));
  let canRemoveAnswer: boolean = $derived(answers.length > 2);
  let canCreatePoll: boolean = $derived(
    validQuestion !== "" && validAnswers.length > 1
  );

  function addAnswer(): void {
    answers.push("");
  }

  function removeAnswer(index: number): void {
    answers.splice(index, 1);
  }

  function createPoll(): void {
    const payload: NewPoll = {
      type: "poll",
      question: validQuestion,
      answers: validAnswers,
      allowMultipleVotes: allowMultipleVotes,
      time: Date.now(),
    };

    const info = `${window.webxdc.selfName} created poll "${validQuestion}"`;
    const update: SendingStatusUpdate<NewPoll> = {
      payload: payload,
      info: info,
      document: validQuestion,
      notify: { "*": info },
    };

    window.webxdc.sendUpdate(update, "");
  }
</script>

<div class="space-y-4">
  <h4 class="h4">New Poll</h4>
  <div>
    <label class="label">
      <span class="text-xs">Question</span>
      <input
        class="input"
        type="text"
        placeholder="Ask a question"
        bind:value={question}
      />
    </label>
  </div>

  <div class="space-y-1">
    <div class="text-xs">Answer</div>
    {#each answers, i}
      <div class="flex space-x-1">
        <input
          class="input"
          type="text"
          placeholder="Option"
          bind:value={answers[i]}
        />
        <button
          class="btn-icon preset-outlined-surface-500"
          disabled={!canRemoveAnswer}
          onclick={() => removeAnswer(i)}
        >
          <TrashIcon />
        </button>
      </div>
    {/each}
    <div>
      <button class="btn preset-outlined-surface-500" onclick={addAnswer}>
        <PlusIcon />
        Add answer
      </button>
    </div>
  </div>

  <div class="space-y-1">
    <div class="text-xs">Settings</div>
    <div>
      <label class="flex justify-between select-none">
        Allow multiple votes
        <Switch
          checked={allowMultipleVotes}
          onCheckedChange={(e) => (allowMultipleVotes = e.checked)}
        />
      </label>
    </div>
  </div>

  <div>
    <button
      class="btn preset-filled-primary-500"
      disabled={!canCreatePoll}
      onclick={createPoll}
    >
      Create
      <ArrowRightIcon />
    </button>
  </div>
</div>
