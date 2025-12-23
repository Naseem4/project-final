
type Props = {
    showKey: string | null;
};

const Header = ({showKey}: Props) => {
    return (
        <header className="topbar ">
            <div className="brand">

                  < div className="logo">
                  </div>

                <div className="topp">
                    <div className="brand-title">ELITE CINEMA</div>
                    <div className="brand-sub">Seat Booking</div>
                </div>
            </div>

            <div className="mini-pill">
                {showKey ? "Show selected" : "No show selected"}
            </div>
        </header>
    );
};

export default Header;
