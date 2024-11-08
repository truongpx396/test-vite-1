import React, { useState } from 'react';
import Pagination from '../components/Pagination';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
}

const employees: Employee[] = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Jane', lastName: 'Smith' },
  { id: 3, firstName: 'Michael', lastName: 'Johnson' },
  { id: 4, firstName: 'Emily', lastName: 'Davis' },
  { id: 5, firstName: 'David', lastName: 'Brown' },
  { id: 6, firstName: 'Sarah', lastName: 'Wilson' },
  { id: 7, firstName: 'James', lastName: 'Taylor' },
  { id: 8, firstName: 'Linda', lastName: 'Anderson' },
  { id: 9, firstName: 'Robert', lastName: 'Thomas' },
  { id: 10, firstName: 'Patricia', lastName: 'Jackson' },
  { id: 11, firstName: 'Charles', lastName: 'White' },
  { id: 12, firstName: 'Barbara', lastName: 'Harris' },
  { id: 13, firstName: 'Joseph', lastName: 'Martin' },
  { id: 14, firstName: 'Susan', lastName: 'Thompson' },
  { id: 15, firstName: 'Thomas', lastName: 'Garcia' },
  { id: 16, firstName: 'Jessica', lastName: 'Martinez' },
  { id: 17, firstName: 'Christopher', lastName: 'Robinson' },
  { id: 18, firstName: 'Karen', lastName: 'Clark' },
  { id: 19, firstName: 'Daniel', lastName: 'Rodriguez' },
  { id: 20, firstName: 'Nancy', lastName: 'Lewis' },
  { id: 21, firstName: 'Matthew', lastName: 'Lee' },
  { id: 22, firstName: 'Betty', lastName: 'Walker' },
  { id: 23, firstName: 'Anthony', lastName: 'Hall' },
  { id: 24, firstName: 'Sandra', lastName: 'Allen' },
  { id: 25, firstName: 'Mark', lastName: 'Young' },
];

const Employee: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {currentEmployees.map(employee => (
          <li key={employee.id}>
            {employee.id}. {employee.firstName} {employee.lastName}
          </li>
        ))}
      </ul>
      <Pagination
        totalItems={employees.length}
        itemsPerPage={employeesPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Employee;