import css from '../styles/TopBar.module.css'

export default function TopBar(props: { back: () => void }) {
    return (
        <div className={css.topBarContainer}>
            <p onClick={props.back}>Home</p>
            <h3 className={css.title}> Block Game Clone</h3>
            <Links />
        </div>
    );
}

function Links() {
    return (
        <div className={css.linkContainer}>
            <div className={css.link}>
                <a href='http://www.google.com'>
                    <p> google</p>
                </a>
            </div>
            <div className={css.link}>
                <a href='http://www.google.com'>
                    <p> google2</p>
                </a>
            </div>
        </div>
    )
}