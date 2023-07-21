import css from '../styles/TopBar.module.css'

export default function TopBar(props: { back: () => void }) {
    return (
        <div className={css.topBarContainer}>
            <p style={{ marginLeft: '10px', width: '50px' }}
                onClick={props.back}>Home</p>
            <h3 > Block Game Clone</h3>

            <a style={{ marginRight: '10px', width: '50px' }}
                href='https://github.com/ethanSE/block_game_clone'>
                <p>GitHub</p>
            </a>
        </div>
    );
}