import React, { useState, useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import StaffCard from '../_helper_components/allstaff/staffCard/default';
import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import AuthorMenu from '../_helper_components/allstaff/authorMenu/default';
import getQueryParams from './_helper_functions/getQueryParams';
import findArea from './_helper_functions/staffpage/findArea';

import '../../src/styles/container/_all-staff.scss';
import '../../src/styles/base/_utility.scss';

export const AllStaffPage = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;

  const [leftMenuMenuVisibility, setLeftMenuVisibility] = useState(false);
  const [selectedLeftMenuItem, setSelectedLeftMenuItem] = useState({ name: 'All', id: 0 });
  const [selectedStaff, setSelectedStaff] = useState([]);

  const setStaffFilter = () => {
    setLeftMenuVisibility(false);
  };

  useEffect(() => {
    const selectedAreaTag = getQueryParams(window.location.href).area;
    const selectedArea = findArea(selectedAreaTag);

    if (selectedArea) {
      setSelectedLeftMenuItem(selectedArea);

      if (selectedArea.tag === 'all') {
        setSelectedStaff(globalContent.q_results);
      } else {
        const staffers = globalContent.q_results.filter((staff) => {
          if (staff.expertise) {
            return staff.expertise.split(',').some(ext => parseInt(ext, 10) === selectedArea.id);
          }
          return false;
        });
        setSelectedStaff(staffers);
      }
    }
  }, []);

  return (
    <>
      <BreakingNews />
      <NavBar />
      <header className={'c-staff-page-header'}>
        <h2>Newsroom</h2>
      </header>
      <main className={'c-staff-page-main c-sectionHome b-margin-bottom-d30-m20'}>
        <AuthorMenu
          selectedLeftMenuItem={selectedLeftMenuItem}
          setSelectedLeftMenuItem={setStaffFilter}
          leftMenuMenuVisibility={leftMenuMenuVisibility}
          setLeftMenuVisibility={() => setLeftMenuVisibility(false)}
        />
        <section className={'c-staffers'}>
          <button className={'menu-button'} onClick={() => setLeftMenuVisibility(true)}></button>
          <header className={'c-staffers-header'}>
            <h3>{selectedLeftMenuItem.name}</h3>
            <span className="border"></span>
          </header>
          {selectedStaff.map((staffer) => {
            const {
              firstName = '', middleName = '', lastName = '', role, telephone, email, image,
            } = staffer || {};
            return (
              <StaffCard
                name={`${firstName} ${middleName} ${lastName}`}
                role={role}
                telephone={telephone}
                email={email}
                image={image}
                key={email}
              />
            );
          })}
        </section>
      </main>
      <Footer />
      <Copyright />
    </>
  );
};

export default AllStaffPage;
