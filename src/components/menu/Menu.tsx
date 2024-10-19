import { MenuDemo } from "./MenuDemo"
import css from '../../styles/Menu.module.css'
import { Mode } from "../App"
import { TwoPlayerMap } from "block-game-clone-backend/types/TwoPlayerMap"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

export const Menu = (props: { setMode: (m: Mode) => void }) => {
    return (
        <div className={css.menu}>
            <MenuDemo />
            <Box
                style={{ flexDirection: 'row' }}
            >
                <Card style={{ width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='overline'>
                        Select game mode:</Typography>
                    <div style={{ flex: '1', display: 'flex', width: '100%' }}>
                        <MapModeSelector setMode={props.setMode} gameMode={"VSGreedyAI"} />
                        <MapModeSelector setMode={props.setMode} gameMode={"TwoPlayer"} />
                    </div>
                </Card>
            </Box>
        </div>
    )
};

function MapModeSelector(props: { setMode: (m: Mode) => void, gameMode: "VSGreedyAI" | "TwoPlayer" }) {
    let maps: TwoPlayerMap[] = ["Tower", "Pyramid", "Wall", "Stairs"];
    return (
        <div className={css.mapSelector}>
            <Typography variant='subtitle1'>{props.gameMode}</Typography>
            {maps.map((map) =>
                <>
                    <Button
                        sx={{ margin: 1 }}
                        variant="contained"
                        className={css.button}
                        onClick={() => props.setMode({ type: props.gameMode, data: map })}
                    >
                        {map}
                    </Button>
                </>
            )}
        </div>
    )
}