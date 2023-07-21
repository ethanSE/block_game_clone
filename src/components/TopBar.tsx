import css from '../styles/TopBar.module.css'

export default function TopBar(props: { back: () => void }) {
    return (
        <div className={css.topBarContainer}>
            <p className={css.link}
                onClick={props.back}>Home</p>
            <h3 style={{ cursor: 'default' }}> Block Game Clone</h3>

            <a className={css.link}
                href='https://github.com/ethanSE/block_game_clone'>
                <p>GitHub</p>
            </a>
        </div>
    );
}