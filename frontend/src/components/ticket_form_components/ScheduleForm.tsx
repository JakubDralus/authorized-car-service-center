import { useState, useEffect, useContext } from 'react';
import { fetchReservedHours, Schedule } from '../../pages/ticket_form/ticketFormFunctions';
import { useQuery } from 'react-query';
import Calendar from 'react-calendar';
import { ScheduleDataContext, TicketDataContext } from "../../pages/ticket_form/ticketFormFunctions";
import 'react-calendar/dist/Calendar.css';
import './ScheduleForm.css';

interface ScheduleFormProps {
    nextStep: () => void,
    prevStep: () => void,
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({ prevStep, nextStep }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>();
    const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
    const [reservedTimes, setReservedTimes] = useState<string[]>([]);

    const scheduleContext = useContext(ScheduleDataContext);
    const ticketDataContext = useContext(TicketDataContext);

    const { data, error, isLoading, refetch } = useQuery(
        ['availableServices', selectedDate],
        () => fetchReservedHours(selectedDate ? selectedDate.toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA')),
        {
            enabled: !!selectedDate,
        }
    );

    useEffect(() => {
        if (shouldRefetch) {
            refetch();
            setShouldRefetch(false);
        }
    }, [shouldRefetch, refetch]);

    useEffect(() => {
        if (data) {
            const reservedTimes = data.data.map((reservedHour: Schedule) => reservedHour.hour);
            setReservedTimes(reservedTimes);
        }
    }, [data]);

    const generateTimes = (date: Date | null, reservedHours: string[]): string[] => {
        if (!date) return [];
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) return []; // Weekend

        const times: string[] = [];
        for (let hour = 8; hour <= 15; hour++) {
            const formattedHour = `${hour.toString().padStart(2, '0')}:00`;
            times.push(formattedHour);
        }
        return times;
    };

    const times = generateTimes(selectedDate, reservedTimes);

    const handleTimeClick = (time: string) => {
        if (selectedTime === time) {
            setSelectedTime('');
        } else {
            setSelectedTime(time);
        }
        setSelectedTime(time);
        if (scheduleContext && scheduleContext.setSelectedDate) {
            scheduleContext.setSelectedDate((prevDate) => ({
                ...prevDate,
                date: selectedDate,
                hour: time
            }));
        }
    };

const addDateDate = (date: Date | null) => {
        if (scheduleContext && scheduleContext.setSelectedDate) {
            scheduleContext.setSelectedDate((prevDate) => ({
                ...prevDate,
                date: date,
                hour: ''
            }));

            const selectedButton = document.querySelector('.time-button.selected');
            if (selectedButton) {
              selectedButton.classList.remove('selected');
              setSelectedTime(null);
            }
        }
        
    };

    const isReserved = (time: string): boolean => {
        return reservedTimes.includes(time);
    };

    const checkSelectedDate = () => {
      if(selectedDate && selectedTime){
        ticketDataContext?.setTicketData((prevTicketData) => ({
          ...prevTicketData,
          schedule: {
              date: selectedDate,
              hour: selectedTime
          }
        }));
      nextStep();
      }
    }

    return (
        <div className="flex items-center justify-center flex-col">
            <h2 className="text-2xl mb-20 mt-10">Choose your preferred date to take your car to the service center</h2>
            <div className="flex-container">
                <div className='calendar-container'>
                    <Calendar
                        onChange={(dateRange) => {
                            if (dateRange instanceof Array) {
                                setSelectedDate(dateRange[0]);
                                addDateDate(dateRange[0]);
                            } else {
                                setSelectedDate(dateRange);
                                addDateDate(dateRange);
                            }
                            setShouldRefetch(true);
                            const selectedButton = document.querySelector('.time-button.selected');
                            if (selectedButton) {
                                selectedButton.classList.remove('selected');
                            }
                        }}
                        value={selectedDate}
                        minDetail="month"
                        tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6}
                        locale='en'
                    />
                </div>
                {selectedDate && (
                    <div className="time-list">
                        <h3>Times for {selectedDate.toDateString()}:</h3>
                        {times.length === 0 ? (
                            <p>No available times on weekends.</p>
                        ) : (
                            <div className="time-buttons">
                                {times.map((time, index) => (
                                    <button
                                        key={index}
                                        className={`time-button ${isReserved(time) ? 'reserved' : ''} ${selectedTime === time ? 'selected' : ''}`}
                                        onClick={() => { handleTimeClick(time)}}
                                        disabled={isReserved(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
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
                <button className='ticket-form-button' onClick={checkSelectedDate}>
                    Next
                </button>
            </div>
        </div>
    );
}
