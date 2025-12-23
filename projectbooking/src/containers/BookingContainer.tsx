import { useState, useEffect } from "react";

import Header from "../components/Header/Header.tsx";
import BookingForm from "../components/BookingForm/BookingForm.tsx";
import SeatsPage from "../components/Seats/SeatsPage.tsx";
import SummaryModal from "../components/SummaryModal/SummaryModal.tsx";

const BookingContainer = () => {
    const [step, setStep] = useState<1 | 2>(1);

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [tickets, setTickets] = useState("");

    const [showKey, setShowKey] = useState<string | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);

    // call API fake
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => {
                console.log("FETCH API DATA:", data);
            })
            .catch(err => {
                console.error("FETCH ERROR:", err);
            });
    }, []);



    return (
        <div className="app">
            <Header showKey={showKey} />

            {step === 1 && (
                <BookingForm
                    name={name}
                    age={age}
                    phone={phone}
                    tickets={tickets}
                    setName={setName}
                    setAge={setAge}
                    setPhone={setPhone}
                    setTickets={setTickets}
                    setShowKey={setShowKey}
                    goNext={() => setStep(2)}
                />
            )}

            {step === 2 && (
                <SeatsPage
                    name={name}
                    age={age}
                    phone={phone}
                    tickets={tickets}
                    showKey={showKey!}
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    goBack={() => setStep(1)}
                    openModal={() => setShowModal(true)}
                />
            )}

            {showModal && (
                <SummaryModal
                    name={name}
                    age={age}
                    phone={phone}
                    tickets={tickets}
                    seats={selectedSeats}
                    showKey={showKey!}
                    closeModal={() => setShowModal(false)}
                    resetAll={() => {
                        setStep(1);
                        setName("");
                        setAge("");
                        setPhone("");
                        setTickets("");
                        setSelectedSeats([]);
                        setShowKey(null);

                    }}
                />
            )}
        </div>

    );
};

export default BookingContainer;
