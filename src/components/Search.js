import React, { useState, useEffect } from 'react'
import axios from '../Axios'
import Scroll from "./Scroll"
import './Search.css'

function Search() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [firstSearch, setFirstSearch] = useState("yes")

  useEffect(() => {
    async function fetchData() {

      const request = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${search}`);
      let result = request['data']
      setSearchResult(result.data)
      return result;
    }
    if (search !== "") {
      fetchData();
    } else {
      setFirstSearch("yes")
    }
  }, [search]);

  const getData = (event) => {
    setSearch(event.target.value)
  };

  function deBounceSearch(func, d) {
    let timer;

    return function () {
      clearTimeout(timer);
      let context = this,
        args = arguments;
      timer = setTimeout(() => {
        getData.apply(context, args);
      }, d);
    };
  }

  const handleClick = deBounceSearch(getData, 300);

  return (
    <div className="searc__section">
      <input type="text" placeholder="Search Gif's" className="search__input" onKeyUp={handleClick} />
      <Scroll search={search} result={searchResult} firstSearch={firstSearch} />
    </div>
  )
}

export default Search
