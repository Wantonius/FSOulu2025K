import React from 'react';
import type {Action} from '../types/Action';

export interface DispatchInterface {
	dispatch:React.Dispatch<Action>;
}

const ActionContext = React.createContext<DispatchInterface>({
	dispatch:(action:Action) => {}
})

ActionContext.displayName = "ActionContext";

export default ActionContext;