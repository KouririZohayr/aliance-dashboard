import React from 'react'

function Card({title ,icon ,mantant}) {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()-1}`;
  return (
    <div>   <div className="p-4 transition-shadow border bg-white  dark:border-gray-800 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg">
    <div className="flex items-start justify-between">
      <div className="flex flex-col space-y-2">
        <span className="text-gray-400">{title}</span>
        <span className="text-lg font-semibold">{mantant} DH</span>
      </div>
      <div className="p-10 bg-gray-200 rounded-md">
        {icon}
      </div>
    </div>
    <div>
      <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">14%</span>
      <span>from {date}</span>
    </div>
  </div>
  </div>
  )
}

export default Card