import {
  Box,
  Button,
  Typography,
  Alert,
  Container,
  Paper
} from '@mui/material'
import { useState } from 'react'
import { useLazyCreateRootQuery } from '../api/rootApi'

export const CreateRootForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [createRoot] = useLazyCreateRootQuery()

  const handleCreateRoot = async () => {
    try {
      await createRoot().unwrap()
      setError(null)
      setSuccess('Root account created successfully')
    } catch (err) {
      setSuccess(null)
      setError(err instanceof Error ? err.message : 'Failed to create root account')
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Create Root Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleCreateRoot}
          >
            Create Root Account
          </Button>
        </Box>
      </Paper>
    </Container>
  )
} 