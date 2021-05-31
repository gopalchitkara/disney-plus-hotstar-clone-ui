import { createSlice } from '@reduxjs/toolkit'

export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: {
        items: []
    },
    reducers: {
        loadInitialWatchlistState: (state, { payload }) => {
            if (payload && payload !== null) {
                let _items = [];
                payload.forEach(x => {
                    if (x.contentType && x.contentType !== "" && x.id && x.id !== "") {
                        _items.push({
                            id: parseInt(x.id),
                            contentType: x.contentType,
                            title: x.title ? x.title : "item title",
                            titleClean: x.titleClean ? x.titleClean : "item-title-clean",
                            decription: x.description ? x.description : "",
                            subInfo: x.subInfo && x.subInfo.length > 0 ? x.subInfo : [],
                            premium: x.premium ? x.premium : false,
                            images: x.images ? x.images : [],
                            showId: x.showId ? parseInt(x.showId) : null,
                            seasonNumber: x.seasonNumber ? parseInt(x.seasonNumber) : null,
                            episodeNumber: x.episodeNumber ? parseInt(x.episodeNumber) : null,
                        })
                    }
                });

                state.items = _items;
            }
        },
        addToWatchlist: (state, { payload }) => {
            const { data } = payload;
            console.log({ data })
            console.log("adding new item to watchlist. id:" + data.id + " and type: " + data.contentType);
            let _item = state.items.find(x => x.id === parseInt(data.id));
            if (!_item && data.id && data.contentType && data.contentType !== "") {
                state.items.unshift({
                    id: parseInt(data.id),
                    contentType: data.contentType,
                    title: data.title ? data.title : "item title",
                    titleClean: data.titleClean ? data.titleClean : "item-title-clean",
                    description: data.description ? data.description : "",
                    subInfo: data.subInfo && data.subInfo.length > 0 ? data.subInfo : [],
                    premium: data.premium ? data.premium : false,
                    images: data.images ? data.images : [],
                    showId: data.showId ? parseInt(data.showId) : null,
                    seasonNumber: data.seasonNumber ? parseInt(data.seasonNumber) : null,
                    episodeNumber: data.episodeNumber ? parseInt(data.episodeNumber) : null,
                });
            }

            window.localStorage.setItem('watchlistLocalState', JSON.stringify(state.items));
        },
        removeFromWatchlist: (state, { payload }) => {
            console.log("removing item from watchlist. id:" + payload.id);
            let _items = state.items.filter(x => x.id !== parseInt(payload.id));
            console.log({ _items })
            state.items = _items;

            window.localStorage.setItem('watchlistLocalState', JSON.stringify(state.items));
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToWatchlist, removeFromWatchlist, loadInitialWatchlistState } = watchlistSlice.actions

export default watchlistSlice.reducer