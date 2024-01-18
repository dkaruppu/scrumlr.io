import {Action, ReduxAction} from "store/action";
import {ConfluencePageState} from "types/confluencePage";

export const confluencePageReducer = (state: ConfluencePageState = "", action: ReduxAction): ConfluencePageState => {
  if (action.type === Action.AddPage) {
    return action.page;
  }
  if (action.type === Action.DeletePage) {
    return "";
  }
  return state;
};
