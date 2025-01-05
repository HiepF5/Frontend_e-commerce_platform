import { useCreateThreadMutation, useUpdateThreadMutation, useDeleteThreadMutation } from '../api/threadsApi';
import { Post } from '../types/threads.interface';

export const useThreadActions = (setPosts: React.Dispatch<React.SetStateAction<Post[]>>) => {
  const [createThread] = useCreateThreadMutation();
  const [updateThread] = useUpdateThreadMutation();
  const [deleteThread] = useDeleteThreadMutation();
  // const [shareThread] = useShareThreadMutation();

  const handleCreateThread = async (
    newPost: Omit<Post, 'id' | 'author' | 'avatar' | 'timestamp' | 'reactions' | 'comments'>
  ) => {
    const post: Post = {
      id: Date.now().toString(),
      author: 'Current User',
      avatar: '/placeholder.svg',
      timestamp: 'Just now',
      ...newPost,
      comments: [],
      reactions: []
    };
    try {
      const response = await createThread({
        post_json: {
          postRole: post.postRole,
          visibility: post.visibility,
          content: post.content,
          location: post.location,
          hashTag: post.hashTag
        },
        file: null // Replace with actual file if needed
      }).unwrap();
      setPosts((prevPosts) => [post, ...prevPosts]);
      console.log('Thread created:', response);
    } catch (error) {
      console.error('Failed to create thread:', error);
    }
  };

  const handleUpdateThread = async (id: string, content: string) => {
    try {
      const response = await updateThread({
        post_json: {
          postRole: 'KHACHHANG',
          visibility: 'PUBLIC',
          content,
          location: 'Hà Nội',
          hashTag: ['updated', 'content']
        },
        file: null
      }).unwrap();
      console.log('Thread updated:', response);
      console.log(id)
    } catch (error) {
      console.error('Failed to update thread:', error);
    }
  };

  const handleDeleteThread = async (id: string) => {
    try {
      const response = await deleteThread(id).unwrap();
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      console.log('Thread deleted:', response);
    } catch (error) {
      console.error('Failed to delete thread:', error);
    }
  };

  // const handleShareThread = async (id: string) => {
  //   try {
  //     const response = await shareThread({
  //       sharedId: Number(id),
  //       postRole: 'KHACHHANG',
  //       visibility: 'PUBLIC',
  //       content: 'shared bài viết',
  //       location: 'Hà Nội'
  //     }).unwrap();
  //     console.log('Thread shared:', response);
  //   } catch (error) {
  //     console.error('Failed to share thread:', error);
  //   }
  // };

  return {
    handleCreateThread,
    handleUpdateThread,
    handleDeleteThread,
    // handleShareThread
  };
};
