import { React, useState } from 'react';
import { Card, CardHeader, Avatar, IconButton, Typography, CardContent, Menu, MenuItem, useTheme } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import Verified from './assets/verified.png';

const ProfileCard = ({ profile, openEditModal, openDeleteModal }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const theme = useTheme();

    const VerifiedIcon = () => {
        return <img src={Verified} alt="Verified Icon" />;
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditProfile = () => {
        handleMenuClose();
        openEditModal(profile);
    };

    const handleDeleteProfile = (profile) => {
        handleMenuClose();
        openDeleteModal(profile);
    };

    const { id, first_name, last_name, email, is_verified, image_url, description } = profile;

    return (
        <Card key={id}
            style={{
                overflow: 'hidden',
                resize: 'both',
                backgroundColor: theme.palette.mode === 'light' ? '#eeeeee' : 'inherit',
                height: '255px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >

            <CardHeader
                avatar={<Avatar src={image_url} />}
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                action={
                    <>
                        <IconButton
                            aria-label="More Options"
                            onClick={handleMenuOpen}
                            sx={{
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <MoreVert />
                        </IconButton>
                        <Menu
                            id="profile-actions-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
                            <MenuItem onClick={() => handleDeleteProfile(profile)}>Delete Profile</MenuItem>
                        </Menu>
                    </>
                }
                title={
                    <Typography variant="h6" fontWeight="bold" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        gap: '5px',
                    }}>

                        {`${first_name} ${last_name}`}
                        {is_verified === true && <VerifiedIcon />}
                    </Typography>
                }
                subheader={<Typography variant="subtitle1" sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {email}
                </Typography>}
            />

            <CardContent>
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;