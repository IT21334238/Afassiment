import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import InfoBox from './InfoBox';

// Define constants
const NATURAL_EVENT_WILDFIRE = 8;

const Map = ({ eventData, center, zoom }) => {
    const [locationInfo, setLocationInfo] = useState(null);

    const markers = eventData.map((ev, index) => {
        if (ev.categories[0].id === NATURAL_EVENT_WILDFIRE) {
            return (
                <LocationMarker
                    key={index}
                    lat={ev.geometries[0].coordinates[1]}
                    lng={ev.geometries[0].coordinates[0]}
                    onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
                />
            );
        }
        return null;
    });

    return (
        <section className="py-32 max-width flex justify-center items-center">
            <div className="container mx-auto px-4">
                <div className="map-title text-center mb-4">
                    <h1 className="heading text-3xl lg:text-4xl">Wildfire Tracker</h1>
                </div>
                <div className="map-container flex justify-between">
                    <div className="map rounded-lg" style={{ flex: '1' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyAXK8YMAH_PzQeGajiRzQCed5wP4xYa50g' }}
                            defaultCenter={center}
                            defaultZoom={zoom}
                        >
                            {markers}
                        </GoogleMapReact>
                    </div>
                    {locationInfo && <InfoBox info={locationInfo} style={{ flex: '1' }} />}
                </div>
                <p className="text-center mt-8 text-white opacity-75">
                    <strong>NASA's Earth Observatory Natural Event Tracker (EONET)</strong> is a powerful tool used to monitor and track natural events worldwide, including wildfires. From 2021 to 2024, our platform has leveraged EONET's comprehensive data to provide real-time updates on wildfire occurrences across the globe. EONET aggregates data from various sources, including satellite imagery and ground observations, allowing us to deliver accurate and timely information to our users.
                    <br/><br/>
                    With EONET, we're able to visualize wildfire incidents, analyze their impact on affected areas, and provide valuable insights to help communities, emergency responders, and policymakers make informed decisions. By harnessing NASA's cutting-edge technology and data resources, we aim to enhance situational awareness and support efforts to mitigate the devastating effects of wildfires on our planet's ecosystems and human populations.
                    <br/><br/>
                    Join us in leveraging the power of EONET to stay informed, prepared, and proactive in the face of environmental challenges.
                </p>
            </div>
        </section>
    );
};

Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -122.8756
    },
    zoom: 6
};

export default Map;
