import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="flex justify-between items-center mb-4">
        <div className="cursor-pointer" onClick={prevMonth}>
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <span className="text-xl font-medium text-gray-700">{format(currentMonth, dateFormat)}</span>
        <div className="cursor-pointer" onClick={nextMonth}>
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE";
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-xs text-center font-medium text-gray-500 w-10" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="flex justify-between mb-1 lg:px-5">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);

        days.push(
          <div
            className={`border p-2 flex-1 h-12 text-center text-md flex justify-center 
            ${
              !isSameMonth(day, monthStart) ? "text-gray-300" 
                : isSameDay(day, new Date()) ? "bg-blue-500 text-white"
                : "text-gray-700"
            }`}
            key={day.toString()}
          >
            <span className="inline-block align-middle">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  const UpcomingEvents = () => {
    const events = [
      { date: 'Wed, Jun 12', description: "Nothing on today's schedule" },
      { date: 'Thu, Jun 13', description: 'View house with real estate agent', time: '2:30 PM - 4:30 PM' },
      { date: 'Fri, Jun 14', description: 'Meeting with bank manager', time: 'All day' },
      { date: 'Mon, Jun 17', description: 'Sign paperwork at lawyers', time: '10:00 AM - 10:15 AM' },
    ];

    return (
      <div className="">
        <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-medium text-gray-700">Upcoming events</h2>
        <hr className='mb-4 mt-2'/>
          {events.map((event, index) => (
            <div key={index} className="mb-4">
              <div className="text-sm text-gray-500">{event.date}</div>
              <div className="text-sm text-gray-900">{event.description}</div>
              {event.time && <div className="text-sm text-gray-500">{event.time}</div>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="xl:flex mt-8">
        <div className="p-4 bg-white rounded-lg shadow-md w-full xl:w-2/5 mr-5 mb-5 xl:mb-0">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
        <div className="flex-1">
          {UpcomingEvents()}
        </div>
      </div>
    </>
  );
};

export default Calendar;
