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

  // const [currentPage, setCurrentPage] = useState(1);
  // const [loadingMore, setLoadingMore] = useState(false);

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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


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
      setDeleteProfileData(null);
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

  /////////////////
  // Pagination //
  ///////////////

  // const lastCardRef = useRef(null);

  // const loadMoreData = useCallback(async () => {
  //   if (!loadingMore) {
  //     try {
  //       setLoadingMore(true);
  //       const newProfiles = await fetchProfiles(currentPage + 1);
  //       console.log(currentPage);
  //       console.log(newProfiles);
  //       if (newProfiles && newProfiles.length > 0) {
  //         setProfiles((prevProfiles) => [...prevProfiles, ...newProfiles]);
  //         setCurrentPage((prevPage) => prevPage + 1);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching more data:', error);
  //     } finally {
  //       setLoadingMore(false);
  //     }
  //   }
  // }, [currentPage, loadingMore]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop ===
  //       document.documentElement.offsetHeight
  //     ) {
  //       loadMoreData();
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [loadMoreData]);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar currentTheme={currentTheme} toggleTheme={toggleTheme} />
      <div
        style={{
          className: 'main-container',
          backgroundColor: currentTheme === 'light' ? '#f2f2f2' : '#121312',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '100px',
          alignContent: 'center',
        }}
      >
        <div style={{
          className: 'search-container',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '20px' : '10px',
          alignItems: isMobile ? 'flex-end' : 'center',
          justifyContent: isMobile ? 'flex-end' : 'center',
          paddingLeft: isMobile ? '10px' : '25px',
          paddingRight: isMobile ? '30px' : 0,
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
              color: currentTheme === 'light' ? theme.palette.primary.main : '#eeeeee',
              backgroundColor: currentTheme === 'light' ? 'inherit' : '#181818',
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
        <CardContainer
        >
          {loading ? (
            <p>Loading...</p>
          ) : profiles.length > 0 ? (
            profiles.map((profile, index) => {
              if (index === profiles.length - 1) {
                return (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    openEditModal={openEditModal}
                    openDeleteModal={openDeleteModal}
                  />
                );
              } else {
                return (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    openEditModal={openEditModal}
                    openDeleteModal={openDeleteModal}
                  />
                );
              }
            })
          ) : (
            <p>No profiles found.</p>
          )}
        </CardContainer>
        <DeleteModal
          deleteModalOpen={deleteModalOpen}
          closeDeleteModal={closeDeleteModal}
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
