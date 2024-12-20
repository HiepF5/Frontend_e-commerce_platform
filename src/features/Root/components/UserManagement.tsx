import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Typography,
  Alert
} from '@mui/material'
import { useState } from 'react'
import { useChangeAdminMutation } from '../api/rootApi'

interface User {
  user_code: string
  email: string
  fullname: string
  is_admin: boolean
}

export const UserManagement = () => {
  const [error, setError] = useState<string | null>(null)
  const [changeAdmin] = useChangeAdminMutation()

  // Mock data - replace with actual API call
  const users: User[] = [
    {
      user_code: 'USER001',
      email: 'user1@example.com',
      fullname: 'User One',
      is_admin: false
    },
    // ... more users
  ]

  const handleChangeAdmin = async (user_code: string, is_admin: boolean) => {
    try {
      await changeAdmin({ user_code, is_admin }).unwrap()
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change admin status')
    }
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Code</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Admin Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.user_code}>
                <TableCell>{user.user_code}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.is_admin}
                    onChange={(e) => handleChangeAdmin(user.user_code, e.target.checked)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
} 