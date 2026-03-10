import { useState, useEffect } from 'react'
import './App.css'

function App() {
  //All the State Variables
  const [gifs, setGifs] = useState([])
  const [query, setQuery] = useState('')
  const [offset, setOffset] = useState(0)
  const [apikey, setApikey] = useState('73H9V6lKlhDik4GLmoJG2CeTj9eTRuUS')
  const [isSearch, setIsSearch] = useState(false)
  const [lastSearch, setLastSearch] = useState('')

  //The initial loading of Data using a useEffect
  useEffect(() => {
    let endpoint = "https://api.giphy.com/v1/gifs/trending"
    fetch(`${endpoint}?api_key=${apikey}&limit=25&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
      setGifs(data.data)
    })
    .catch(err => console.error(err))
  }, [])

  //A Function to Handle Searches (invoked when search button clicked)
  function handleSearch() {
    setIsSearch(true)
    setLastSearch(query)
    setOffset(0)
    let endpoint = "https://api.giphy.com/v1/gifs/search"
    fetch(`${endpoint}?api_key=${apikey}&limit=25&q=${query}&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
      setGifs(data.data)
    })
    .catch(err => console.error(err))
  }

  //Loading The Next 25 when Requested
  function loadNext() {
    //We essentially tweak the offset variable by 25
    setOffset(prevOffset => prevOffset+25)
    refreshItems()
  }

  //Loading The Previous 25 when Requested
  function loadPrev() {
    //We essentially tweak the offset variable by 25, with conditional logic to esnure we don't go below 0
    if (offset-25 > 0) setOffset(prevOffset => prevOffset-25)
    else setOffset(0)
    refreshItems()
  }

  //A Function for Displaying Items called in loadPrev and loadNext
  function refreshItems() {
    //whether our last activity was a search or trending there are two different endpoints
    let endpoint;
    if (isSearch) endpoint=`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=25&q=${lastSearch}&offset=${offset}`
    else endpoint=`https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=25&offset=${offset}`
    console.log(endpoint)
    //We fetch the data and update the gifs state variable
    fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      setGifs(data.data)
      console.log(data.data)
    })
    .catch(err => console.error(err))
  }

  // Returning the JSX to be Rendered
  return (
    <>
      <h1>Giphy App</h1>
      <div id="searchBar">
        <span>Search for Gifs</span>
        <input 
          id="searchField" 
          type="text" 
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div id="container">
        {gifs.map((gif, index) => {
          return (
            <img key={index} src={`${gif.images.fixed_height.url}`}></img>
          )
        })}
      </div>
      <button onClick={loadPrev}>Prev</button>
      <button onClick={loadNext}>Next</button>
    </>
  )
}

export default App
