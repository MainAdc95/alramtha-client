import { VOTE_POLL } from "../actionTypes";
import { IPollState, PollActionTypes } from "../types/poll";

const INITIAL_STATE: IPollState = {
    votedPolls: [],
};

const Poll = (state = INITIAL_STATE, action: PollActionTypes): IPollState => {
    switch (action.type) {
        case VOTE_POLL:
            const votedPoll = {
                poll_id: action.pollId,
                option_id: action.optionId,
            };

            localStorage.setItem(
                "votedPolls",
                JSON.stringify([...state.votedPolls, votedPoll])
            );

            return {
                ...state,
                votedPolls: [...state.votedPolls, votedPoll],
            };
        default:
            if (typeof window !== "undefined") {
                var votedPolls: any = localStorage.getItem("votedPolls");
                if (votedPolls) votedPolls = JSON.parse(votedPolls);

                if (votedPolls) {
                    return { ...state, votedPolls: votedPolls };
                }
            }

            return state;
    }
};

export default Poll;
