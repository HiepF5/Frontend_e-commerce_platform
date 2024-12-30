'use client'

import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { formatCurrency } from '@shared/utils/formatPrice'
import { TileLayer, Marker, Popup, Polyline, MapContainer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Fix for default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { ShippingStatus } from '../types/order.enum'
import { getShippingStatusText } from '../helper/orderHelper'

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})


interface TrackingPoint {
  lat: number
  lng: number
  status: ShippingStatus
  timestamp: string
  address: string
}

export default function OrderTracking() {
  const { orderId } = useParams()
  const [trackingData, setTrackingData] = useState<TrackingPoint[]>([
    {
      lat: 21.028511,
      lng: 105.804817,
      status: ShippingStatus.PICKED_UP,
      timestamp: '2024-03-15 08:00:00',
      address: 'Kho Hà Nội'
    },
    {
      lat: 21.025511,
      lng: 105.814817,
      status: ShippingStatus.IN_TRANSIT,
      timestamp: '2024-03-15 10:30:00',
      address: 'Trung tâm phân loại'
    },
    {
      lat: 21.022511,
      lng: 105.824817,
      status: ShippingStatus.IN_TRANSIT,
      timestamp: '2024-03-15 14:00:00',
      address: 'Đang giao đến người nhận'
    }
  ])

  const [currentLocation, setCurrentLocation] = useState<TrackingPoint>({
    lat: 21.020511,
    lng: 105.834817,
    status: ShippingStatus.IN_TRANSIT,
    timestamp: new Date().toISOString(),
    address: 'Vị trí hiện tại'
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation(prev => ({
        ...prev,
        lat: prev.lat + 0.001 * (Math.random() - 0.5),
        lng: prev.lng + 0.001 * (Math.random() - 0.5),
        timestamp: new Date().toISOString()
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const deliveryIcon = new L.Icon({
    iconUrl: '/delivery-icon.png',
    iconSize: [38, 38],
  })

  const positions: L.LatLngTuple[] = trackingData.map(point => [point.lat, point.lng] as L.LatLngTuple)

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Theo dõi đơn hàng #{orderId}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Lịch trình vận chuyển
            </Typography>
            <Stepper orientation="vertical">
              {[...trackingData, currentLocation].map((point, index) => (
                <Step key={index} active={true}>
                  <StepLabel>
                    <Typography variant="subtitle2">
                      {getShippingStatusText(point.status)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {point.address}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(point.timestamp).toLocaleString()}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ height: 500, width: '100%' }}>
              <MapContainer
                center={[currentLocation.lat, currentLocation.lng]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {trackingData.map((point, index) => (
                  <Marker
                    key={index}
                    position={[point.lat, point.lng]}
                  >
                    <Popup>
                      <Typography variant="body2">
                        {getShippingStatusText(point.status)}<br />
                        {point.address}<br />
                        {new Date(point.timestamp).toLocaleString()}
                      </Typography>
                    </Popup>
                  </Marker>
                ))}

                <Marker
                  position={[currentLocation.lat, currentLocation.lng]}
                  icon={deliveryIcon}
                >
                  <Popup>
                    <Typography variant="body2">
                      Vị trí hiện tại<br />
                      {new Date(currentLocation.timestamp).toLocaleString()}
                    </Typography>
                  </Popup>
                </Marker>

                <Polyline 
                  positions={positions}
                  color="blue"
                  weight={3}
                  opacity={0.5}
                />
              </MapContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
