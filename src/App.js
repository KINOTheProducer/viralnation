import React, { useEffect, useState } from 'react';
// import { useMediaQuery, useTheme } from '@mui/material';
import CardContainer from './CardContainer';
import Search from './Search';
import { fetchProfiles } from './api';
import { Card, CardHeader, CardContent, Avatar, Menu, MenuItem, Modal } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { MoreVert, Verified } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const App = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [profiles, setProfiles] = useState([]);


  useEffect(() => {
    const fetchProfilesFromAPI = async () => {
      const fetchedProfiles = await fetchProfiles();
      if (fetchedProfiles) {
        setProfiles(fetchedProfiles);
      }
    };

    fetchProfilesFromAPI();
  }, []);

  return (
    <div>
      <Search />
      <CardContainer>
        {profiles.map((profile, index) => {
          const { id, first_name, last_name, email, is_verified, image_url, description } = profile;
          return (
            <Card
              key={id}
            >
              <CardHeader
                avatar={
                  <Avatar src={image_url} />
                }
                action={
                  <IconButton aria-label="More Options">
                    <MoreVert />
                  </IconButton>
                }
                title=
                <Typography variant="h6">
                  {
                    is_verified === 'true' ? (
                      <span>
                        {`${first_name} ${last_name}`} <Verified />
                      </span>
                    ) : (
                      `${first_name} ${last_name}`
                    )
                  }
                </Typography>

                subheader=
                <Typography variant="subtitle1">
                  {email}
                </Typography>

              />
              <CardContent>
                <Typography variant="body2">
                  {description}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </CardContainer>
    </div>
  );
};

export default App;