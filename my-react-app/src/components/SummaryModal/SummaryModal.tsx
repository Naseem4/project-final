import { NavLink } from "react-router-dom";

type Props = {
    name: string;
    age: string;
    phone: string;
    tickets: string;
    seats: string[];
    showKey: string;
    closeModal: () => void;
    resetAll: () => void;
};

const SummaryModal = ({
                          name,
                          age,
                          phone,
                          tickets,
                          seats,
                          showKey,
                          closeModal,
                          resetAll,
                      }: Props) => {
    const confirm = () => {
        const raw = localStorage.getItem("bookings");
        const all = raw ? JSON.parse(raw) : {};
        all[showKey] = all[showKey] || {};

        seats.forEach(seatId => {
            all[showKey][seatId] = { name, age, phone, tickets, seatId };
        });

        localStorage.setItem("bookings", JSON.stringify(all));

        resetAll();
        closeModal();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h3>Booking Summary</h3>
                <div className="summary">
                    <div>Name: {name}</div>
                    <div>Age: {age}</div>
                    <div>Phone: {phone}</div>
                    <div>Tickets: {tickets}</div>

                    <div>Seats: {seats.join(", ")}</div>
                </div>

                <div className="modal-actions">
                    <button className="btn ghost" onClick={closeModal}>Edit</button>
                    <NavLink to="/" className="btn primary" onClick={confirm}>Confirm</NavLink>
                </div>
            </div>
        </div>
    );
};

export default SummaryModal;
