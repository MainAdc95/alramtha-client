import { VOTE_POLL } from "../actionTypes";

interface IVotePoll {
    type: typeof VOTE_POLL;
    pollId: string;
    optionId: string;
}

export type PollActionTypes = IVotePoll;

export interface IPollState {
    votedPolls: { poll_id: string; option_id: string }[];
}
