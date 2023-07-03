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
} from '@mui/material';
import { Close } from '@mui/icons-material';

const MainModal = ({
    modalOpen,
    closeModal,
    modalTitle,
    setEditProfileData,
    editProfileData,
    handleInputChange,
    handleSubmit,
    currentTheme,
    theme
}) => {
    return (
        <Modal open={modalOpen} onClose={closeModal} className='modal'>
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
                                value={modalTitle === 'Edit Profile' ? editProfileData.image_url : ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="First Name"
                                name="first_name"
                                value={modalTitle === 'Edit Profile' ? editProfileData.first_name : ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Last Name"
                                name="last_name"
                                value={modalTitle === 'Edit Profile' ? editProfileData.last_name : ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                value={modalTitle === 'Edit Profile' ? editProfileData.email : ''}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                name="description"
                                value={modalTitle === 'Edit Profile' ? editProfileData.description : ''}
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
                                <Typography variant="body2" style={{ marginRight: 'auto' }}>
                                    {modalTitle === 'Edit Profile' ? (editProfileData.is_verified ? 'Talent is verified' : 'Talent is not verified') : ''}
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={modalTitle === 'Edit Profile' ? editProfileData.is_verified : false}
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
        </Modal>
    );
};


export default MainModal;