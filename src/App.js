import React, { useEffect, useState } from 'react';
import CardContainer from './CardContainer';
import Search from './Search';
import { fetchProfiles, updateProfile, deleteProfile } from './api';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  // Menu,
  // MenuItem,
  Modal,
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  CssBaseline,
  ThemeProvider,
  Stack,
  Container
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { MoreVert, Verified, Close, ModeEdit, DeleteForever } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { lightTheme, darkTheme } from './theme';
import Navbar from './Navbar';


const App = () => {
  const [profiles, setProfiles] = useState([]);
  // const [moreOptions, setMoreOptions] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProfileData, setEditProfileData] = useState(null);
  const [deleteProfileData, setDeleteProfileData] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const fetchProfilesFromAPI = async () => {
      const fetchedProfiles = await fetchProfiles();
      if (fetchedProfiles) {
        setProfiles(fetchedProfiles);
      }
    };

    fetchProfilesFromAPI();
  }, []);

  // Theme Switcher
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  const theme = currentTheme === 'light' ? lightTheme : darkTheme;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleClickMenu = (event) => {
  //   setMoreOptions(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setMoreOptions(null);
  // };


  // Edit Profile
  const openEditModal = (profile) => {
    setEditProfileData(profile);
    console.log(profile);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditProfileData(null);
  };

  const handleUpdateProfileSubmit = async () => {
    try {
      await updateProfile(editProfileData);
      setEditModalOpen(false);
      setEditProfileData(null);
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) => {
          if (profile.id === editProfileData.id) {
            return editProfileData;
          }
          return profile;
        })
      );
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };


  // Delete Profile
  const openDeleteModal = async () => {
    try {
      await deleteProfile(deleteProfileData);
      setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== deleteProfileData.id));
      setDeleteConfirmationOpen(false);
      setDeleteProfileData(null);
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const closeDeleteModal = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteProfile = (profile) => {
    setDeleteProfileData(profile);
    setDeleteConfirmationOpen(true);
  };




  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar currentTheme={currentTheme} toggleTheme={toggleTheme} />
      <div
        style={{
          backgroundColor: currentTheme === 'light' ? '#ffffff' : '#000000',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '100px'
        }}
      >
        <Search />
        <CardContainer>
          {profiles.map((profile) => {
            const { id, first_name, last_name, email, is_verified, image_url, description } = profile;
            return (
              <Card key={id}>
                <CardHeader
                  avatar={<Avatar src={image_url} />}
                  action={
                    <>
                      <IconButton aria-label="Edit Profile" onClick={() => openEditModal(profile)}>
                        <ModeEdit />
                      </IconButton>
                      <IconButton aria-label="Delete Profile" onClick={() => handleDeleteProfile(profile)}>
                        <DeleteForever />
                      </IconButton>
                    </>
                  }
                  title={
                    <Typography variant="h6">
                      {is_verified === true ? (
                        <span>
                          {`${first_name} ${last_name}`} <Verified />
                        </span>
                      ) : (
                        `${first_name} ${last_name}`
                      )}
                    </Typography>
                  }
                  subheader={<Typography variant="subtitle1">{email}</Typography>}
                />
                <CardContent>
                  <Typography variant="body2">{description}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </CardContainer>
        <Dialog open={deleteConfirmationOpen} onClose={closeDeleteModal}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DialogTitle style={{
            borderBottom: currentTheme === 'dark' ? '1px #2B2B2B solid' : '1px #e0e0e0 solid',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ flex: 1 }}>Remove Profile</span>
            <IconButton
              aria-label="Close"
              onClick={closeDeleteModal}
              style={{ marginLeft: 'auto' }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{
            borderBottom: currentTheme === 'dark' ? '1px #2B2B2B solid' : '1px #e0e0e0 solid',
            padding: '25px',
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <DialogContentText>
              Removed profile will be deleted permanently and won't be available anymore.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{ width: '100%', py: 1.5 }}
            >
              <Button
                onClick={closeDeleteModal}
                sx={{
                  color: currentTheme === 'light' ? 'black' : 'white', // Change text color based on current theme
                  backgroundColor: currentTheme === 'light' ? '#EEEEEE' : 'rgba(255, 255, 255, 0.05)', // Change background color based on current theme
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '5%',
                  textTransform: 'capitalize',
                  width: '45%',
                  height: '32px',
                  margin: '0',
                }}
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                onClick={openDeleteModal}
                color="error"
                variant="contained"
                sx={{
                  borderRadius: '5%',
                  textTransform: 'capitalize',
                  width: '45%',
                  height: '32px',
                  margin: '0',
                }}
              >
                Delete
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
        {editModalOpen && editProfileData && (
          <Modal open={editModalOpen} onClose={closeEditModal} className='modal'>
            <div
              style={{
                backgroundColor: currentTheme === 'dark' ? theme.palette.background.paper : 'white',
                boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '2px',

                width: '500px',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    paddingBottom: '20px',
                    borderBottom: currentTheme === 'dark' ? '1px #2B2B2B solid' : '1px #e0e0e0 solid'
                  }}>
                    <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'semibold' }}>
                      Edit Profile
                    </Typography>
                    <IconButton onClick={closeEditModal} style={{
                      marginLeft: 'auto'
                    }}>
                      <Close />
                    </IconButton>
                  </div>
                </Grid>
                <Grid container spacing={2}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '30px',
                    paddingRight: '23px',
                    paddingLeft: '37px',
                    paddingBottom: '10px',
                  }}>
                  <Grid item xs={12}>
                    <TextField
                      label="Image Link"
                      name="image_url"
                      value={editProfileData.image_url || ''}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="First Name"
                      name="first_name"
                      value={editProfileData.first_name || ''}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Last Name"
                      name="last_name"
                      value={editProfileData.last_name || ''}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      name="email"
                      value={editProfileData.email || ''}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      name="description"
                      value={editProfileData.description || ''}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.12)',
                        borderRadius: '4px',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body2" style={{
                        marginRight: 'auto'
                      }}>
                        {editProfileData.is_verified ? 'Talent is verified' : 'Talent is not verified'}
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={editProfileData.is_verified}
                            onChange={(e) =>
                              setEditProfileData((prevData) => ({
                                ...prevData,
                                is_verified: e.target.checked,
                              }))
                            }
                          />
                        }
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={12} justifyContent="flex-end">
                  <Box display="flex" padding={'20px'} justifyContent="flex-end"
                    style={{ borderTop: currentTheme === 'dark' ? '1px #2B2B2B solid' : '1px #e0e0e0 solid', }}>
                    <Button
                      variant="contained"
                      onClick={handleUpdateProfileSubmit}
                      sx={{
                        color: 'white',
                        textTransform: 'capitalize',
                        fontWeight: 'bold',

                      }}
                    >
                      Update Profile
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </Modal>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;