import React, { useState } from 'react';
import StaffCard from '../_helper_components/allstaff/staffCard/default';
import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import AuthorMenu from '../_helper_components/allstaff/authorMenu/default';

import '../../src/styles/container/_all-staff.scss';
import '../../src/styles/base/_utility.scss';

export const AllStaffPage = () => {
  const [leftMenuMenuVisibility, setLeftMenuVisibility] = useState(false);
  const [selectedLeftMenuItem, setSelectedLeftMenuItem] = useState({ name: 'All', id: 0 });

  const setStaffFilter = (area) => {
    setSelectedLeftMenuItem(area);
    setLeftMenuVisibility(false);
  };

  const staffers = [
    {
      name: 'Rosalind Bently',
      role: 'Enterprise Reporter',
      telephone: '404-526-7676',
      email: 'rosalin.bently@ajc.com',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Rosalind Bently',
      role: 'Enterprise Reporter',
      telephone: '404-526-7676',
      email: 'rosalin.bently@ajc.com',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Rosalind Bently',
      role: 'Enterprise Reporter',
      telephone: '404-526-7676',
      email: 'rosalin.bently@ajc.com',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Rosalind Bently',
      role: 'Enterprise Reporter',
      telephone: '404-526-7676',
      email: 'rosalin.bently@ajc.com',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Rosalind Bently',
      role: 'Enterprise Reporter',
      telephone: '404-526-7676',
      email: 'rosalin.bently@ajc.com',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Rosalind Bently',
      role: 'Enterprise Reporter',
      telephone: '404-526-7676',
      email: 'rosalin.bently@ajc.com',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Rosalind Bently',
      role: 'Enterprise Reporter',
      telephone: '404-526-7676',
      email: 'rosalin.bently@ajc.com',
      image: 'https://via.placeholder.com/150',
    },
  ];

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
          {staffers.map((staffer) => {
            const {
              name, role, telephone, email, image,
            } = staffer || {};
            return <StaffCard name={name} role={role} telephone={telephone} email={email} image={image} key={email} />;
          })}
        </section>
      </main>
      <Footer />
      <Copyright />
    </>
  );
};

export default AllStaffPage;
