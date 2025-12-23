type Props = {
    id: string;
    reserved: boolean;
    selected: boolean;
    onClick: () => void;
};

const Seat = ({ reserved, selected, onClick }: Props) => {
    let className = "seat available";
    if (reserved) className = "seat reserved";
    if (selected) className = "seat selected";

    return (
        <button className={className} disabled={reserved} onClick={onClick}>
            <div className="chair"></div>
            <div className="stand"></div>
        </button>
    );
};

export default Seat;
