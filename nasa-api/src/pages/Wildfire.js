import { useState, useEffect } from 'react'
import Map from '../components/Map'
import { Loading } from "../components";

export default function Wildfire() {
    const [eventData, setEventData] = useState([])
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      const fetchEvents = async () => {
        setLoading(true)
        const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events')
        const { events } = await res.json()
  
        setEventData(events)
        setLoading(false)
      }
  
      fetchEvents()
    }, [])
  
    return (
      <div>
        
        { !loading ? <Map eventData={eventData} /> : <Loading /> }
      </div>
    );
}
