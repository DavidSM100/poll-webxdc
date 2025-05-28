import type { PollState, NewPoll, NewVote } from "./types";
import type { ReceivedStatusUpdate } from "@webxdc/types";

export let pollState: PollState = $state({ lastserial: 0, votes: {}, votesCount: {} });
export let activeView: { active: "yourvote" | "results" } = $state({ active: "yourvote" });

let rawSavedState = localStorage.getItem("state");
if (rawSavedState) {
  const savedState: PollState = JSON.parse(rawSavedState);
  pollState.poll = savedState.poll;
  pollState.votes = savedState.votes;
  pollState.votesCount = savedState.votesCount;
  pollState.lastserial = savedState.lastserial;
}

window.webxdc.setUpdateListener(onUpdate, pollState.lastserial);

function onUpdate(update: ReceivedStatusUpdate<NewPoll | NewVote>): void {
  const payload = update.payload;
  if (payload.type === "poll") {
    onNewPoll(payload);
  } else {
    onNewVote(payload);
  }

  if (update.serial === update.max_serial) {
    pollState.lastserial = update.serial;
    localStorage.setItem("state", JSON.stringify(pollState));
  }
}

function onNewPoll(poll: NewPoll) {
  if (pollState.poll && pollState.poll.time < poll.time) {
    return;
  }
  pollState.poll = {
    question: poll.question,
    answers: poll.answers,
    allowMultipleVotes: poll.allowMultipleVotes,
    time: poll.time,
  }
}

function onNewVote(vote: NewVote) {
  const previosVote = pollState.votes[vote.sender];
  if (previosVote) {
    // If user already voted, remove vote from the count
    previosVote.forEach((index) => {
      pollState.votesCount[index] -= 1;
    });
  }

  pollState.votes[vote.sender] = vote.votes;
  vote.votes.forEach((index) => {
    if (!pollState.votesCount[index]) {
      pollState.votesCount[index] = 1;
    } else {
      pollState.votesCount[index] += 1;
    }
  })
}

