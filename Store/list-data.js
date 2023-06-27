import { createSlice } from "@reduxjs/toolkit";

const initialListState = {
    inbox : [],
    sent : []
}

const listdataSlice = createSlice({
    name : 'listdata',
    initialState : initialListState,
    reducers : {
        inboxEmail(state, action){
          const updatedEmails = state.inbox.concat({
            ...action.payload.mail,
            id: action.payload.id,
          });
    
          state.inbox = updatedEmails;
        }
    }
})

export const listdataActions = listdataSlice.actions;
export default listdataSlice.reducer;