<script lang="ts">
  let {
    answer,
    votes,
    totalVotes,
  }: { answer: string; votes: number; totalVotes: number } = $props();
  let percent = $derived((votes / totalVotes) * 100 || 0);
</script>

<div>
  <div class="flex justify-between items-baseline-last">
    <span>{answer}</span>
    <span class="text-xs">{`${percent.toFixed(0)}% (${votes} votes)`}</span>
  </div>
  <div>
    <progress class="progress" max="100" value={percent}></progress>
  </div>
</div>
