import React, { useState, useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import StaffCard from '../_helper_components/allstaff/staffCard/default';
import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import AuthorMenu from '../_helper_components/allstaff/authorMenu/default';
import getQueryParams from './_helper_functions/getQueryParams';
import findArea from './_helper_functions/staffpage/findArea';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import ArcAd from '../features/ads/default';
import plus from '../../resources/icons/staff/plus.svg';

import '../../src/styles/container/_all-staff.scss';
import '../../src/styles/base/_utility.scss';

export const AllStaffPage = () => {
  const appContext = useAppContext();
  const { globalContent, requestUri } = appContext;
  const { sites } = getProperties();

  const [leftMenuMenuVisibility, setLeftMenuVisibility] = useState(false);
  const [selectedLeftMenuItem, setSelectedLeftMenuItem] = useState({ name: 'All', id: 0 });
  const [selectedStaff, setSelectedStaff] = useState([]);

  const pageUri = 'staff';

  const setStaffFilter = () => {
    setLeftMenuVisibility(false);
  };

  useEffect(() => {
    const selectedAreaTag = getQueryParams(window.location.href).area;
    const selectedArea = findArea(selectedAreaTag, sites[0]);

    if (requestUri === `/${pageUri}/` || requestUri === `/${pageUri}` || (selectedArea && selectedArea.tag === 'all')) {
      const staffers = globalContent.q_results.filter((staff) => {
        if (staff.expertise) {
          return staff.expertise.split(',').every((expertise) => {
            // filters out Hyperlocal and all types of Community Contributors from the 'All' tab
            if ([8, 17, 18, 19, 20, 21].indexOf(parseInt(expertise, 10)) === -1) {
              return true;
            }
            return false;
          });
        }
        return false;
      });
      setSelectedStaff(staffers);
    } else if (selectedArea) {
      setSelectedLeftMenuItem(selectedArea);
      const staffers = globalContent.q_results.filter((staff) => {
        if (staff.expertise) {
          return staff.expertise.split(',').some(ext => parseInt(ext, 10) === selectedArea.id);
        }
        return false;
      });
      setSelectedStaff(staffers);
    }
  }, []);

  return (
    <>
      <GlobalAdSlots />
      <BreakingNews />
      <NavBar />
      <header className={'c-staff-page-header'}>
        <div className="c-hp01-mp01">
          <ArcAd staticSlot={'HP01'} />
          <ArcAd staticSlot={'MP01'} />
        </div>
        <h2>Newsroom</h2>
      </header>
      <main className={'c-staff-page-main b-margin-bottom-d30-m20'}>
        <AuthorMenu
          selectedLeftMenuItem={selectedLeftMenuItem}
          setSelectedLeftMenuItem={setStaffFilter}
          leftMenuMenuVisibility={leftMenuMenuVisibility}
          setLeftMenuVisibility={() => setLeftMenuVisibility(false)}
          pageUri={pageUri}
        />
        <section className={'c-staffers'}>
          <button className={'menu-button'} onClick={() => setLeftMenuVisibility(true)}>
            <img src={plus} alt={'plus sign'} />
          </button>
          <header className={'c-staffers-header'}>
            <h3>{selectedLeftMenuItem.name}</h3>
            <span className="border"></span>
          </header>
          {selectedStaff.map((staffer) => {
            const {
              firstName = '', middleName = '', lastName = '', role, custom_ajc_phone: telephone, email, image,
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
