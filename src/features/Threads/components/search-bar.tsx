import React, { useState } from 'react';
import { TextField, InputAdornment, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchResult {
  id: string;
  type: 'user' | 'post';
  title: string;
  subtitle: string;
  avatar?: string;
}

interface SearchBarProps {
  onSearch: (searchTerm: string) => void
}
export function SearchBar(props: SearchBarProps) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // In a real application, this would make an API call to get search results
    // For now, we'll just simulate some results
    const searchTerm = event.target.value;
    if (searchTerm) {
      setSearchResults([
        { id: '1', type: 'user', title: 'John Doe', subtitle: '@johndoe', avatar: '/placeholder.svg' },
        { id: '2', type: 'post', title: 'Hello world!', subtitle: 'Posted by @janedoe' },
      ]);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {searchResults.length > 0 && (
        <List>
          {searchResults.map((result) => (
            <ListItem key={result.id}>
              {result.type === 'user' && result.avatar && (
                <ListItemAvatar>
                  <Avatar src={result.avatar} />
                </ListItemAvatar>
              )}
              <ListItemText primary={result.title} secondary={result.subtitle} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

