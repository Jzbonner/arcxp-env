import React from 'react';
import StaffCard from '../_helper_components/allstaff/staffCard/default';
import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import '../../src/styles/container/_all-staff.scss';
import '../../src/styles/base/_utility.scss';


export const AllStaffPage = () => {
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
        <h2>
          Newsroom
        </h2>
      </header>
      <main className={'c-staff-page-main b-margin-bottom-d30-m20'}>
        <button className={'menu-button'}></button>
        <aside className={'c-menu'}>
          <ul>
            <li className={'active'}>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
          </ul>
        </aside>
        <section className={'c-staffers'}>
          <header className={'c-staffers-header'}>
            <h3>
              <span>All</span>
            </h3>
          </header>
          {
            staffers.map((staffer) => {
              const {
                name, role, telephone, email, image,
              } = staffer || {};
              return <StaffCard name={name} role={role} telephone={telephone} email={email} image={image} key={email}/>;
            })
          }
        </section>
      </main>
      <Footer />
      <Copyright />
    </>
  );
};

export default AllStaffPage;
