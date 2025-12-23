type Props = {
    name: string;
    age: string;
    phone: string;
    tickets: string;
    setName: (v: string) => void;
    setAge: (v: string) => void;
    setPhone: (v: string) => void;
    setTickets: (v: string) => void;
    setShowKey: (v: string) => void;
    goNext: () => void;
};

const BookingForm = ({
                         name,
                         age,
                         phone,
                         tickets,
                         setName,
                         setAge,
                         setPhone,
                         setTickets,
                         setShowKey,
                         goNext,
                     }: Props) => {

    const handleDone = () => {
        if (!name) {
            alert("Please enter your name");
            return;
        }

        if (!age) {
            alert("Please enter your age");
            return;
        }

        if (+age <= 12) {
            alert("Please bring an adult");
            return;
        }

        if (!phone) {
            alert("Please enter your phone number");
            return;
        }

        if (!tickets || Number(tickets) <= 0) {
            alert("Please enter number of tickets");
            return;
        }

        setShowKey(`${phone}__${tickets}`);
        goNext();
    };

    return (
        <section className="panel">
            <h1 className="title">Enter Your Details</h1>
            <p className="lead">
                Fill the form, then tap <strong>Done</strong> to choose your seat.
            </p>

            <div className="form-grid">
                <label className="field">
                    <span>Full Name</span>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. mohamad birawi"
                    />
                </label>

                <label className="field">
                    <span>Age</span>
                    <input
                        type="number"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        placeholder="e.g. 13 (Bigger than 12)"
                    />
                </label>

                <label className="field">
                    <span>Number phone</span>
                    <input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="e.g. 059******"
                    />
                </label>

                <label className="field">
                    <span>Number of tickets</span>
                    <input
                        type="number" // let two arrows remain
                        value={tickets}
                        onChange={e => setTickets(e.target.value)}
                        placeholder="e.g. 1"
                    />
                </label>
            </div>

            <div className="actions">
                <button className="btn ghost" onClick={() => {
                    setName("");
                    setAge("");
                    setPhone("");
                    setTickets("");
                }}>
                    Reset
                </button>

                <button className="btn primary" onClick={handleDone}>
                    Done
                </button>
            </div>
        </section>

    );
};

export default BookingForm;
