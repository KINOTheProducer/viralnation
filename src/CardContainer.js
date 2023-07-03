import React from 'react';
import { Grid } from '@mui/material';

const CardContainer = ({ children }) => {
    return (
        <Grid
            container
            justifyContent="center"
            paddingTop={5}
            paddingX={{ xs: 2, sm: 4, md: 2 }}
            spacing={3}
            sx={{
                width: { xs: '100vw', sm: '80vw' },
                maxWidth: '1800px',
                margin: '0 auto',
            }}
        >
            {React.Children.map(children, (child) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    {child}
                </Grid>
            ))}
        </Grid>
    );
};

export default CardContainer;
