import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';

const Map = ({ addresses }) => {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null); // State to track the active marker

    useEffect(() => {
        if (addresses.length) {
            fetchCoordinates();
        }
    }, [addresses]);

    const fetchCoordinates = async () => {
        setLoading(true);
        const positionPromises = addresses.map(async (address) => {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                    params: {
                        q: address,
                        format: 'json',
                        limit: 1,
                    },
                });
                const data = response.data[0];
                if (data) {
                    return [parseFloat(data.lat), parseFloat(data.lon)];
                }
            } catch (error) {
                console.error(`Error fetching data for address: ${address}`, error);
            }
            return null;
        });

        const results = await Promise.all(positionPromises);
        const validPositions = results.filter((pos) => pos !== null);
        setPositions(validPositions);
        setLoading(false);
    };

    const ToggleZoomMarker = ({ position, index }) => {
        const map = useMap();

        const handleClick = () => {
            if (activeMarker === index) {
                // Reset to original view
                map.fitBounds(positions.map((pos) => [pos[0], pos[1]]), { padding: [50, 50] });
                setActiveMarker(null);
            } else {
                // Zoom into marker
                map.setView(position, 15); // Zoom level
                setActiveMarker(index);
            }
        };

        return (
            <Marker
                position={position}
                eventHandlers={{
                    click: handleClick,
                }}
            >
                <Tooltip>{addresses[index]}</Tooltip>
                <Popup>
                    Location: {addresses[index]}
                </Popup>
            </Marker>
        );
    };

    ToggleZoomMarker.propTypes = {
        position: PropTypes.array.isRequired,
        index: PropTypes.number.isRequired,
    };

    return (
        <div style={{ width: '100%', height: '500px' }}>
            <div className='p-4 flex flex-col gap-2'>
                <h1 className='text-xl font-semibold'>Locations ({positions.length})</h1>
                <p className='text-slate-500'>Interact with the map to explore all locations</p>
            </div>
            <MapContainer
                className='border-t border-gray-300'
                center={[0, 0]}
                zoom={2}
                style={{ height: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {positions.map((position, index) => (
                    <ToggleZoomMarker key={index} position={position} index={index} />
                ))}
                <FitBounds positions={positions} />
            </MapContainer>
            {loading && <p>Loading map...</p>}
        </div>
    );
};

const FitBounds = ({ positions }) => {
    const map = useMap();

    useEffect(() => {
        if (positions.length > 0) {
            const bounds = positions.map((pos) => [pos[0], pos[1]]);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [positions, map]);

    return null;
};

FitBounds.propTypes = {
    positions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

Map.propTypes = {
    addresses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Map;
