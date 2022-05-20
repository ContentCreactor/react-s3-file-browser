import { Box, Button } from '@mui/material'
import React from 'react'

interface HeaderInterface {
    openLogin: () => void
    openRegister: () => void
}

const Header: React.FC<HeaderInterface> = ({ openLogin, openRegister }) => {
    return (
        <Box display="flex" justifyContent="flex-end">
            <Button onClick={openLogin}>
                Login
            </Button>
            <Button onClick={openRegister}>
                Register
            </Button>
        </Box>
    )
}

export default Header;
