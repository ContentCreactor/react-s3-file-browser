import { Box, Button } from '@mui/material'
import React from 'react'

interface HeaderInterface {
    openLogin: () => void
    openRegister: () => void
    username?: string
}

const Header: React.FC<HeaderInterface> = ({ openLogin, openRegister, username }) => {
    return (
        <Box display="flex" justifyContent="flex-end">
            {
                username ?
                    username
                    :
                    (
                        <>
                            <Button onClick={openLogin}>
                                Login
                            </Button>
                            <Button onClick={openRegister}>
                                Register
                            </Button>
                        </>
                    )
            }
        </Box>
    )
}

export default Header;
