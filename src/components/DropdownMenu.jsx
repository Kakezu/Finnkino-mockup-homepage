import { useEffect, useState } from "react";
import { UilAngleDoubleRight } from '@iconscout/react-unicons'
import axios from "axios";


export default function DropdownMenu() {
  const [theatres, setTheatres] = useState([])
  const [dateOptions, setDateOptions] = useState([])
  const [movies, setMovies] = useState([])

  useEffect(() => {
    // Fetch theater data from Finnkino API
    axios.get('https://www.finnkino.fi/xml/TheatreAreas/')
     .then(response => {
        const data = new window.DOMParser().parseFromString(response.data, 'text/xml');
        const theatreElements = data.querySelectorAll('TheatreArea');
        const theatreOptions = Array.from(theatreElements).map(theatre => ({
          id: theatre.querySelector('ID')?.textContent || '',
          name: theatre.querySelector('Name')?.textContent || ''
        }));
        setTheatres(theatreOptions);
      })
     .catch(error => console.error('Error fetching theatre data:', error));


    // Fetch available dates from Finnkino API
    axios.get('https://www.finnkino.fi/xml/ScheduleDates/')
     .then(response => {
        const data = new window.DOMParser().parseFromString(response.data, 'text/xml');
        const dateElements = data.querySelectorAll('dateTime');
        const dateOptions = Array.from(dateElements).map(date => {
          const dateObj = new Date(date.textContent);
          const today = new Date();
          const tomorrow = new Date();
          tomorrow.setDate(today.getDate() + 1);
          let formattedDate;
          if (dateObj.toDateString() === today.toDateString()) {
            formattedDate = `Tänään, ${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
          } else if (dateObj.toDateString() === tomorrow.toDateString()) {
            formattedDate = `Huomenna, ${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
          } else {
            const dayOfWeek = dateObj.toLocaleDateString('fi', { weekday: 'short' });
            formattedDate = `${dayOfWeek.charAt(0).toUpperCase()}${dayOfWeek.slice(1).toLowerCase()}, ${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
          }
          return {
            value: date.textContent.split('T')[0],
            label: formattedDate
          }
        })
        setDateOptions(dateOptions)
      })
     .catch(error => console.error('Error fetching date data:', error))


     // Fetch available movies from Finnkino API
     axios.get('https://www.finnkino.fi/xml/Schedule/')
      .then(response => {
        const data = new window.DOMParser().parseFromString(response.data, 'text/xml')
        const scheduleElements = data.querySelectorAll('Schedule')
        const movieElements = scheduleElements[0].querySelectorAll('Show')
        const movieOptions = Array.from(movieElements).map(movie => ({
          id: movie.querySelector('ID')?.textContent || '',
          name: movie.querySelector('Title')?.textContent || ''
        }))
        // Filtering duplicates based on movie titles
        const uniqueMovieOptions = movieOptions.filter((movie, index, self) =>
        index === self.findIndex((t) => t.name === movie.name)
        );
        setMovies(uniqueMovieOptions)
      })
     .catch(error => console.error('Error fetching movie data:', error))
  }, [])

  return (
    <div className="dropdown-container">
      <select aria-label="Valitse alue/teatteri">
        {theatres.map(theatre => (
          <option key={theatre.id} value={theatre.id}>{theatre.name}</option>
        ))}
      </select>
      <select aria-label="Valitse päivämäärä">
        {dateOptions.map(date => (
          <option key={date.value} value={date.value}>{date.label}</option>
          ))}
      </select>
      <select aria-label="Valitse elokuva">
        <option value="">Kaikki elokuvat</option>
        {movies.map(movie => (
          <option key={movie.id} value={movie.id}>{movie.name}</option>
        ))}
      </select>
      <button>
      <div className="button-container">
        Etsi näytökset
        <UilAngleDoubleRight size={16}/>
      </div>
      </button>
    </div>
  );
}
