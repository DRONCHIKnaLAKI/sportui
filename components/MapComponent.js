import React, { useState, useEffect } from 'react';
import Map from 'react-map-gl';
import { Marker, Popup } from 'react-map-gl';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import MAPBOX_TOKEN from '../lib/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const SportMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 49.0,
    longitude: 31.0,
    zoom: 6
  });
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);

  useEffect(() => {
    const loadClubs = async () => {
      const querySnapshot = await getDocs(collection(db, "clubs"));
      setClubs(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    };
    loadClubs();
  }, []);

  const getSportIcon = (sport) => {
    const icons = {
      'футбол': '⚽',
      'баскетбол': '🏀',
      'теннис': '🎾'
    };
    return icons[sport] || '🏃';
  };

  return (
    <div className="map-container">
      <Map
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={evt => setViewport(evt.viewState)}
      >
        {clubs.map(club => (
          <Marker
            key={club.id}
            longitude={club.location.lng}
            latitude={club.location.lat}
            onClick={() => setSelectedClub(club)}
          >
            <div className="marker">
              {getSportIcon(club.sport)}
            </div>
          </Marker>
        ))}

        {selectedClub && (
          <Popup
            longitude={selectedClub.location.lng}
            latitude={selectedClub.location.lat}
            onClose={() => setSelectedClub(null)}
            anchor="bottom"
          >
            <div className="popup-content">
              <h3>{selectedClub.name}</h3>
              <p>📍 {selectedClub.address}</p>
              <p>🏷 {selectedClub.sport}</p>
              <button 
                className="route-button"
                onClick={() => window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${selectedClub.location.lat},${selectedClub.location.lng}`,
                  '_blank'
                )}
              >
                Построить маршрут
              </button>
            </div>
          </Popup>
        )}
      </Map>

      <style jsx>{`
        .map-container {
          width: 100vw;
          height: 100vh;
          position: relative;
        }
        .marker {
          font-size: 24px;
          cursor: pointer;
          transform: translate(-50%, -50%);
        }
        .popup-content {
          padding: 10px;
        }
        .route-button {
          background: #4285F4;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
};

export default SportMap;
