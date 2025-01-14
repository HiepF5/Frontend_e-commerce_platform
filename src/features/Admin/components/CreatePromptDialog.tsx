import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';
import { createPromptApi } from '@api/geminiApi';
import { CreatePromptFormData } from '~/types/gemini.interface';
import { toast } from 'react-toastify';

interface CreatePromptDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreatePromptDialog = ({ open, onClose, onSuccess }: CreatePromptDialogProps) => {
  const [formData, setFormData] = useState<CreatePromptFormData>({
    prompt_name: '',
    prompt_text: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPromptApi(formData);
      toast.success('Tạo prompt thành công');
      onSuccess();
    } catch (error) {
      toast.error('Lỗi khi tạo prompt');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Thêm Prompt Mới</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Tên Prompt"
              value={formData.prompt_name}
              onChange={(e) => setFormData({ ...formData, prompt_name: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Nội dung Prompt"
              value={formData.prompt_text}
              onChange={(e) => setFormData({ ...formData, prompt_text: e.target.value })}
              required
              fullWidth
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained" color="primary">
            Tạo
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreatePromptDialog; 