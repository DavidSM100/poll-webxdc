export interface Poll {
  question: string,
  answers: string[],
  allowMultipleVotes: boolean,
  allowChangingVotes: boolean,
  time: number
}

export interface NewPoll extends Poll {
  type: "poll"
}

export interface NewVote {
  type: "vote",
  sender: string,
  votes: number[]
}

export interface PollState {
  poll?: Poll,
  votes: {
    [id: string]: number[]
  },
  votesCount: {
    [index: number]: number
  }
  lastserial: number
}