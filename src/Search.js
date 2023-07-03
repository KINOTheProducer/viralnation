import React from 'react';
import { TextField, Box } from '@mui/material';

const Search = ({ isMobile, handleSearchChange }) => {

    const searchWidth = isMobile ? '78vw' : '68vw';

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
                id="search"
                label="Search"
                variant="outlined"
                onChange={handleSearchChange}
                size="small"
                sx={{ width: searchWidth }}
            />
        </Box>
    );
};

export default Search;