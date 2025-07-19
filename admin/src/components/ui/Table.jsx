import React from 'react';
import PropTypes from 'prop-types';

const Table = ({
  columns,
  data,
  keyField = 'id',
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
  rowClassName = '',
  headerClassName = '',
  cellClassName = '',
  ...props
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="align-middle inline-block min-w-full border-b border-gray-200">
        <table className={`min-w-full divide-y divide-gray-200 ${className}`} {...props}>
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${headerClassName}`}
                  style={column.headerStyle || {}}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={row[keyField] || rowIndex}
                onClick={() => onRowClick && onRowClick(row, rowIndex)}
                className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''} ${rowClassName}`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${cellClassName}`}
                    style={column.cellStyle || {}}
                  >
                    {column.render ? column.render(row[column.key], row, rowIndex) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.node.isRequired,
      render: PropTypes.func,
      headerStyle: PropTypes.object,
      cellStyle: PropTypes.object,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  keyField: PropTypes.string,
  onRowClick: PropTypes.func,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
  rowClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  cellClassName: PropTypes.string,
};

export default Table;
