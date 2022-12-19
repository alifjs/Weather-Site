import React from 'react'
import Card from 'react-bootstrap/Card';

function Day_card({day}) {
    let icon=day.weather[0].icon.slice(0,-1)+'d'
    let condition=day.weather[0].main
    let description=day.weather[0].description
    let temp=day.main.temp
    let max_temp=day.main.temp_max
    let min_temp=day.main.temp_min
    let humidity=day.main.humidity
    let pressure=day.main.pressure
    let sea_level=day.main.sea_level
    let wind=day.wind.speed +' m/s, '+ day.wind.deg+'°'

    return (
    <Card style={{width:'500px'}}  className='me-4'>
        <Card.Img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} style={{width:'100px'}}/>
        <Card.Body>
        <h3>{condition} </h3>
        <Card.Title>{day.day}, {day.date}</Card.Title>
        <h6 style={{opacity:'0.7'}}>{description}</h6>
        <Card.Text className='pt-3 fs-5'>
            <p>Temperature : {temp} °C</p>
            <p>Highest temperature: {max_temp} °C</p>
            <p>Lowest Temperature: {min_temp} °C</p>
            <p>Humidity : {humidity}</p>
            <p>Pressure : {pressure}</p>
            <p>Wind : {wind}</p>
            <p>Sea level : {sea_level}</p>
        </Card.Text>
        </Card.Body>
    </Card>
    )
}

export default Day_card