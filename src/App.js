import Axios from 'axios';
import {useState,useEffect} from 'react'
import { Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Day_card from './Day_card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [days,set_days]=useState([])
  const api_key='3b8d089bf42b5cdf54ab00136482c9e0'
  let [city,set_city]=useState('')
  const get_day=(date)=>{
    const week_days=['Sunday','Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday']
    const d = new Date(date);
    let day = d.getDay();
    return week_days[day]
  }
  const get_date_and_month=(date)=>{
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date(date);
    const month=months[d.getMonth()]
    const no_of_day=d.getDate()
    return month + ' ' +no_of_day
  }
  const handle_search=()=>{
      Axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api_key}`)
      .then((response)=>{
        let lat=response.data[0].lat
        let lon=response.data[0].lon
        let normal_url=`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`

        Axios.get(normal_url)
        .then((response_2)=>{
          let dummy_days=[]
          let dummy_dates=[]
          for(let i=0;i<39;i++){
            if(dummy_dates.indexOf(response_2.data.list[i].dt_txt.slice(0,10))==-1){
              dummy_dates.push(response_2.data.list[i].dt_txt.slice(0,10))
              let obj=response_2.data.list[i]
              obj.day=get_day(response_2.data.list[i].dt_txt.slice(0,10))
              obj.date=get_date_and_month(response_2.data.list[i].dt_txt.slice(0,10))
              dummy_days.push(obj)
              if(dummy_dates.length==3){
                break
              }
            }
          }
          set_days(dummy_days)
    })
    })
  }

  return (
    <Container style={{height:'100vh'}} className='d-flex justify-content-center align-items-center flex-column'>
      <div className='mt-5 d-flex justify-content-center align-items-center'>
        <Form >
          <Form.Group className="mb-3" controlId="formBasicLocation">
            <h3 className='ps-3 pb-3'>Search for a city to get the next three days weather forecast</h3>
            <Container>
              <Row>
                <Col>
                  <Form.Control style={{width:'1000px'}} className='fs-4' type="email" placeholder="Enter location (e.g Dhaka)" onChange={(e)=>{set_city(e.target.value)}} />
                </Col>
                <Col>
                  <Button className='fs-4'  variant="primary" onClick={handle_search}>Search</Button>
                </Col>
              </Row>
            </Container>
          </Form.Group>
        </Form>
      </div>
      <div className='mt-5 d-flex justify-content-center align-items-center' >
        {days.map((day)=>{
            console.log(day)
            return <Day_card day={day}/>
        })}
      </div>
    </Container>
  );
}

export default App;
