import { PollActionTypes } from "../types/poll";

export const votePoll = (pollId, optionId): PollActionTypes => ({
    type: "VOTE_POLL",
    pollId,
    optionId,
});
