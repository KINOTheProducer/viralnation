import { React, useState } from 'react';
import { Card, CardHeader, Avatar, IconButton, Typography, CardContent, Menu, MenuItem } from '@mui/material';
import { ModeEdit, DeleteForever, MoreVert } from '@mui/icons-material';
import Verified from '@mui/icons-material/Verified';


const ProfileCard = ({ profile, openEditModal, openDeleteModal }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    // const [cardWidth, setCardWidth] = useState('');
    // const [cardHeight, setCardHeight] = useState('');

    // const handleResize = (e) => {
    //     const newWidth = `${e.target.offsetWidth}px`;
    //     const newHeight = `${e.target.offsetHeight}px`;
    //     // setCardWidth(newWidth);
    //     // setCardHeight(newHeight);
    // }

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
            style={{ resize: 'both', overflow: 'auto' }}
        >
            <CardHeader
                avatar={<Avatar src={image_url} />}
                action={
                    <>
                        <IconButton
                            aria-label="More Options"
                            onClick={handleMenuOpen}
                            style={{
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
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
            <CardContent style={{ overflow: 'hidden' }}>
                <Typography variant="body2" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;