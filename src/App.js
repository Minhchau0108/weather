import React, { useState, useEffect }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PublicNavbar from './components/PublicNavbar';
import WeatherBox from './components/WeatherBox';
import { Container , Row, Col, ButtonGroup, Button} from 'react-bootstrap';
import PacmanLoader from "react-spinners/PacmanLoader";
import Error from './components/Error';

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [city, setCity] = useState('Ho Chi Minh City');
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getWeather = async(latitude, longitude) =>{
    const API_KEY = `0b69a70241383933c92b01ada01678c1`;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setCurrentWeather(data);
    setTimeout(() => setLoading(false), 1000);

  }
  const getWeatherCity = async(city) => {
    const API_KEY = `0b69a70241383933c92b01ada01678c1`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setCurrentWeather(data);
  }

  useEffect(()=>{
    const success = (position) =>{
      console.log(position);
      getWeather(position.coords.latitude, position.coords.longitude);
    }
    const error = (error)=>{
      console.log(error);
    }
    try{
      navigator.geolocation.getCurrentPosition(success, error);
    }
    catch(e){
      setHasError(true);
    }
  
  }, []);


  useEffect(()=>{
    try{
      getWeatherCity(city);
    }
    catch(e){
      setHasError(true);
    }
 
  }, [city]);

  const handleGetWeatherCity = (cityName) => {
    setCity(cityName);
  }
  return (
    <div className="App text-center">
      {hasError && <Error/>}
      {loading? <PacmanLoader size={50}/> : ( 
        <>
        <PublicNavbar/>
        <Container fluid className = {`image ${city === 'Ho Chi Minh City' ? "saigon" : city}`}> 
           <Row>
                <ButtonGroup vertical size="lg" className="mb-2 box">
                    <Button block onClick = {()=> handleGetWeatherCity('Ho Chi Minh City')}>Saigon</Button>
                    <Button block onClick = {()=> handleGetWeatherCity('Paris')}>Paris</Button>
                    <Button block onClick = {()=> handleGetWeatherCity('London')}>London</Button>
                    <Button block onClick = {()=> handleGetWeatherCity('Miami')}>Miami</Button>
                    <Button block onClick = {()=> handleGetWeatherCity('Moscow')}>Moscow</Button>
                    <Button block onClick = {()=> handleGetWeatherCity('Tokyo')}>Tokyo</Button>
                    <Button block onClick = {()=> handleGetWeatherCity('Vancouver')}>Vancouver</Button>
                </ButtonGroup>
                <Col>
                  { currentWeather === undefined ? null : (<WeatherBox city = {currentWeather.name} temp = {currentWeather.main.temp} description ={currentWeather.weather[0].description} icon = {currentWeather.weather[0].icon}/>)}
                </Col>
              </Row>   
          </Container>
          </>
      )
      }
     
      
    </div>
  );
}

export default App;
