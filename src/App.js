import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Header from './components/header/Header'
import ScrollToTop from './components/ScrollToTop'
import Footer from "./components/footer/Footer";
import NotFound from './components/NotFound';
import MovieDetail from "./components/movie/MovieDetail";
import WatchMovie from "./components/movie/WatchMovie";
import TvDetail from "./components/tv/TvDetail";
import WatchTv from "./components/tv/WatchTv";
import MyAccount from "./components/MyAccount";
import SeasonEpisodes from "./components/tv/SeasonEpisodes";
import Watchlist from "./components/watchlist/Watchlist";
import LoginScreen from "./components/authorization/LoginScreen";
import ChannelPage from "./components/channels/ChannelPage";
import WatchRelatedContent from "./components/relatedContent/WatchRelatedContent";

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <LoginScreen />
        <Header />
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/watchlist" component={Watchlist} />
          <Route exact path="/not-found" component={NotFound} />
          <Route exact path="/my-account" component={MyAccount} />
          <Route exact path="/channel/:channel_name" component={ChannelPage} />
          <Route exact path="/movie/:movie_name/:movie_id" component={MovieDetail} />
          <Route exact path="/movie/:movie_name/:movie_id/watch" component={WatchMovie} />
          <Route exact path="/tv/:tv_name/:show_id" component={TvDetail} />
          <Route exact path="/tv/:tv_name/:show_id/list/season/:season_no" component={SeasonEpisodes} />
          <Route exact path="/tv/:tv_name/:show_id/watch/se/:season_no/ep/:episode_no" component={WatchTv} />
          <Route exact path="/:parent_content_type/:content_name/:parent_content_id/related-content/:content_type/:content_id" component={WatchRelatedContent} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
