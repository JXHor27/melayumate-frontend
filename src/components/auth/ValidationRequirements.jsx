import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// A single item in the checklist
const Requirement = ({ isMet, text }) => (
  <li className={`flex items-start transition-colors duration-300 font-medium dark:font-normal ${isMet ? 'text-green-600 dark:text-green-400' : 'text-slate-700 dark:text-slate-400'}`}>
    <div className='flex-shrink-0 mt-1'>
        {isMet ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
    </div>
    <span>{text}</span>
  </li>
);

// The main component that displays all requirements
const ValidationRequirements = ({ validations }) => {
  return (
    <div className="my-4 text-sm">
      <ul className="space-y-2">
        <Requirement isMet={validations.usernameLength} text="Username between 3 to 10 characters." />
        <Requirement isMet={validations.emailDomain} text="Valid 'siswa.um.edu.my' email." />
        <Requirement isMet={validations.passwordLength} text="Password between 8 to 16 characters." />
        <Requirement isMet={validations.passwordPattern} text="Password contain uppercase, lowercase, number and special symbol" />
      </ul>
    </div>
  );
};

export default ValidationRequirements;