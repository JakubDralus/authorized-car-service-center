interface PopupProps {
    status: string;
    message: string;
    onClose: () => void;
}

const ReviewPopup: React.FC<PopupProps> = ({ status, message, onClose }) => {
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }} className="bg-white p-8 rounded-lg h-80 w-64 flex justify-between items-center flex-col">
                <h2 className="text-3xl">{status}</h2>
                <p className="text-xl text-center">{message}</p>
                <button className="bg-slate-100 py-2 px-4 text-sm" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};


export default ReviewPopup