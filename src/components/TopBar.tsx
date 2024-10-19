import css from '../styles/TopBar.module.css'
import { TopBarHeight } from '../types';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar } from '@mui/material';
import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import GavelIcon from '@mui/icons-material/Gavel';
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function TopBar(props: {
    back: () => void,
    showBack: boolean
}) {
    const [rulesDialogVisible, setRulesDialogVisible] = useState(false);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <AppBar className={css.topBarContainer} style={{ height: TopBarHeight, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <Toolbar sx={{ flexGrow: 1 }}>
                <IconButton
                    edge="start"
                    onClick={handleMenu}
                >
                    <MenuIcon />
                </IconButton>

                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    {props.showBack &&
                        <MenuItem onClick={() => { props.back(); setAnchorEl(null) }}>
                            <ListItemIcon>
                                <HomeIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </MenuItem>
                    }
                    <MenuItem onClick={() => { setRulesDialogVisible(true); setAnchorEl(null) }}>
                        <ListItemIcon>
                            <GavelIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Rules</ListItemText>
                    </MenuItem>
                </Menu>

                <Typography
                    sx={{ flexGrow: 1, ml: 5 }}
                    variant="h6"
                >
                    Block Game Clone
                </Typography>

                <Link
                    sx={{ margin: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    href='https://github.com/ethanSE/block_game_clone'
                    underline='hover'

                >
                    <GitHubIcon sx={{ mr: 1 }} />
                    GitHub
                </Link>
            </Toolbar>


            <Dialog
                open={rulesDialogVisible}
                onClose={() => { setRulesDialogVisible(false); setAnchorEl(null); }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                scroll='paper'
            >
                <DialogTitle>
                    How To Play
                </DialogTitle>

                <DialogContent dividers={true}>
                    <DialogTitle>
                        Rules:
                    </DialogTitle>
                    <DialogContentText tabIndex={-1}>
                        Players take turns placing pieces on the game board. The first player is free to play anywhere. The second player must touch the first player's piece. After this, players much touch their own piece with every play.
                        Pieces must be placed on the game board and within the height limits. All cubes within a piece must be supported.
                    </DialogContentText>

                    <DialogTitle>
                        Making a Move:
                    </DialogTitle>
                    <DialogContentText>
                        1. Select a piece from the bottom piece selector
                    </DialogContentText>
                    <DialogContentText>
                        2. Select a cube to the pick the piece up by
                    </DialogContentText>
                    <DialogContentText>
                        3. Rotate the piece using the rotate controls
                    </DialogContentText>
                    <DialogContentText>
                        4. Place the piece on the game board
                    </DialogContentText>
                    <DialogContentText>
                        5. Hit the play button
                    </DialogContentText>

                    <DialogTitle>
                        Scoring:
                    </DialogTitle>
                    <DialogContentText>
                        A player's score is the number of their cubes visible from the top down. The player with the highest score once all piece are played or no more moves can be made wins.
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRulesDialogVisible(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </AppBar>
    );
}