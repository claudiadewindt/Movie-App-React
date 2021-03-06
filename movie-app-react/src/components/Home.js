import React from 'react';

// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

// Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';

// Hook
import { useHomeFetch } from '../hooks/useHomeFetch';

// Image
import NoImage from '../images/no_image.jpg';
import NotFound from '../images/not-found.gif';

// Style
import { Wrapper, Text, Image } from './Home.styles';

// setSearchTerm is used to create a short delay between the user typing and the search being executed, to create a more fluid experience
const Home = () => {
  const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } =
    useHomeFetch();

  if (error) return <div>Something went wrong ...</div>;

  return (
    <>
      {!searchTerm && state.results[0] ? ( // If there is no search term, and there is a result, display the result
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />

      <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
        {state.results.map((movie) => (
          <Thumb
            key={movie.id}
            clickable={true}
            image={
              movie.poster_path
                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                : NoImage
            }
            movieId={movie.id}
          />
        ))}
      </Grid>

      {searchTerm && !state.results[0] ? (
        <Wrapper>
          <Text>Result not found</Text>
          <Image>
            <img src={NotFound} alt="Not Found" />
          </Image>
        </Wrapper>
      ) : null}

      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button text="Load More" callback={() => setIsLoadingMore(true)} />
      )}
    </>
  );
};

export default Home;
