import { useState } from 'react';
import { fetchReservedHours, ReservedHours } from '../../pages/ticket_form/ticketFormFunctions';
import { useQuery } from 'react-query';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ScheduleForm.css';

interface ScheduleFormProps {
    nextStep: () => void,
    prevStep: () => void,
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({ prevStep, nextStep }) => {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])

    const { data, error, isLoading } = useQuery<ReservedHours[], Error>(
        ['availableServices', date], 
        () => fetchReservedHours(date)
    );



    const generateTimes = (date: Date | null): string[] => {
        if (!date) return [];
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) return []; // Weekend

        const times: string[] = [];
        for (let hour = 8; hour <= 15; hour++) {
            times.push(`${hour.toString().padStart(2, '0')}:00`);
        }
        return times;
    };

    const times = generateTimes(selectedDate);
    console.log(data)

    const handleTimeClick = (time: string) => {
        setSelectedTime(time);
    };
    return (
        <div className="flex items-center justify-center flex-col">
            <h2 className="text-2xl mb-20 mt-10">Choose your preferred date to take your car to the service center</h2>
    
            <div className="flex-container">
                <div className="calendar-container">
                    <Calendar
                        onChange={(dateRange) => {
                            if (dateRange instanceof Array) {
                                setSelectedDate(dateRange[0]);
                            } else {
                                setSelectedDate(dateRange);
                            }
                        }}
                        value={selectedDate}
                        minDetail="month"
                        tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6} // Disable weekends
                        locale='en' // Ustawienie języka kalendarza na angielski
                    />
                </div>
                <div className='time-list mt-10'>
                    {selectedDate && (
                        <>
                            <h3>Times for {selectedDate.toDateString()}:</h3>
                            {times.length === 0 ? (
                                <p>No available times on weekends.</p>
                            ) : (
                                times.map((time, index) => (
                                    <button
                                        key={index}
                                        className='time-button'
                                        onClick={() => handleTimeClick(time)}
                                    >
                                        {time}
                                    </button>
                                ))
                            )}
                        </>
                    )}
                </div>
            </div>
            {selectedTime && (
                <div className='mt-4'>
                    <p>
                        Selected date and time: {selectedDate?.toDateString()} {selectedTime}
                    </p>
                </div>
            )}
            <div className='w-full h-full flex justify-between sticky bottom-7 mt-12'>
                <button className='ticket-form-button' onClick={prevStep}>
                    Prev
                </button>
                <button className='ticket-form-button' onClick={nextStep}>
                    Next
                </button>
            </div>
        </div>
    );
    
}