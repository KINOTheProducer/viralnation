import React from 'react';
import {
    Button,
    Grid,
    IconButton,
    Modal,
    TextField,
    Typography,
    FormControlLabel,
    Switch,
    Box,
    Slide,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { keyframes } from '@emotion/react';


const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const MainModal = ({
    modalOpen,
    closeModal,
    modalTitle,
    modalType,
    setCreateProfileData,
    createProfileData,
    setEditProfileData,
    editProfileData,
    handleInputChange,
    handleCreateInputChange,
    handleSubmit,
    currentTheme,
    theme,
    isMobile
}) => {



    return (
        <Modal open={modalOpen} onClose={closeModal} className='modal' disablePortal>
            <Slide direction="left" in={modalOpen}>
                <div
                    className="modal-content"
                    style={{
                        backgroundColor: currentTheme === 'dark' ? theme.palette.background.paper : 'white',
                        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)',
                        borderRadius: '2px',
                        height: '100vh',
                        width: isMobile ? '100vw' : '768px',
                        right: 0,
                        position: 'fixed',
                        animation: `${slideInAnimation} 1s forwards`,
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '20px',
                                    paddingBottom: '20px',
                                    borderBottom: currentTheme === 'dark' ? '1px #2B2B2B solid' : '1px #e0e0e0 solid',
                                }}
                            >
                                <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'semibold' }}>
                                    {modalTitle}
                                </Typography>
                                <IconButton onClick={closeModal} style={{ marginLeft: 'auto' }}>
                                    <Close />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: '30px',
                                paddingRight: '23px',
                                paddingLeft: '37px',
                                paddingBottom: '10px',
                            }}
                        >
                            <Grid item xs={12}>
                                <TextField
                                    label="Image Link"
                                    name="image_url"
                                    value={modalType === 'edit' ? editProfileData.image_url : createProfileData.image_url}
                                    onChange={modalType === 'edit' ? handleInputChange : handleCreateInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="First Name"
                                    name="first_name"
                                    value={modalType === 'edit' ? editProfileData.first_name : createProfileData.first_name}
                                    onChange={modalType === 'edit' ? handleInputChange : handleCreateInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Last Name"
                                    name="last_name"
                                    value={modalType === 'edit' ? editProfileData.last_name : createProfileData.last_name}
                                    onChange={modalType === 'edit' ? handleInputChange : handleCreateInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={modalType === 'edit' ? editProfileData.email : createProfileData.email}
                                    onChange={modalType === 'edit' ? handleInputChange : handleCreateInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    placeholder='Write a description for the talent'
                                    value={modalType === 'edit' ? editProfileData.description : createProfileData.description}
                                    onChange={modalType === 'edit' ? handleInputChange : handleCreateInputChange}
                                    multiline
                                    rows={4}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <div
                                    style={{
                                        backgroundColor: currentTheme === 'light' ? '#eeeeee' : '#2b2b2b',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography variant="body2" style={{ marginRight: 'auto' }}>
                                        {modalType === 'edit' ? (editProfileData.is_verified ? 'Talent is verified' : 'Talent is not verified') : (createProfileData.is_verified ? 'Talent is verified' : 'Talent is not verified')}
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={modalType === 'edit' ? editProfileData.is_verified : createProfileData.is_verified}
                                                onChange={(e) => {
                                                    if (modalType === 'edit') {
                                                        setEditProfileData((prevData) => ({
                                                            ...prevData,
                                                            is_verified: e.target.checked,
                                                        }));
                                                    } else if (modalType === 'create') {
                                                        setCreateProfileData((prevData) => ({
                                                            ...prevData,
                                                            is_verified: e.target.checked,
                                                        }));
                                                    }
                                                }}
                                            />
                                        }
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} justifyContent="flex-end">
                            <Box
                                display="flex"
                                padding={'20px'}
                                justifyContent="flex-end"
                                style={{ borderTop: currentTheme === 'dark' ? '1px #2B2B2B solid' : '1px #e0e0e0 solid' }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    sx={{
                                        color: 'white',
                                        textTransform: 'capitalize',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {modalTitle === 'Create Profile' ? 'Create Profile' : 'Update Profile'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </Slide>
        </Modal>
    );
};


export default MainModal;