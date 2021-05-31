import { createSlice } from '@reduxjs/toolkit'

export const currentlyWatchingSlice = createSlice({
    name: 'currentlyWatching',
    initialState: {
        items: []
    },
    reducers: {
        loadInitialState: (state, { payload }) => {
            if (payload && payload !== null) {
                let items = [];
                payload.forEach(x => {
                    if (x.contentType && x.contentType !== "" && x.contentId && x.contentId !== "") {
                        items.push({
                            contentId: x.contentId,
                            contentType: x.contentType,
                            showId: x.showId,
                            duration: x.duration ? x.duration : 0,
                            timeWatched: x.timeWatched ? x.timeWatched : 0
                        })
                    }
                });

                state.items = items;
            }
        },
        addToCurrentlyWatching: (state, { payload: { contentId, contentType, duration, showId } }) => {
            console.log(`adding ${contentType} with id ${contentId} to currently watching. duration: ${duration} and showId: ${showId}`);

            if (contentType === "movie") {
                let _movie = state.items.find(x => x.contentType === "movie" && x.contentId === parseInt(contentId));

                if (!_movie) {
                    console.log("adding the new movie")
                    state.items.unshift({
                        contentId: parseInt(contentId),
                        contentType: contentType,
                        showId: null,
                        duration: parseInt(duration),
                        timeWatched: 0
                    })
                }
            } else if (contentType === "episode") {
                let _episode = state.items.find(x => x.contentType === "episode" && x.showId !== null && parseInt(x.showId) === parseInt(showId));

                let newData = {
                    contentId: parseInt(contentId),
                    contentType: contentType,
                    showId: parseInt(showId),
                    duration: parseInt(duration),
                    timeWatched: 0
                }

                if (_episode) {
                    let otherItems = state.items.filter(x => x.contentId !== _episode.contentId)
                    state.items = [newData, ...otherItems];
                } else {
                    state.items.unshift(newData);
                }
            }

            window.localStorage.setItem('currentlyWatchingLocalState', JSON.stringify(state.items));
        },
        removeFromCurrentlyWatching: (state, { payload: { contentId } }) => {
            console.log(`removing from currently watching id: ${contentId}`);
            state.items = state.items.filter(x => x.contentId !== parseInt(contentId));

            window.localStorage.setItem('currentlyWatchingLocalState', JSON.stringify(state.items));
        },
        updateTimeWatched: (state, { payload: { contentId, timeWatched } }) => {
            // console.log(`updating time of currently watching id: ${contentId} ${timeWatched}`);
            console.log(`updating time of currently watching id: ${contentId}`);
            if (state.items && state.items.length > 0) {
                let itemToUpdate = state.items.find(x => x.contentId === parseInt(contentId));

                if (itemToUpdate && timeWatched < itemToUpdate.duration) {
                    itemToUpdate.timeWatched = timeWatched;
                    let otherItems = state.items.filter(x => x.contentId !== parseInt(contentId));
                    state.items = [itemToUpdate, ...otherItems];
                } else if (itemToUpdate && timeWatched >= itemToUpdate.duration) {
                    state.items = state.items.filter(x => x.contentId !== parseInt(contentId));;
                }
            }

            window.localStorage.setItem('currentlyWatchingLocalState', JSON.stringify(state.items));
        }
    },
})

// Action creators are generated for each case reducer function
export const { loadInitialState, addToCurrentlyWatching, removeFromCurrentlyWatching, updateTimeWatched } = currentlyWatchingSlice.actions

export default currentlyWatchingSlice.reducer