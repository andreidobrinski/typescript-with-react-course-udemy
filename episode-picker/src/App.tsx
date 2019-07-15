import React from 'react';
import { Store } from './Store';
import './index.css';

interface IEpisode {
  airdate: string,
  airstamp: string,
  airtime: string,
  id: number,
  image: {medium: string, original: string},
  name: string,
  number: number,
  runtime: number,
  season: number,
  summary: string,
  url: string
}

const App = (): JSX.Element => {
  const {state, dispatch} = React.useContext(Store);

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

  return (
    <React.Fragment>
      <header className="header">
        <h1>Rick and Morty</h1>
        <p>Pick your favourite episode</p>
      </header>
      <section className="episode-layout">
        {state.episodes.map((episode: IEpisode) => {
          return (
            <section key={episode.id} className="episode-box">
              <img src={episode.image && episode.image.medium} alt={`Rick and Morty ${episode.name}`} />
              <div>{episode.name}</div>
              <section>
                Season: {episode.season} Number: {episode.number}
              </section>
            </section>
          )
        })}
      </section>
    </React.Fragment>
  );
};

export default App;
