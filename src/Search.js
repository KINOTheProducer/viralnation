import React, { useState } from 'react';
import { TextField, useMediaQuery, useTheme, Box } from '@mui/material';

const Search = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearch(searchValue);
    };

    const searchWidth = isMobile ? '70vw' : '500px';

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={handleSearchSubmit}>
                <TextField
                    id="search"
                    label="Search"
                    variant="outlined"
                    value={searchValue}
                    onChange={handleSearchChange}
                    size="small"
                    sx={{ width: searchWidth }}
                />
            </form>
        </Box>
    );
};

export default Search;