import React from 'react'
import { Store } from './Store';
import { toggleFavAction } from './Actions';
import { IEpisodeProps } from './interfaces';

const EpisodesList = React.lazy<any>(() => import('./EpisodesList'))

const FavPage = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);

  const props: IEpisodeProps = {
    episodes: state.favourites,
    store: { state, dispatch },
    toggleFavAction,
    favourites: state.favourites
  };

  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <div className="episode-layout">
        <EpisodesList {...props} />
      </div>
    </React.Suspense>
  );
}

export default FavPage
