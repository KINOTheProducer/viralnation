import React, { useEffect, useState } from 'react';
import CardContainer from './CardContainer';
import Search from './Search';
import { fetchProfiles, createProfile, updateProfile, deleteProfile, getProfileById } from './api';
import { Card, CardHeader, CardContent, Avatar, Menu, MenuItem, Modal } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { MoreVert, Verified } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [moreOptions, setMoreOptions] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editProfileData, setEditProfileData] = useState(null);
  const [updatedProfileData, setUpdatedProfileData] = useState(editProfileData);


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

  const handleClickMenu = (event) => {
    setMoreOptions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMoreOptions(null);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false); // Close the edit modal
  };


  const [createProfileData, setCreateProfileData] = useState({
    imageUrl: '',
    firstName: '',
    lastName: '',
    email: '',
    description: '',
    isVerified: false
  });

  const handleCreateProfile = async () => {

    try {
      const response = await createProfile(createProfileData);
      console.log('Profile created successfully:', response);
    } catch (error) {
      console.error('Failed to create profile:', error);
    }
  };

  const handleUpdateProfile = async (id) => {
    try {
      const profile = await getProfileById(id);
      setEditProfileData({ ...profile });
      setEditModalOpen(true);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    if (editProfileData) {
      setUpdatedProfileData(editProfileData);
    }
  }, [editProfileData]);

  const handleUpdateProfileSubmit = async () => {
    try {
      await updateProfile(editProfileData.id, updatedProfileData);
      setEditModalOpen(false);
      setUpdatedProfileData(null);
      setEditProfileData(null);
      setProfiles(profiles.filter((profile) => profile.id !== editProfileData.id));
      console.log('Profile updated successfully:', updatedProfileData);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <Search />
      <CardContainer>
        {profiles.map((profile) => {
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
                  <IconButton aria-label="More Options" onClick={handleClickMenu}>
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
              <Menu
                anchorEl={moreOptions}
                open={Boolean(moreOptions)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={() => handleUpdateProfile(id)}>Edit profile</MenuItem>
                {/* <MenuItem onClick={() => handleDeleteProfile(id)}>Delete profile</MenuItem> */}
              </Menu>
            </Card>
          );
        })}
      </CardContainer>
      {editModalOpen && (
        <Modal open={editModalOpen} onClose={handleCloseEditModal}>
          {editProfileData && (
            <div>
              <input
                type="text"
                name="first_name"
                value={editProfileData.first_name || ''}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="last_name"
                value={editProfileData.last_name || ''}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="email"
                value={editProfileData.email || ''}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="image_url"
                value={editProfileData.image_url || ''}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="description"
                value={editProfileData.description || ''}
                onChange={handleInputChange}
              />
              <button onClick={handleUpdateProfileSubmit}>Update Profile</button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default App;