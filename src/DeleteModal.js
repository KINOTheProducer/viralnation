import { React } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Stack,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const DeleteModal = ({
    deleteModalOpen,
    closeDeleteModal,
    handleDeleteSubmit,
    currentTheme,
}) => {

    return (
        <Dialog
            open={deleteModalOpen}
            onClose={closeDeleteModal}
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <DialogTitle
                style={{
                    borderBottom: currentTheme === 'dark' ? '1px #2B2B2B solid' : '1px #e0e0e0 solid',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <span style={{ flex: 1 }}>Remove Profile</span>
                <IconButton aria-label="Close" onClick={closeDeleteModal} style={{ marginLeft: 'auto' }}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent
                style={{
                    borderBottom: currentTheme === 'dark' ? '1px #2B2B2B solid' : '1px #e0e0e0 solid',
                    padding: '25px',
                    width: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <DialogContentText>
                    Removed profile will be deleted permanently and won't be available anymore.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: '100%', py: 1.5 }}
                >
                    <Button
                        onClick={closeDeleteModal}
                        sx={{
                            color: currentTheme === 'light' ? 'black' : 'white',
                            backgroundColor: currentTheme === 'light' ? '#EEEEEE' : 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '5%',
                            textTransform: 'capitalize',
                            width: '45%',
                            height: '32px',
                            margin: '0',
                        }}
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteSubmit}
                        color="error"
                        variant="contained"
                        sx={{
                            borderRadius: '5%',
                            textTransform: 'capitalize',
                            width: '45%',
                            height: '32px',
                            margin: '0',
                        }}
                    >
                        Delete
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteModal;