import { Card } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Cards() {
    const [posters, setPosters] = useState([]);

    useEffect(() => {
        axios.get('https://www.finnkino.fi/xml/Schedule/')
       .then(response => {
            const data = new window.DOMParser().parseFromString(response.data, 'text/xml');
            const scheduleElements = data.querySelectorAll('Schedule');
            const movieElements = scheduleElements[0].querySelectorAll('Show');
            const posterUrls = Array.from(movieElements).map(movie => ({
                url: movie.querySelector('EventMediumImagePortrait')?.textContent || '' // Adjusted to EventMediumImagePortrait
            })).filter(poster => poster.url!== ''); // Filter out any empty URLs
            
            // Filter out duplicate URLs
            const uniquePosters = posterUrls.filter((poster, index, self) =>
                index === self.findIndex((p) => p.url === poster.url)
            );

            setPosters(uniquePosters);
         })
       .catch(error => console.error('Error fetching movie poster data:', error));
    }, []);

    return (
        <div className="cards">
            {posters.map((poster, index) => (
                <Card
                  key={index}
                  className="card-item"
                  cover={<img src={poster.url} alt={`Movie Poster ${index + 1}`} />}
                />
            ))}
        </div>
    );
}
