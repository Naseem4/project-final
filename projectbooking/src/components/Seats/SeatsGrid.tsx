import Seat from "./Seat";

const ROWS = 6;
const COLS = 5;

const seatIdFromIndex = (i: number) => {
    return String(i + 12400);
};

// booking seats
const loadReservedSeats = (showKey: string) => {
    const raw = localStorage.getItem("bookings");
    if (!raw) return {};
    return JSON.parse(raw)[showKey] || {};
};

type Props = {
    tickets: string;
    showKey: string;
    selectedSeats: string[];
    setSelectedSeats: (v: string[]) => void;
};

const SeatsGrid = ({ tickets, showKey, selectedSeats, setSelectedSeats }: Props) => {
    const reserved = loadReservedSeats(showKey);

    return (
        <div className="seats-grid">
            {Array.from({ length: ROWS * COLS }).map((_, i) => {
                const id = seatIdFromIndex(i);
                return (
                    <Seat
                        key={id}
                        id={id}
                        reserved={!!reserved[id]}
                        selected={selectedSeats.includes(id)}

                        // delete , add , nothing
                        onClick={() => {
                            if (selectedSeats.includes(id))
                                setSelectedSeats(selectedSeats.filter(s => s !== id));
                            else if (selectedSeats.length < Number(tickets))
                                setSelectedSeats([...selectedSeats, id]);
                        }}
                    />
                );
            })}
        </div>
    );
};

export default SeatsGrid;
