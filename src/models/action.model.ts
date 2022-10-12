import {Action} from "../constants/action.enum";
import {WordleModel} from "./wordle.model";

export type ActionModel = {
    type: Action,
    payload?: Partial<WordleModel>,
}