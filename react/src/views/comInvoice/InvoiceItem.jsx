import React from 'react';
import InvoiceField from './InvoiceField';

const InvoiceItem = ({ id, description, quantite,  pu, onDeleteItem, onEdtiItem }) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  return (
    <tr>
      <td className="w-full">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            placeholder: 'Item name',
            type: 'text',
            name: 'description',
            id: id,
            value: description,
            className: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          }}
        />
      </td>
      <td className="min-w-[65px] md:min-w-[80px]">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            type: 'number',
            min: '1',
            name: 'quantite',
            id: id,
            value: quantite,
            className: 'text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

          }}
        />
      </td>
      <td className="relative min-w-[100px] md:min-w-[150px]">

        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className: 'text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            ,type: 'number',
            min: '0.01',
            step: '0.01',
            name: 'pu',
            id: id,
            value: pu,
          }}
        />
      </td>
      <td className="flex items-center justify-center">
        <button
          className="rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600"
          onClick={deleteItemHandler}
        >
del
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItem;
