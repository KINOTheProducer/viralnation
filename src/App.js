import React, { useEffect, useState } from 'react';
import CardContainer from './CardContainer';
import Search from './Search';
import { fetchProfiles, updateProfile, deleteProfile } from './api';
import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Navbar from './Navbar';
import ProfileCard from './Card'
import DeleteModal from './DeleteModal';
import MainModal from './MainModal';


const App = () => {
  const [profiles, setProfiles] = useState([]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createProfileData, setCreateProfileData] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProfileData, setEditProfileData] = useState(null);

  const [deleteProfileData, setDeleteProfileData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [currentTheme, setCurrentTheme] = useState('light');

  // Fetch Profiles from ViralNation API
  useEffect(() => {
    const fetchProfilesFromAPI = async () => {
      const fetchedProfiles = await fetchProfiles();
      if (fetchedProfiles) {
        setProfiles(fetchedProfiles);
      }
    };

    fetchProfilesFromAPI();
  }, []);

  // Make text fields editable
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /////////////////////
  // Theme Switcher //
  ///////////////////
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  const theme = currentTheme === 'light' ? lightTheme : darkTheme;


  /////////////////////
  // Create Profile //
  ///////////////////
  const openCreateModal = (profile) => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleCreateSubmit = async () => {
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

  ///////////////////
  // Edit Profile //
  /////////////////
  const openEditModal = (profile) => {
    setEditProfileData(profile);
    console.log(profile);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditProfileData(null);
  };

  const handleEditSubmit = async () => {
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

  /////////////////////
  // Delete Profile //
  ///////////////////
  const openDeleteModal = (profile) => {
    setDeleteProfileData(profile);
    console.log(profile);
    setDeleteModalOpen(true);
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteSubmit = async () => {
    try {
      await deleteProfile(deleteProfileData);
      setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== deleteProfileData.id));
      setDeleteModalOpen(false);
      setDeleteProfileData(null);
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
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
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />))}
        </CardContainer>
        <DeleteModal
          deleteModalOpen={deleteModalOpen}
          closeDeleteModal={closeDeleteModal}
          deleteProfileData={deleteProfileData}
          handleDeleteSubmit={handleDeleteSubmit}
          currentTheme={currentTheme}
        />
        {/* <MainModal
          modalOpen={createModalOpen}
          closeModal={closeCreateModal}
          modalTitle="Create Profile"
          initialValues={{ image_url: '', first_name: '', last_name: '', email: '', description: '', is_verified: false }}
          handleInputChange={handleInputChange}
          handleSubmit={handleCreateSubmit}
          currentTheme={currentTheme}
        /> */}
        {editModalOpen && editProfileData !== null && (
          <MainModal
            modalOpen={editModalOpen}
            closeModal={closeEditModal}
            modalTitle="Edit Profile"
            setEditProfileData={setEditProfileData}
            editProfileData={editProfileData}
            handleInputChange={handleInputChange}
            handleSubmit={handleEditSubmit}
            currentTheme={currentTheme}
            theme={theme}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;