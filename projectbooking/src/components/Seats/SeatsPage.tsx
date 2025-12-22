import SeatsGrid from "./SeatsGrid";

type Props = {
    name: string;
    age: string;
    phone: string;
    tickets: string;
    showKey: string;
    selectedSeats: string[];
    setSelectedSeats: (v: string[]) => void;
    goBack: () => void;
    openModal: () => void;
};

const SeatsPage = ({
                       name,
                       tickets,
                       showKey,
                       selectedSeats,
                       setSelectedSeats,
                       goBack,
                       openModal,
                   }: Props) => {
    return (
        <section className="panel">
            <div className="seats-head">
                <div>
                    <h2 className="title-sm">Please, {name} choose your seat</h2>
                    <p className="muted">Tap any available seat to select it.</p>
                </div>
                <div className="legend">
                    <div className="legend-item">
                        <span className="seat-dot available"></span>
                        <span>Available</span>
                    </div>
                    <div className="legend-item">
                        <span className="seat-dot reserved"></span>
                        <span>Reserved</span>
                    </div>
                    <div className="legend-item">
                        <span className="seat-dot selected"></span>
                        <span>Your Seat</span>
                    </div>
                </div>
            </div>

            <div className="hall">
                <div className="screen">
                    <div className="screen-inner">SCREEN</div>
                </div>
                <div className="grid-wrap">
                    <SeatsGrid
                        tickets={tickets}
                        showKey={showKey}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                    />
                </div>
            </div>

            <div className="actions">
                <button className="btn ghost" onClick={goBack}>Back</button>
                <button className="btn primary"
                        disabled={selectedSeats.length !== Number(tickets)}
                            onClick={openModal}
                        >
                            Confirm Booking
                        </button>
            </div>

        </section>
);
};

export default SeatsPage;
