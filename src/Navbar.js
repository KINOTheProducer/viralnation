import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import styled from 'styled-components';

const NavbarContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#f5f5f5',
});

const SwitchContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

const Icon = styled('span')({
    marginRight: '8px',
});

function Navbar({ currentTheme, toggleTheme }) {
    const logoImage = currentTheme === 'light' ? '/logo-dark.png' : '/logo-light.png';
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
                backgroundColor: currentTheme === 'light' ? '#FCFCFD' : '#181818',
                color: currentTheme === 'light' ? '#000000' : '#ffffff',
                zIndex: 1000,
            }}
        >
            <img
                src={logoImage}
                alt="ViralNation Logo"
                style={{
                    width: '120px',
                    height: 'auto',
                }}
            />
            <FormControlLabel
                control={
                    <SwitchContainer>
                        <Icon>
                            <LightMode />
                        </Icon>
                        <Switch
                            checked={currentTheme === 'dark'}
                            onChange={toggleTheme}
                            style={{
                                color: '#cccccc',
                            }}
                        />
                        <Icon>
                            <DarkMode />
                        </Icon>
                    </SwitchContainer>
                }
            />
        </div >
    );
}

export default Navbar;