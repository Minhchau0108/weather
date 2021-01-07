import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
const WeatherBox = (props) => {
    const style = {
        width: '290px',
        height: '470px',
        borderRadius: '20px',
        backgroundColor: '#bbdefb',
        boxShadow: '1px 2px 10px rgba(0, 0, 0, .2)',
        opacity: '0.9'
    }
    let urlToImage = `http://openweathermap.org/img/wn/${props.icon}@2x.png`
    return (
        <div>
        <Card style={style} className="mx-auto m-5 py-5">
            <Card.Body>
                <Card.Title>
                    <h3>{props.city}</h3>
                </Card.Title>
                <Card.Text>
                    <h3>{props.temp}°C</h3>
                    <h3>{props.description}</h3>  
                    <Card.Img src={urlToImage}  style={{ width: '100px'} }/>
                </Card.Text>
            </Card.Body>
        </Card>
        </div>
    )
}

export default WeatherBox
