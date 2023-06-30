import React from 'react';
import { Modal, Grid, TextField, Typography, IconButton, FormControlLabel, Switch, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EditModal = ({ editModalOpen, onClose, editProfile, handleInputChange, handleUpdateProfileSubmit }) => {
    return (
        editModalOpen && editProfile && (
            <Modal open={editModalOpen} onClose={onClose}>
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
                    {editProfile && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                                        Edit Profile
                                    </Typography>
                                    <IconButton onClick={onClose} style={{ marginLeft: 'auto' }}>
                                        <CloseIcon />
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
                                    label="ID"
                                    name="id"
                                    value={editProfile.id}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Image Link"
                                    name="image_url"
                                    value={editProfile.image_url}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="First Name"
                                    name="first_name"
                                    value={editProfile.first_name}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Last Name"
                                    name="last_name"
                                    value={editProfile.last_name}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={editProfile.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={editProfile.description}
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
                                        {editProfile.is_verified ? 'Talent is verified' : 'Talent is not verified'}
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={editProfile.is_verified}
                                                onChange={(e) =>
                                                    handleInputChange({
                                                        target: {
                                                            name: 'is_verified',
                                                            value: e.target.checked,
                                                        },
                                                    })
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
                    )}
                </div>
            </Modal>
        )
    );
};

export default EditModal;
