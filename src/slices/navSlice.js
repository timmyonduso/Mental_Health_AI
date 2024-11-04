import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {
        id:'user001',
        firstName: "John",
        lastName: "Anonymous",
        name: "Anonymous",
        email: "anonymous@example.com",
        profilePicture: 'https://lh3.googleusercontent.com/a/ACg8ocLdNgEU7XrBIQp8mwgtO75axXXKZ9ztOXJ-H-9CzJv9LYEEkzRj=s96-c', // URL to the profile picture
      },
    mood: null,
    currentTab: {"id": 1, "title": "Mood Tracker"},
    question:null,
    meditation:null,
    assessementResults: null
}

export const navSlice = createSlice({
    name:"nav",
    initialState,
    reducers:{
        setUser: (state, action) =>{
            state.user = action.payload;
        },
        setMood: (state, action) =>{
            state.mood = action.payload;
        },
        setCurrentTab: (state, action) =>{
            state.currentTab = action.payload;
        },
        setQuestion: (state, action) =>{
            state.question = action.payload;
        },
        setMeditation: (state, action) =>{
            state.meditation = action.payload;
        },
        setAssessementResults: (state, action) =>{
            state.assessementResults = action.payload;
        },
    },
});


export const { setUser, setMood, setCurrentTab, setQuestion, setMeditation, setAssessementResults} = navSlice.actions;

//Selectors
export const selectUser = (state) => state.nav.user;
export const selectMood = (state) => state.nav.mood;
export const selectCurrentTab = (state) => state.nav.currentTab;
export const selectQuestion = (state) => state.nav.question;
export const selectMeditation = (state) => state.nav.meditation;
export const selectAssessementResults = (state) => state.nav.assessementResults;

export default navSlice.reducer;