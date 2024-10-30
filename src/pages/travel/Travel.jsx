// import React, { useState } from 'react';
// import TravelerItem from '../../components/traveler/Traveler';
// import Filter from '../../components/filter/Filter';
// import filterIcon from "../../assets/icons/Slider.png"
// import piri from "../../assets/images/dummy1.jpg"
// import dummy from "../../assets/images/piri.jpg"
// import santhosh from "../../assets/images/santhosh.jpg"

// import './Travel.css';

// const Travel = () => {
//   const [travelers, setTravelers] = useState([
//     {
//       id: 1,
//       profilePic:dummy,
//       name: 'Arivanan',
//       from: 'Trincomalee',
//       to: 'Colombo',
//       date: '2024-08-01',
//     },
//     {
//       id: 2,
//       profilePic:piri,
//       name: 'Akshayan',
//       from: 'Jaffna',
//       to: 'Colombo',
//       date: '2024-08-05',
//     },
//     {
//       id: 3,
//       profilePic:santhosh,
//       name: 'Kanoojan',
//       from: 'Jaffna',
//       to: 'Trincomalee',
//       date: '2024-08-05',
//     }
//     // Add more travelers as needed
//   ]);

//   const [filters, setFilters] = useState({
//     from: [],
//     to: [],
//     date: '',
//   });

//   const [isFilterVisible, setIsFilterVisible] = useState(false);

//   const handleFilterChange = (e) => {
//     const { name, value, checked } = e.target;
//     setFilters((prevFilters) => {
//       const updatedValues = checked
//         ? [...prevFilters[name], value]
//         : prevFilters[name].filter((item) => item !== value);
//       return { ...prevFilters, [name]: updatedValues };
//     });
//   };

//   const handleDateChange = (e) => {
//     setFilters({
//       ...filters,
//       date: e.target.value,
//     });
//   };

//   const toggleFilterVisibility = () => {
//     setIsFilterVisible(!isFilterVisible);
//   };

//   const filteredTravelers = travelers.filter((traveler) => {
//     return (
//       (filters.from.length === 0 || filters.from.includes(traveler.from)) &&
//       (filters.to.length === 0 || filters.to.includes(traveler.to)) &&
//       (filters.date === '' || traveler.date === filters.date)
//     );
//   });

//   const fromOptions = [...new Set(travelers.map((traveler) => traveler.from))];
//   const toOptions = [...new Set(travelers.map((traveler) => traveler.to))];

//   return (
//     <div className="travel">
//       <div className="travel-container-top">
//         <img
//               src= {filterIcon}
//               className="filter-icon"
//               onClick={toggleFilterVisibility}
//               alt="Filter"
//             />
//         <h1 className="title">
//           Connect with <span>Travelers</span>
//         </h1>
//       </div>
//       <div className="travel-content">
//         {isFilterVisible && (
//           <div className="travel-filter">
//             <Filter
//               filters={filters}
//               onFilterChange={handleFilterChange}
//               fromOptions={fromOptions}
//               toOptions={toOptions}
//               onDateChange={handleDateChange}
//             />
//           </div>
//         )}
//         <div className="travel-list">
//           <ul>
//             {filteredTravelers.map((traveler) => (
//               <TravelerItem key={traveler.id} traveler={traveler} />
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Travel;


import React, { useState } from 'react';
import TravelerItem from '../../components/traveler/Traveler';
import Filter from '../../components/filter/Filter';
import filterIcon from "../../assets/icons/Slider.png";
import piri from "../../assets/images/dummy1.jpg";
import dummy from "../../assets/images/piri.jpg";
import santhosh from "../../assets/images/santhosh.jpg";
import Add from "../../assets/icons/Add.png";
import './Travel.css';

const Travel = () => {
  const [travelers, setTravelers] = useState([
    {
      id: 1,
      profilePic: dummy,
      name: 'Arivanan',
      from: 'Trincomalee',
      to: 'Colombo',
      date: '2024-08-01',
    },
    {
      id: 2,
      profilePic: piri,
      name: 'Akshayan',
      from: 'Jaffna',
      to: 'Colombo',
      date: '2024-08-05',
    },
    {
      id: 3,
      profilePic: santhosh,
      name: 'Kanoojan',
      from: 'Jaffna',
      to: 'Trincomalee',
      date: '2024-08-05',
    }
    // Add more travelers as needed
  ]);

  const [filters, setFilters] = useState({
    from: [],
    to: [],
    date: '',
  });

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => {
      const updatedValues = checked
        ? [...prevFilters[name], value]
        : prevFilters[name].filter((item) => item !== value);
      return { ...prevFilters, [name]: updatedValues };
    });
  };

  const handleDateChange = (e) => {
    setFilters({
      ...filters,
      date: e.target.value,
    });
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const filteredTravelers = travelers.filter((traveler) => {
    return (
      (filters.from.length === 0 || filters.from.includes(traveler.from)) &&
      (filters.to.length === 0 || filters.to.includes(traveler.to)) &&
      (filters.date === '' || traveler.date === filters.date)
    );
  });

  const fromOptions = [...new Set(travelers.map((traveler) => traveler.from))];
  const toOptions = [...new Set(travelers.map((traveler) => traveler.to))];

  return (
    <div className="travel">
      <div className="travel-container-top">
        <img
          src={filterIcon}
          className="filter-icon"
          onClick={toggleFilterVisibility}
          alt="Filter"
        />
        <h1 className="title">
          Connect with <span>Travelers</span>
        </h1>
        <Link to = "/driverAdd">
        <button>
          <img
            src={Add}
          /></button>
        </Link>
        
      </div>
      <div className="travel-content">
        {isFilterVisible && (
          <div className="travel-filter">
            <Filter
              filters={filters}
              onFilterChange={handleFilterChange}
              fromOptions={fromOptions}
              toOptions={toOptions}
              onDateChange={handleDateChange}
            />
          </div>
        )}
        <div className="travel-list">
          <ul>
            {filteredTravelers.map((traveler) => (
              <li
                key={traveler.id}
                className={isFilterVisible ? 'traveler reduced-width' : 'traveler'}
              >
                <TravelerItem traveler={traveler} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Travel;
