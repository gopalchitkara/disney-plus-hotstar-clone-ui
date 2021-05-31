import { createServer, Model, hasMany, belongsTo } from "miragejs"
import {
    channels, movies, shows, seasons, episodes,
    trailers, extras, bonusContent, featuredContentIds, homePageTrays,
    disneyChannelTrays, pixarChannelTrays, marvelChannelTrays, starWarsChannelTrays,
    natGeoChannelTrays, hotstarChannelTrays
} from './db';

createServer({
    models: {
        channel: Model,
        movie: Model,
        show: Model,
        season: Model,
        episode: Model,
        trailer: Model,
        extra: Model,
        bonusContent: Model,
        featuredContent: Model,
        homePageTray: Model,
        disneyChannelTray: Model,
        pixarChannelTray: Model,
        marvelChannelTray: Model,
        starWarsChannelTray: Model,
        natGeoChannelTray: Model,
        hotstarChannelTray: Model
    },

    seeds(server) {
        channels.forEach(c => { server.create("channel", c) });
        movies.forEach(m => { server.create("movie", m) });
        shows.forEach(s => { server.create("show", s) });
        seasons.forEach(s => { server.create("season", s) });
        episodes.forEach(e => { server.create("episode", e) });
        trailers.forEach(t => { server.create("trailer", t) });
        extras.forEach(e => { server.create("extra", e) });
        bonusContent.forEach(b => { server.create("bonusContent", b) });
        homePageTrays.forEach(t => { server.create("homePageTray", t) });
        featuredContentIds.forEach(f => { server.create("featuredContent", f) });
        disneyChannelTrays.forEach(c => { server.create("disneyChannelTray", c) });
        pixarChannelTrays.forEach(c => { server.create("pixarChannelTray", c) });
        marvelChannelTrays.forEach(c => { server.create("marvelChannelTray", c) });
        starWarsChannelTrays.forEach(c => { server.create("starWarsChannelTray", c) });
        natGeoChannelTrays.forEach(c => { server.create("natGeoChannelTray", c) });
        hotstarChannelTrays.forEach(c => { server.create("hotstarChannelTray", c) });

    },

    routes() {
        this.namespace = "/api"

        // Channels
        this.get("/channels", (schema, request) => {
            return schema.channels.all()
        });

        // Movies 
        this.get("/movies", (schema, request) => {
            return schema.movies.all()
        });

        this.get("/movies/:id", (schema, request) => {
            let id = request.params.id
            return schema.movies.find(id)
        });

        this.get("/movie/:id/card/:orientation", (schema, request) => {
            let id = request.params.id;
            let orientation = request.params.orientation;
            let movie = schema.movies.find(id);

            if (!movie) return { content: null };

            let movieData = {
                id: movie.id,
                contentType: movie.contentType,
                title: movie.title,
                titleClean: movie.titleClean,
                description: movie.description,
                subInfo: [
                    movie.genre,
                    movie.yearOfRelease,
                    movie.channelName
                ],
                premium: movie.premium,
                thumbnailUrl: orientation === "v" ? movie.images.v : movie.images.h,
                // targetUrl: `/movie/${movie.titleClean}/${movie.id}`,
            };

            return { content: movieData }
        });

        this.get("/movies/:id/trailers", (schema, request) => {
            let movieId = request.params.id
            let movie = schema.movies.find(movieId);
            let trailers = []

            if (movie !== null) {
                const { trailers: trailerIds } = movie
                if (trailerIds && trailerIds.length > 0) {
                    trailerIds.forEach(t => {
                        let _t = schema.trailers.find(t);
                        if (_t) trailers.push({
                            // id: _t.attrs.id,
                            // contentType: _t.attrs.contentType,
                            ..._t.attrs,
                            parentTitle: movie.title,
                            parentTitleClean: movie.titleClean
                        });
                    })
                }
            }

            return { trailers };

            // let trailers = schema.trailers.where(x => x.parentContentType === "movie" && x.parentContentId === parseInt(movieId))
            // let trailerModels = [];
            // if (trailers && trailers.models && trailers.models.length > 0) {
            //     trailers.models.forEach(x => trailerModels.push(x.attrs))
            // }
            // return { trailers: trailerModels };
        });

        this.get("/movies/:id/extras", (schema, request) => {
            let movieId = request.params.id
            let movie = schema.movies.find(movieId);
            let extras = []

            if (movie !== null) {
                const { extras: extraIds } = movie
                if (extraIds && extraIds.length > 0) {
                    extraIds.forEach(e => {
                        let _e = schema.extras.find(e);
                        if (_e) extras.push({
                            // id: _e.attrs.id,
                            // contentType: _e.attrs.contentType,
                            ..._e.attrs,
                            parentTitle: movie.title,
                            parentTitleClean: movie.titleClean
                        });
                    })
                }
            }

            return { extras };
        });

        this.get("/movies/:id/bonus", (schema, request) => {
            let movieId = request.params.id
            let movie = schema.movies.find(movieId);
            let bonuses = []

            if (movie !== null) {
                const { bonus: bonusdIds } = movie
                if (bonusdIds && bonusdIds.length > 0) {
                    bonusdIds.forEach(b => {
                        let _b = schema.bonusContents.find(b);
                        if (_b) bonuses.push({
                            // id: _b.attrs.id,
                            // contentType: _b.attrs.contentType,
                            ..._b.attrs,
                            parentTitle: movie.title,
                            parentTitleClean: movie.titleClean
                        });
                    })
                }
            }

            return { bonuses };
        });

        // Shows
        this.get("/shows", (schema, request) => {
            return schema.shows.all()
        });

        this.get("/shows/:id", (schema, request) => {
            let id = request.params.id
            return schema.shows.find(id)
        });

        this.get("/show/:id/card/:orientation", (schema, request) => {
            let id = request.params.id;
            let orientation = request.params.orientation;
            let show = schema.shows.find(id);

            if (!show) return { content: null };

            let showData = {
                id: show.id,
                contentType: show.contentType,
                title: show.title,
                titleClean: show.titleClean,
                description: show.description,
                subInfo: [
                    show.genre,
                    show.language,
                    show.channelName
                ],
                premium: show.premium,
                thumbnailUrl: orientation === "v" ? show.images.v : show.images.h,
                // targetUrl: `/tv/${show.titleClean}/${show.id}`,
            }

            return { content: showData }
        });

        this.get("/shows/:id/trailers", (schema, request) => {
            let showId = request.params.id
            let show = schema.shows.find(showId);
            let trailers = []

            if (show !== null) {
                const { trailers: trailerIds } = show
                if (trailerIds && trailerIds.length > 0) {
                    trailerIds.forEach(t => {
                        let _t = schema.trailers.find(t);
                        if (_t) trailers.push({
                            id: _t.attrs.id,
                            contentType: _t.attrs.contentType,
                        });
                    })
                }
            }

            return { trailers };
        });

        this.get("/shows/:id/extras", (schema, request) => {
            let showId = request.params.id
            let show = schema.shows.find(showId);
            let extras = []

            if (show !== null) {
                const { extras: extraIds } = show
                if (extraIds && extraIds.length > 0) {
                    extraIds.forEach(e => {
                        let _e = schema.extras.find(e);
                        if (_e) extras.push({
                            id: _e.attrs.id,
                            contentType: _e.attrs.contentType,
                        });
                    })
                }
            }

            return { extras };
        });

        this.get("/shows/:id/bonus", (schema, request) => {
            let showId = request.params.id
            let show = schema.shows.find(showId);
            let bonuses = []

            if (show !== null) {
                const { bonus: bonusdIds } = show
                if (bonusdIds && bonusdIds.length > 0) {
                    bonusdIds.forEach(b => {
                        let _b = schema.bonusContents.find(b);
                        if (_b) bonuses.push({
                            id: _b.attrs.id,
                            contentType: _b.attrs.contentType,
                        });
                    })
                }
            }

            return { bonuses };
        });

        // Seasons
        this.get("/seasons", (schema, request) => {
            return schema.seasons.all()
        });

        this.get("/seasons/:id", (schema, request) => {
            let id = request.params.id
            return schema.seasons.find(id)
        });

        this.get("/shows/:id/seasons", (schema, request) => {
            let showId = request.params.id
            let show = schema.shows.find(showId);
            let data = schema.seasons.where({ showId: showId });

            let seasonsData = {
                title: "Seasons",
                items: data.models.map(x => {
                    return ({
                        id: x.attrs.id,
                        showId: showId,
                        seasonNumber: x.seasonNumber,
                        contentType: x.attrs.contentType,
                        images: x.attrs.images,
                        parentTitleClean: show.titleClean
                    })
                }),
                orientation: "horizontal"
            }

            return { seasons: seasonsData };
        });

        this.get("/shows/:id/seasons/:seasonNumber", (schema, request) => {
            let showId = request.params.id
            let seasonNumber = request.params.seasonNumber
            let data = schema.seasons.where({ showId: showId, seasonNumber: seasonNumber });

            if (data && data.models[0].id)
                return { season: data.models[0] };
            else
                return { season: null };
        });

        this.get("/shows/:id/seasons/:seasonNumber/episode/:episodeNumber", (schema, request) => {
            let showId = request.params.id
            let seasonNumber = request.params.seasonNumber
            let episodeNumber = request.params.episodeNumber
            let show = schema.shows.find(showId);
            let episode = schema.episodes.where({ showId: showId, seasonNumber: seasonNumber, episodeNumber: episodeNumber });

            if (episode && episode.models[0].id)
                return {
                    episode: {
                        ...episode.models[0].attrs,
                        showTitle: show.title,
                        showChannelName: show.channelName,
                        showCensorRating: show.censorRating
                    }
                };
            else
                return { episode: null };
        });

        this.get("/season/:id/card/:orientation", (schema, request) => {
            let id = request.params.id;
            let orientation = request.params.orientation;
            let season = schema.seasons.find(id);
            let show = schema.shows.find(season.showId);

            if (!season) return { content: null };

            let seasonData = {
                id: season.id,
                contentType: season.contentType,
                title: season.title,
                titleClean: season.titleClean,
                description: show.description,
                subInfo: [
                    show.genre,
                    show.language,
                    show.channelName
                ],
                premium: show.premium,
                thumbnailUrl: orientation === "v" ? season.images.v : season.images.h,
                showId: show.id,
                showTitleClean: show.titleClean,
                seasonNumber: season.seasonNumber,
                // targetUrl: `/tv/${show.titleClean}/${show.id}/list/season/${season.seasonNumber}`,
            }

            return { content: seasonData }
        });

        // Episodes
        this.get("/episodes", (schema, request) => {
            return schema.episodes.all()
        });

        this.get("/episodes/:id", (schema, request) => {
            let id = request.params.id
            let episode = schema.episodes.find(id);
            if (!episode) return { episode: null }

            let show = schema.shows.find(episode.showId);
            if (!show) return { episode: null }

            return {
                episode: {
                    ...episode.attrs,
                    showTitle: show && show.title ? show.title : "",
                    showTitleClean: show && show.titleClean ? show.titleClean : ""
                }
            }
        });

        this.get("/shows/:id/episodes", (schema, request) => {
            let showId = request.params.id
            let show = schema.shows.find(showId);
            let data = schema.episodes.where({ showId: showId });

            let episodesData = {
                title: "Episodes",
                items: data.models.map(x => {
                    return ({
                        id: x.attrs.id,
                        showId: showId,
                        seasonNumber: x.seasonNumber,
                        episodeNumber: x.episodeNumber,
                        contentType: x.attrs.contentType,
                        parentTitleClean: show.titleClean,
                        images: x.attrs.images
                    })
                }),
                orientation: "horizontal"
            }

            return { episodes: episodesData };
        });

        this.get("/shows/:id/seasons/:seasonNumber/episodes", (schema, request) => {
            let showId = request.params.id
            let seasonNumber = request.params.seasonNumber
            let show = schema.shows.findBy({ id: showId });
            let data = schema.episodes.where({ showId: showId, seasonNumber: seasonNumber });

            if (show && show.id && data) {
                let seasonEpisodes = {
                    showId: showId,
                    showTitle: show.title,
                    showTitleClean: show.titleClean,
                    seasonTitle: "Season " + seasonNumber,
                    items: data.models.map(x => {
                        return {
                            id: x.attrs.id,
                            contentType: x.attrs.contentType,
                            title: x.attrs.title,
                            titleClean: x.attrs.titleClean,
                            seasonNumber: x.attrs.seasonNumber,
                            episodeNumber: x.attrs.episodeNumber,
                            description: x.attrs.description,
                            thumbnailUrl: x.attrs.images.h,
                        }
                    }),
                    orientation: "horizontal"
                }
                return { episodes: seasonEpisodes };
            }
            return { episodes: null };
        });

        this.get("/episode/:episodeId/card/:orientation", (schema, request) => {
            let episodeId = request.params.episodeId;
            let orientation = request.params.orientation;
            let episode = schema.episodes.find(episodeId);
            let show = schema.shows.find(episode.showId);

            if (!episode) return { content: null };

            let episodeData = {
                id: episode.id,
                contentType: episode.contentType,
                title: episode.title,
                titleClean: episode.titleClean,
                description: show.description,
                subInfo: [
                    episode.dayOfRelease + " " + episode.monthOfRelease + " " + episode.yearOfRelease
                ],
                premium: show.premium,
                thumbnailUrl: orientation === "v" ? episode.images.v : episode.images.h,
                seasonNumber: episode.seasonNumber,
                episodeNumber: episode.episodeNumber,
                showTitleClean: show.titleClean,
                showId: show.id,
                // targetUrl: `/tv/${show.titleClean}/${show.id}/watch/se/${episode.seasonNumber}/ep/${episode.episodeNumber}`,
            }

            return { content: episodeData }
        });

        // Trailer
        this.get("/trailers", (schema, request) => {
            return schema.trailers.all()
        });

        this.get("/trailers/:id", (schema, request) => {
            let id = request.params.id
            return schema.trailers.find(id)
        });

        this.get("/trailer/:id/card/:orientation", (schema, request) => {
            let id = request.params.id;
            let orientation = request.params.orientation;
            let trailer = schema.trailers.find(id);
            let parentContentType = trailer.parentContentType;
            let parentContent;

            if (!trailer) return { content: null };

            if (parentContentType === "movie") {
                parentContent = schema.movies.find(trailer.parentContentId)
            } else if (parentContentType === "show") {
                parentContent = schema.shows.find(trailer.parentContentId)
            }

            let trailerData = {
                id: trailer.id,
                contentType: trailer.contentType,
                title: trailer.title,
                titleClean: trailer.titleClean,
                description: parentContent.description,
                subInfo: [],
                premium: parentContent.premium,
                thumbnailUrl: orientation === "v" ? trailer.images.v : trailer.images.h,
                parentContentType: parentContentType,
                parentId: parentContent.id,
                parentTitleClean: parentContent.titleClean,
                // targetUrl: parentContentType === "show"
                //     ? `/movie/${parentContent.titleClean}/${parentContent.id}/related-content/trailer/${trailer.id}`
                //     : `/tv/${parentContent.titleClean}/${parentContent.id}/related-content/trailer/${trailer.id}`
            };

            return { content: trailerData }
        });

        // Extra
        this.get("/extras", (schema, request) => {
            return schema.extras.all()
        });

        this.get("/extras/:id", (schema, request) => {
            let id = request.params.id
            return schema.extras.find(id)
        });

        this.get("/extra/:id/card/:orientation", (schema, request) => {
            let id = request.params.id;
            let orientation = request.params.orientation;
            let extra = schema.extras.find(id);
            let parentContentType = extra.parentContentType;
            let parentContent;

            if (!extra) return { content: null };

            if (parentContentType === "movie") {
                parentContent = schema.movies.find(extra.parentContentId)
            } else if (parentContentType === "show") {
                parentContent = schema.shows.find(extra.parentContentId)
            }

            let extraData = {
                id: extra.id,
                contentType: extra.contentType,
                title: extra.title,
                titleClean: extra.titleClean,
                description: parentContent.description,
                subInfo: [],
                premium: parentContent.premium,
                thumbnailUrl: orientation === "v" ? extra.images.v : extra.images.h,
                parentContentType: parentContentType,
                parentId: parentContent.id,
                parentTitleClean: parentContent.titleClean,
                // targetUrl: contentType === "show",
                //     ? `/movie/${parentContent.titleClean}/${parentContent.id}/related-content/extra/${extra.id}`
                //     : `/tv/${parentContent.titleClean}/${parentContent.id}/related-content/extra/${extra.id}`
            };

            return { content: extraData }
        });

        // BonusContent
        this.get("/bonus", (schema, request) => {
            return schema.bonusContents.all()
        });

        this.get("/bonus/:id", (schema, request) => {
            let id = request.params.id
            return schema.bonusContents.find(id)
        });

        this.get("/bonus/:id/card/:orientation", (schema, request) => {
            let id = request.params.id;
            let orientation = request.params.orientation;
            let bonus = schema.bonusContents.find(id);
            let parentContentType = bonus.parentContentType;
            let parentContent;

            if (!bonus) return { content: null };

            if (parentContentType === "movie") {
                parentContent = schema.movies.find(bonus.parentContentId)
            } else if (parentContentType === "show") {
                parentContent = schema.shows.find(bonus.parentContentId)
            }

            let bonusData = {
                id: bonus.id,
                contentType: bonus.contentType,
                title: bonus.title,
                titleClean: bonus.titleClean,
                description: parentContent.description,
                subInfo: [],
                premium: parentContent.premium,
                thumbnailUrl: orientation === "v" ? bonus.images.v : bonus.images.h,
                parentContentType: parentContentType,
                parentId: parentContent.id,
                parentTitleClean: parentContent.titleClean,
                // targetUrl: contentType === "show"
                //     ? `/movie/${parentContent.titleClean}/${parentContent.id}/related-content/bonus/${bonus.id}`
                //     : `/tv/${parentContent.titleClean}/${parentContent.id}/related-content/bonus/${bonus.id}`
            };

            return { content: bonusData }
        });

        // Featured Content
        this.get("/featured-content", (schema, request) => {

            let featuredContentIds = schema.featuredContents.all();
            let featuredContent = [];

            featuredContentIds.models.forEach(content => {
                let { id, contentType } = content;
                if (contentType === "movie") {
                    let movie = schema.movies.find(id)
                    if (movie) {
                        featuredContent.push({
                            id: movie.id,
                            contentType: "movie",
                            title: movie.title,
                            titleClean: movie.titleClean,
                            description: movie.description,
                            genre: movie.genre,
                            yearOfRelease: movie.yearOfRelease,
                            channelName: movie.channelName,
                            premium: movie.premium,
                            bannerImagePath: movie.images.b !== "" ? movie.images.b : movie.images.h,
                            // targetUrl: `/movie/${movie.titleClean}/${movie.id}`
                        })
                    }
                } else if (contentType === "show") {
                    let show = schema.shows.find(id)
                    if (show) {
                        featuredContent.push({
                            id: show.id,
                            contentType: "show",
                            title: show.title,
                            titleClean: show.titleClean,
                            description: show.description,
                            genre: show.genre,
                            yearOfRelease: show.yearOfRelease,
                            channelName: show.channelName,
                            premium: show.premium,
                            bannerImagePath: show.images.b !== "" ? show.images.b : show.images.h,
                            // targetUrl: `/tv/${show.titleClean}/${show.id}`
                        })
                    }
                }
            });

            return { featuredContent }

        });

        // Home Page
        this.get("/home-page-trays", (schema, request) => {
            let trays = schema.homePageTrays.all();
            let dataTrays = [];

            if (trays && trays.models.length > 0) {
                trays.models.forEach(tray => {
                    let trayItems = [];
                    tray.attrs.items.forEach(i => {
                        if (i.contentType === "movie") {
                            let movie = schema.movies.find(i.id);
                            if (movie) trayItems.push(movie);
                        } else if (i.contentType === "show") {
                            let show = schema.shows.find(i.id);
                            if (show) trayItems.push(show);
                        }
                    });

                    if (trayItems.length > 0) {
                        dataTrays.push({
                            title: tray.title,
                            items: trayItems,
                            orientation: tray.orientation
                        });
                    }
                });
            }

            if (dataTrays.length > 0)
                return { trays: dataTrays }

            return { trays: null }
        });

        // Channel content
        this.get("/channel/:channelName/trays", (schema, request) => {
            let channelName = request.params.channelName;
            let trays;

            switch (channelName) {
                case "disney":
                    trays = schema.disneyChannelTrays.all();
                    break;
                case "pixar":
                    trays = schema.pixarChannelTrays.all();
                    break;
                case "marvel":
                    trays = schema.marvelChannelTrays.all();
                    break;
                case "star-wars":
                    trays = schema.starWarsChannelTrays.all();
                    break;
                case "nat-geo":
                    trays = schema.natGeoChannelTrays.all();
                    break;
                case "hotstar":
                    trays = schema.hotstarChannelTrays.all();
                    break;
                default:
                    trays = null;
                    break;
            }

            if (!trays || trays === null || !trays.models || !trays.models.length > 0) return { content: null }

            let contentItemTrays = [];

            trays.models.forEach(tray => {
                let contentItems = [];
                tray.attrs.items.forEach(item => {
                    if (item.contentType === "movie") {
                        let movie = schema.movies.find(item.id);
                        if (movie) {
                            contentItems.push({
                                id: movie.id,
                                contentType: movie.contentType,
                                title: movie.title,
                                titleClean: movie.titleClean,
                                description: movie.description,
                                genre: movie.genre,
                                yearOfRelease: movie.yearOfRelease,
                                channelName: movie.channelName,
                                premium: movie.premium,
                                images: movie.images
                            });
                        }
                    } else if (item.contentType === "show") {
                        let show = schema.shows.find(item.id);
                        if (show) {
                            contentItems.push({
                                id: show.id,
                                contentType: show.contentType,
                                title: show.title,
                                titleClean: show.titleClean,
                                description: show.description,
                                genre: show.genre,
                                language: show.language,
                                channelName: show.channelName,
                                premium: show.premium,
                                images: show.images
                            });
                        }
                    }
                });
                contentItemTrays.push({
                    title: tray.title,
                    items: contentItems,
                    orientation: tray.orientation
                })
            });

            if (contentItemTrays.length > 0)
                return { content: contentItemTrays }
            else
                return { content: null }
        });

        // Similar Content
        this.get("/movies/:movieId/similar-content", (schema, request) => {
            let movieId = request.params.movieId;
            let similarContent;

            let movie = schema.movies.find(movieId);
            if (movie && movie.attrs) {
                let similarMovies = schema.movies.where(x => x.id !== movieId
                    && (x.genre === movie.attrs.genre || x.channelNameClean === movie.attrs.channelNameClean));
                if (similarMovies && similarMovies.models) {
                    similarContent = similarMovies.models;
                    shuffleArray(similarContent)
                    return { similarContent }
                }
            }

            return { similarContent: null }
        });

        this.get("/shows/:showId/similar-content", (schema, request) => {
            let showId = request.params.showId;
            let similarContent;

            let show = schema.shows.find(showId);
            if (show && show.attrs) {
                let similarShows = schema.shows.where(x => x.id !== showId
                    && (x.genre === show.attrs.genre || x.channelNameClean === show.attrs.channelNameClean));
                if (similarShows && similarShows.models) {
                    similarContent = similarShows.models;
                    shuffleArray(similarContent)
                    return { similarContent }
                }
            }

            return { similarContent: null }
        });
    },
})

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}