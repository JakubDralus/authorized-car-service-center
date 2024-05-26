
const cardData = [
  {
    title: 'Revenue',
    value: '$192,169.00',
    change: '32k increase',
    direction: 'up',
    color: 'text-green-600',
  },
  {
    title: 'New customers',
    value: '1340',
    change: '3% decrease',
    direction: 'down',
    color: 'text-red-600',
  },
  {
    title: 'New orders',
    value: '420',
    change: '10% increase',
    direction: 'up',
    color: 'text-green-600',
  }
];

const Stats3 = () => {
  return (
    <>
      <h1 className="text-2xl mb-3 font-medium">Last 30 days</h1>

      <div className="grid gap-4 lg:gap-6 lg:grid-cols-2 xl:grid-cols-3 pb-3">
        {cardData.map((card, index) => (
          <div key={index} className="relative px-8 pt-8 pb-10 border  rounded-2xl bg-white dark:bg-gray-800">
            <div className="space-y-2">

              <div className="flex justify-between">
                <div className="col flex items-center space-x-2 rtl:space-x-reverse text-lg 
                  text-gray-500 dark:text-gray-400">
                  <span>{card.title}</span>
                </div>

                <div className={`col flex items-center space-x-1 rtl:space-x-reverse text-md font-medium ${card.color}`}>
                  <span>{card.change}</span>
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d={card.direction === 'up' ? 
                      "M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" 
                      : "M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"}
                      clipRule="evenodd"
                      ></path>
                  </svg>
                </div>
              </div>

              <div className="text-4xl font-medium dark:text-gray-100 ">{card.value}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stats3;
