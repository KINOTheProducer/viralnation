import React from 'react';
import { Grid } from '@mui/material';

const CardContainer = ({ children }) => {
    return (
        <Grid container justifyContent="center" paddingTop={5} spacing={3} sx={{ width: '100%' }}>
            {React.Children.map(children, (child) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    {child}
                </Grid>
            ))}
        </Grid>
    );
};

export default CardContainer;