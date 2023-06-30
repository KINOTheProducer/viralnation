import React, { useEffect, useState } from 'react';
import CardContainer from './CardContainer';
import Search from './Search';
import { fetchProfiles, updateProfile, deleteProfile } from './api';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Menu,
  MenuItem,
  Modal,
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import { MoreVert, Verified, Close, ModeEdit, DeleteForever } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [moreOptions, setMoreOptions] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProfileData, setEditProfileData] = useState(null);
  const [deleteProfileData, setDeleteProfileData] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  useEffect(() => {
    const fetchProfilesFromAPI = async () => {
      const fetchedProfiles = await fetchProfiles();
      if (fetchedProfiles) {
        setProfiles(fetchedProfiles);
      }
    };

    fetchProfilesFromAPI();
  }, []);

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
      await deleteProfile(deleteProfileData.id);
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
    setDeleteConfirmationOpen();
  };




  return (
    <div>
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
                    <IconButton aria-label="Delete Profile" onClick={() => openDeleteModal(profile)}>
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
      {editModalOpen && editProfileData && (
        <Modal open={openEditModal} onClose={closeEditModal} className='modal'>
          <div
            style={{
              backgroundColor: 'white',
              boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '2px',
              padding: '20px',
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Edit Profile
                  </Typography>
                  <IconButton onClick={closeEditModal} style={{ marginLeft: 'auto' }}>
                    <Close />
                  </IconButton>
                </div>
                <hr
                  style={{
                    marginTop: '8px',
                    marginBottom: '16px',
                    border: 'none',
                    borderBottom: '1px solid #ccc',
                  }}
                />
              </Grid>
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
                    backgroundColor: 'rgba(0, 0, 0, 0.15)',
                    borderRadius: '4px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" style={{ marginRight: 'auto' }}>
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
              <Grid item xs={12} justifyContent="flex-end">
                <Box display="flex" justifyContent="flex-end">
                  <Button variant="contained" onClick={handleUpdateProfileSubmit}>
                    Update Profile
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Modal open={deleteConfirmationOpen} onClose={closeDeleteModal}>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'white',
                  boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)',
                  borderRadius: '2px',
                  padding: '20px',
                }}
              >
                <Typography variant="h6">Remove Profile</Typography>
                <Typography variant="body1">Removed profile will be deleted permanently and won't be available anymore</Typography>
                <Button onClick={closeDeleteModal}>Cancel</Button>
                <Button onClick={handleDeleteProfile} color="error" variant="contained">
                  Delete
                </Button>
              </div>
            </Modal>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;