import React, { useState } from "react"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateResult, updateErrorMessage } from '../redux/modules/search'

export default function Search() {
  const dispatch = useDispatch()

  const [query, setQuery] = useState('')

  const handleChange = ({target}) => {setQuery(target.value)}

  const search = async (e) => {
    e.preventDefault()
    
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=ru&q=${query}&appid=bad46dfee1ae1125ec4faf31e63449de`
      );
      dispatch(updateResult(data.list))
      dispatch(updateErrorMessage(''))
    } catch(error) {
      dispatch(updateResult([]))
      dispatch(updateErrorMessage(error.response.data.message))
    }
    
  }
  
  return (
    <form onSubmit={search}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          value={query}
          onChange={handleChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
          disabled={!query.length}
          id="button-addon2"
        >
          Lookup Forecast
        </button>
      </div>
    </form>
  );
}
