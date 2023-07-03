import React, { useEffect, useState, useRef } from 'react';
import CardContainer from './CardContainer';
import { fetchProfiles, createProfile, updateProfile, deleteProfile } from './api';
import {
  CssBaseline,
  ThemeProvider,
  Button,
  useMediaQuery
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { lightTheme, darkTheme } from './theme';
import Navbar from './Navbar';
import ProfileCard from './Card'
import DeleteModal from './DeleteModal';
import MainModal from './MainModal';
import Search from './Search';


const App = () => {
  const [profiles, setProfiles] = useState([]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createProfileData, setCreateProfileData] = useState({});

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProfileData, setEditProfileData] = useState(null);

  const [deleteProfileData, setDeleteProfileData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [currentTheme, setCurrentTheme] = useState('light');

  // Fetch Profiles from ViralNation API
  useEffect(() => {
    const fetchProfilesFromAPI = async () => {
      setLoading(true);
      const fetchedProfiles = await fetchProfiles();
      if (fetchedProfiles) {
        setProfiles(fetchedProfiles);
      }
      setLoading(false);
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

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;

    setCreateProfileData((prevData) => ({
      ...prevData,
      [name]: value,
      "is_verified": createProfileData.is_verified || false,
    }));
  };

  /////////////////////
  // Theme Switcher //
  ///////////////////
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  const theme = currentTheme === 'light' ? lightTheme : darkTheme;

  // Mobile Checker
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));


  /////////////////////
  // Create Profile //
  ///////////////////
  const openCreateModal = (profile) => {
    setCreateProfileData(profile);
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
    setEditProfileData(null);
  };

  const handleCreateSubmit = async () => {
    try {
      const response = await createProfile(createProfileData);
      const newProfile = {
        ...response.data,
        ...createProfileData,
      };
      setCreateModalOpen(false);
      setCreateProfileData(null);
      setProfiles((prevProfiles) => [newProfile, ...prevProfiles]);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  ///////////////////
  // Edit Profile //
  /////////////////
  const openEditModal = (profile) => {
    setEditProfileData(profile);
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

  /////////////
  // Search //
  ///////////

  const searchValueRef = useRef('');

  const onSearch = async (searchValue) => {
    try {
      const profiles = await fetchProfiles(searchValue);
      if (profiles) {
        setProfiles(profiles);
      } else {
        setProfiles([]);
      }
    } catch (error) {
      console.error('Error searching profiles:', error);
    }
  };

  useEffect(() => {
    onSearch(searchValueRef.current);
  }, []);

  const handleSearchChange = (event) => {
    searchValueRef.current = event.target.value;
    setTimeout(() => {
      onSearch(searchValueRef.current);
    }, 500);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar currentTheme={currentTheme} toggleTheme={toggleTheme} />
      <div
        style={{
          className: 'main-container',
          backgroundColor: currentTheme === 'light' ? '#f2f2f2' : '#000000',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '100px'
        }}
      >
        <div style={{
          className: 'search-container',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Search
            handleSearchChange={handleSearchChange}
            currentTheme={currentTheme}
            theme={theme}
            isMobile={isMobile}
          />
          <Button
            variant="outlined"
            onClick={openCreateModal}
            sx={{
              color: theme.palette.primary.main,
              textTransform: 'capitalize',
              fontWeight: 'bold',
              marginLeft: '20px',
              height: '41px',
            }}
          >
            <PersonAddAlt1Icon style={{ marginRight: '5px' }} />
            Create Profile
          </Button>
        </div>
        <CardContainer>
          {loading ? (
            <p>Loading...</p>
          ) : profiles.length > 0 ? (
            profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                openEditModal={openEditModal}
                openDeleteModal={openDeleteModal}
              />
            ))
          ) : (
            <p>No profiles found.</p>
          )}
        </CardContainer>
        <DeleteModal
          deleteModalOpen={deleteModalOpen}
          closeDeleteModal={closeDeleteModal}
          deleteProfileData={deleteProfileData}
          handleDeleteSubmit={handleDeleteSubmit}
          currentTheme={currentTheme}
        />
        {editModalOpen && editProfileData !== null && (
          <MainModal
            modalOpen={editModalOpen}
            closeModal={closeEditModal}
            modalTitle="Edit Profile"
            modalType="edit"
            setEditProfileData={setEditProfileData}
            editProfileData={editProfileData}
            handleInputChange={handleInputChange}
            handleSubmit={handleEditSubmit}
            currentTheme={currentTheme}
            theme={theme}
            isMobile={isMobile}
          />
        )}
        {createModalOpen && (
          <MainModal
            modalOpen={createModalOpen}
            closeModal={closeCreateModal}
            modalTitle="Create Profile"
            modalType="create"
            setCreateProfileData={setCreateProfileData}
            createProfileData={createProfileData}
            handleCreateInputChange={handleCreateInputChange}
            handleSubmit={handleCreateSubmit}
            currentTheme={currentTheme}
            theme={theme}
            isMobile={isMobile}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
