import { Box, Paper, Typography } from '@mui/material'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

interface Location {
  lat: number
  lng: number
  status: string
  timestamp: string
}

interface OrderMapProps {
  locations: Location[]
  currentLocation?: Location
}

export default function OrderMap({ locations, currentLocation }: OrderMapProps) {
  const center = currentLocation || locations[0]

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Theo dõi đơn hàng
      </Typography>
      
      <Box sx={{ height: 400, width: '100%' }}>
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {locations.map((location, index) => (
            <Marker 
              key={index}
              position={[location.lat, location.lng]}
            >
              <Popup>
                <Typography variant="body2">
                  Trạng thái: {location.status}<br />
                  Thời gian: {location.timestamp}
                </Typography>
              </Popup>
            </Marker>
          ))}

          {currentLocation && (
            <Marker
              position={[currentLocation.lat, currentLocation.lng]}
              icon={new L.Icon({
                iconUrl: '/delivery-icon.png',
                iconSize: [38, 38],
              })}
            >
              <Popup>
                <Typography variant="body2">
                  Vị trí hiện tại<br />
                  Cập nhật: {currentLocation.timestamp}
                </Typography>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </Box>
    </Paper>
  )
} 