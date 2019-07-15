import React from 'react';
import { Store } from './Store';
import { IEpisode, IAction, IEpisodeProps } from './interfaces';

const EpisodesList = React.lazy<any>(() => import('./EpisodesList'))

const HomePage = () => {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction()
  })

  const fetchDataAction = async () => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes');
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    });
  }

  const toggleFavAction = (episode: IEpisode): IAction => {
    const episodeInFav = state.favourites.includes(episode);

    let dispatchObj = {
      type: 'ADD_FAV',
      payload: episode
    }

    if (episodeInFav) {
      const favWithoutEpisode = state.favourites.filter((fav: IEpisode) => fav.id !== episode.id)
      dispatchObj = {
        type: 'REMOVE_FAV',
        payload: favWithoutEpisode
      }
    }

    return dispatch(dispatchObj);
  }

  const props: IEpisodeProps = {
    episodes: state.episodes,
    toggleFavAction,
    favourites: state.favourites
  }

  return (
    <React.Fragment>
      <React.Suspense fallback={<div>loading...</div>}>
        <section className="episode-layout">
          <EpisodesList {...props} />
        </section>
      </React.Suspense>
    </React.Fragment>
  )
}

export default HomePage;
