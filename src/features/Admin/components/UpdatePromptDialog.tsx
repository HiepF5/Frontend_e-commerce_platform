import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';
import { updatePromptApi } from '@api/geminiApi';
import { UpdatePromptFormData, PromptListData } from '~/types/gemini.interface';
import { toast } from 'react-toastify';

interface UpdatePromptDialogProps {
  open: boolean;
  prompt: PromptListData | null;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdatePromptDialog = ({ open, prompt, onClose, onSuccess }: UpdatePromptDialogProps) => {
  const [formData, setFormData] = useState<UpdatePromptFormData>({
    prompt_name: '',
    new_prompt_name: '',
    prompt_text: ''
  });

  useEffect(() => {
    if (prompt) {
      setFormData({
        prompt_name: prompt.promptName,
        new_prompt_name: prompt.promptName,
        prompt_text: prompt.promptText
      });
    }
  }, [prompt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePromptApi(formData);
      toast.success('Cập nhật prompt thành công');
      onSuccess();
    } catch (error) {
      toast.error('Lỗi khi cập nhật prompt');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Cập nhật Prompt</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Tên Prompt Mới"
              value={formData.new_prompt_name}
              onChange={(e) => setFormData({ ...formData, new_prompt_name: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="New Prompt"
              value={formData.prompt_text}
              onChange={(e) => setFormData({ ...formData, prompt_text:e.target.value })}
              required
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained" color="primary">
            Cập nhật
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UpdatePromptDialog; 