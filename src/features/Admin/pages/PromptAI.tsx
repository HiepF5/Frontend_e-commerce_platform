import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  CircularProgress,
  Switch
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getPromptApi, deletePromptApi } from '@api/geminiApi'
import CreatePromptDialog from '../components/CreatePromptDialog';
import UpdatePromptDialog from '../components/UpdatePromptDialog';
import { toast } from 'react-toastify';
import { PromptListData } from '~/types/gemini.interface';

const PromptAI = () => {
  const [prompts, setPrompts] = useState<PromptListData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptListData | null>(null);

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const response = await getPromptApi();
      const activePromptName = localStorage.getItem('prompt_ai');
      const updatedPrompts = (Array.isArray(response.data) ? response.data : []).map(prompt => ({
        ...prompt,
        isActive: prompt.promptName === activePromptName
      }));
      setPrompts(updatedPrompts);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách prompt');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const handleDelete = async (promptName: string) => {
    try {
      await deletePromptApi({ prompt_name: promptName });
      toast.success('Xóa prompt thành công');
      if (localStorage.getItem('prompt_ai') === promptName) {
        localStorage.removeItem('prompt_ai');
      }
      fetchPrompts();
    } catch (error) {
      toast.error('Lỗi khi xóa prompt');
    }
  };

  const handleEdit = (prompt: PromptListData) => {
    setSelectedPrompt(prompt);
    setOpenUpdate(true);
  };

  const handleToggleActive = (prompt: PromptListData) => {
    if (!prompt.isActive) {
      localStorage.setItem('prompt_ai', prompt.promptName);
      setPrompts(prevPrompts =>
        prevPrompts.map(p => ({
          ...p,
          isActive: p.id === prompt.id
        }))
      );
      toast.success(`Đã kích hoạt Prompt: ${prompt.promptName}`);
    } else {
      localStorage.removeItem('prompt_ai');
      setPrompts(prevPrompts =>
        prevPrompts.map(p => ({
          ...p,
          isActive: false
        }))
      );
      toast.info(`Đã tắt Prompt: ${prompt.promptName}`);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={3}
      >
        <Typography variant='h5'>Quản lý Prompt AI</Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setOpenCreate(true)}
        >
          Thêm Prompt Mới
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên Prompt</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Thời gian chỉnh sửa</TableCell>
              <TableCell align='center'>Kích hoạt</TableCell>
              <TableCell align='center'>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prompts.map((prompt) => (
              <TableRow key={prompt.id}>
                <TableCell>{prompt.id}</TableCell>
                <TableCell>{prompt.promptName}</TableCell>
                <TableCell>{prompt.promptText}</TableCell>
                <TableCell>{prompt.modifiedAt || 'Chưa chỉnh sửa'}</TableCell>
                <TableCell align='center'>
                  <Switch
                    checked={prompt.isActive || false}
                    onChange={() => handleToggleActive(prompt)}
                    color='primary'
                  />
                </TableCell>
                <TableCell align='center'>
                  <IconButton
                    onClick={() => handleEdit(prompt)}
                    color='primary'
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(prompt.promptName)}
                    color='error'
                    disabled={prompt.isActive}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreatePromptDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={() => {
          setOpenCreate(false)
          fetchPrompts()
        }}
      />

      <UpdatePromptDialog
        open={openUpdate}
        prompt={selectedPrompt}
        onClose={() => {
          setOpenUpdate(false)
          setSelectedPrompt(null)
        }}
        onSuccess={() => {
          setOpenUpdate(false)
          setSelectedPrompt(null)
          fetchPrompts()
        }}
      />
    </Box>
  )
};

export default PromptAI;
