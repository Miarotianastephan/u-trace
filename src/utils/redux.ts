import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FDarkT, spaghetti } from "./function"

export type roleType = 'Administrateur' | 'Caisse' | 'Cuisine'|'Client'
export type usersType = {
    username:string,
    role:roleType,
    id:string
}

const initialState = {
    user:null,
    theme:spaghetti(false),
}
const stateSlice = createSlice({
    name:'state',
    initialState,
    reducers:{
        changeTheme:(state,action:PayloadAction<boolean>) => {
            const thm = action.payload
            FDarkT(thm)
            state.theme = thm
        }
    }
})
export const store = configureStore({
    reducer: stateSlice.reducer
})
type RootState = ReturnType<typeof store.getState>

export const { changeTheme} = stateSlice.actions
export const userState = (state:RootState) => state.user
export const themeState = (state:RootState) => state.theme