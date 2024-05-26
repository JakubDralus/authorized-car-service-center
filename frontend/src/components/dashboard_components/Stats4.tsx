
const cardData = [
  {
    title: 'Revenue',
    value: '$405,420.69',
    change: '+4.75%',
    color: 'green',
  },
  {
    title: 'Overdue invoices',
    value: '$12,787.00',
    change: '-12.02%',
    color: 'red',
  },
  {
    title: 'Outstanding invoices',
    value: '$245,988.00',
    change: '-4.39%',
    color: 'red',
  },
  {
    title: 'Expenses',
    value: '$30,156.00',
    change: '+10.18%',
    color: 'green',
  },
];

const Stats4 = () => {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-5 rounded-lg  ">
      {cardData.map((card, index) => (
        <div key={index} className="px-7 py-7 border rounded-lg bg-white">
          <div className="flex justify-between">
          <div className="text-gray-600">{card.title}</div>
            <div>
              <span className={` ${card.color === 'green' ? (
                'text-xs inline-flex items-center rounded-md bg-green-50 px-2 py-1 font-medium text-green-700 ring-1 ring-inset ring-green-600/20'
                ) : (
                'text-xs inline-flex items-center rounded-md bg-red-50 px-2 py-1 font-medium text-red-700 ring-1 ring-inset ring-red-600/10'
                )}`}>
                {card.change}
              </span>
            </div>
          </div>
          <div className="text-3xl font-semibold mt-2 mb-2">{card.value}</div>
        </div>
      ))}
    </div>
  );
}

export default Stats4;
