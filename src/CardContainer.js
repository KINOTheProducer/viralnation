import React from 'react';
import { Grid } from '@mui/material';

const CardContainer = ({ children }) => {
    return (
        <Grid
            container
            justifyContent="center"
            paddingTop={3}
            spacing={3}
            sx={{
                width: { xs: '100vw', sm: '80vw' },
                maxWidth: { xs: '90vw', sm: '90vw' },
                alignItems: 'center',
                margin: '0 auto',
                paddingLeft: { xs: 0, sm: 2 },
                paddingRight: { xs: '20px', sm: 2 },
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
