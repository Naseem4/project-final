type Props = {
    search: string;
    onSearchChange: (v: string) => void;

};

const Nav = ({search , onSearchChange }:Props) => {

    return (
        <nav className="nav">
            <div className="brand">
                <div className="logo">
                    <img src="./public/images/projectlogo.png" alt="  ELITE CINEMA LOGO" className="logo-img" />
                </div>
                <div>
                    <div className="brand-title">CINEMA UNIVERSE</div>
                    <div className="brand-sub">Watch Online</div>
                </div>
            </div>

            <div className="nav-actions">
                <input type="text" id="search" placeholder="Search movies, genres or keyword..." value={search} onChange={(e) => onSearchChange(e.target.value)} />

                <button className="home-btn" type="button">Home Page</button>


            </div>
        </nav>
    );
}

export default Nav;