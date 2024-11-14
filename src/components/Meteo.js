import { Oval } from 'react-loader-spinner';
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
function Grp204WeatherApp() {
   const [input, setInput] = useState('');
   const [weather, setWeather] = useState({
       loading: false,
       data: {},
       error: false,
   });
   const toDateFunction = () => {
       const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 
'Septembre', 'Octobre', 'Novembre', 'Décembre'];
       const WeekDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
       const currentDate = new Date();
       const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} $
{months[currentDate.getMonth()]}`;
       return date;
   };
   const search = async (event) => {
       if (event.key === 'Enter') {
           event.preventDefault();
           setInput('');
           setWeather({ ...weather, loading: true });
           const url = 'https://api.openweathermap.org/data/2.5/weather';
           const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
           await axios
               .get(url, {
                   params: {
                       q: input,
                       units: 'metric',
                       appid: api_key,
                   },
               })
               .then((res) => {
                   setWeather({ data: res.data, loading: false, error: false });
               })
               .catch((error) => {
                   setWeather({ ...weather, data: {}, error: true });
                   setInput('');
               });
       }
   };
   return (
    <div className='w-full flex place-items-center h-screen justify-center '>
        <div className="w-1/3 text-center  bg-slate-400  border p-14  hover:animate-none rounded-2xl">
           <h1 className="text-center font-semibold text-xl py-5" style={{letterSpacing:"2px"}}>Application Météo grp206</h1>
           <div className="search-bar">
               <input
                   type="text"
                   className="ps-3 py-2 w-full rounded focus:outline-none"
                   placeholder="Entrez le nom de la ville..."
                   name="query"
                   value={input}
                   onChange={(event) => setInput(event.target.value)}
                   onKeyPress={search}
               />
           </div>
           {weather.loading && (
               <>
                   <Oval type="Oval" color="black" height={100} width={100} />
               </>
           )}
           {weather.error && (
               <>
                   <span className="error-message">
                       <FontAwesomeIcon icon={faFrown} />
                       <span>Ville introuvable</span>
                   </span>
               </>
           )}
           {weather && weather.data && weather.data.main && (
               <div className='w-full text-center grid justify-center '>
                   <h2 className='text-center font-bold text-2xl py-2'>{weather.data.name}, {weather.data.sys.country}</h2>
                   <span>{toDateFunction()}</span>
                   <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} 
                    alt={weather.data.weather[0].description} className='mx-auto w-1/2' />
                   <p className='text-5xl font-bold'>{Math.round(weather.data.main.temp)}°C</p>
                   <p>Vitesse du vent : <b className='font-semibold'>{weather.data.wind.speed}</b> m/s</p>
               </div>
           )}
       </div>
    </div>
       
   );
}
export default Grp204WeatherApp;