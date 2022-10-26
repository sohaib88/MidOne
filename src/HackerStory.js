import React from 'react';
import HackReducer from './HackReducer';

const api = 'https://hn.algolia.com/api/v1/search?query=hello&page=0';

const PersistData = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

function HackerStory () {
  const [search, setsearch] = PersistData(
    ''
   );
   const [url, setUrl] = React.useState(
    `${api}${search}`
  );

  const [stories, dispatch] = React.useReducer(
    HackReducer,
    { data: [], isLoading: false,isError: false }
  );



  const getStory = React.useCallback(async () => {
    dispatch({ type: 'initial' });

    try {
      const result = await fetch(url);

      dispatch({
        type: 'fetched',
        payload: result.data.hits,
      });
    } catch {
      dispatch({ type: 'notfetched' });
    }
  }, [url]);

  React.useEffect(() => {
    getStory();
  }, [getStory]);
 
  const searchS = event => {
    setUrl(`${api}${search}`);
    event.preventDefault();
  };

  const searchInput = event => {
    setUrl(`${api}${search}`);
    setsearch(event.target.value);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <SearchForm
        onSubmit={searchS}
        onSearchInput={searchInput}
        onSearchSubmit={onSubmit}

      />
    {stories.isLoading ? (<p>Loading ...</p>) : <List list={stories.data}/>}
    </div>
  );
};

const SearchForm = ({
  search,
  onSearch,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <Label
      id="search"
      value={search}
      isFocused
      onInputChange={onSearch}
    >
      <strong>Search:</strong>
    </Label>

    <button type="submit" disabled={!search}>
      Submit
    </button>
  </form>
);

const Label = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

const List = ({ list, onRemove }) =>
  list.map(item => (
    <Item
      key={item.objectID}
      item={item}
      onRemove={onRemove}
    />
  ));

const Item = ({ item, onRemove }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemove(item)}>
        Dismiss
      </button>
    </span>
  </div>
);

export default HackerStory;
