import React, { useState, useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import StaffCard from '../_helper_components/allstaff/staffCard/default';
import NavBar from '../_helper_components/global/navBar/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import BreakingNews from '../_helper_components/global/breakingNews/default';
import WeatherAlerts from '../_helper_components/global/weatherAlerts/default';
import AuthorMenu from '../_helper_components/allstaff/authorMenu/default';
import findArea from './_helper_functions/staffpage/findArea';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import ArcAd from '../features/ads/default';
import plus from '../../resources/icons/staff/plus.svg';

import '../../src/styles/container/_all-staff.scss';
import '../../src/styles/base/_utility.scss';

export const AllStaffPage = () => {
  const appContext = useAppContext();
  const { globalContent, globalContentConfig } = appContext;
  const { sites } = getProperties();
  const { query } = globalContentConfig || {};

  const [leftMenuMenuVisibility, setLeftMenuVisibility] = useState(false);
  const [selectedLeftMenuItem, setSelectedLeftMenuItem] = useState({});
  const [selectedStaff, setSelectedStaff] = useState([]);

  const pageUri = 'staff';

  const setStaffFilter = () => {
    setLeftMenuVisibility(false);
  };

  const updateStaffers = (selectedAreaTag) => {
    const selectedArea = findArea(selectedAreaTag, sites[0]);

    if (selectedArea && selectedArea.name !== 'All') {
      const staffers = globalContent
        && globalContent.q_results
        && globalContent.q_results.filter((staff) => {
          if (!staff.status) {
            return false;
          }
          if (staff.expertise) {
            return staff.expertise
              .split(',')
              .some(ext => parseInt(ext, 10) === selectedArea.id);
          }
          return false;
        });
      setSelectedStaff(staffers);
    } else {
      const staffers = globalContent
        && globalContent.q_results
        && globalContent.q_results.filter((staff) => {
          if (!staff.status) {
            return false;
          }
          if (staff.expertise) {
            return staff.expertise.split(',').every((expertise) => {
              // filters out Hyperlocal and all types of Community Contributors from the 'All' tab
              if (
                [8, 17, 18, 19, 20, 21].indexOf(parseInt(expertise, 10)) === -1
              ) {
                return true;
              }
              return false;
            });
          }
          return true;
        });
      setSelectedStaff(staffers);
    }
  };

  useEffect(() => {
    updateStaffers(query.id);
    const selectedArea = findArea(query.id, sites[0]);
    if (selectedArea && selectedArea.name !== 'All') {
      setSelectedLeftMenuItem(selectedArea);
    } else {
      setSelectedLeftMenuItem({ name: 'All', id: 0 });
    }
  }, []);

  const setCategory = (e, area) => {
    e.preventDefault();
    setSelectedLeftMenuItem(area);
    updateStaffers(area.tag);
    setLeftMenuVisibility(false);
    window.history.pushState({}, null, `${area.tag}`);
  };

  return (
    <>
      <GlobalAdSlots />
      <BreakingNews />
      <WeatherAlerts />
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
          setCategory={setCategory}
          setSelectedLeftMenuItem={setStaffFilter}
          leftMenuMenuVisibility={leftMenuMenuVisibility}
          setLeftMenuVisibility={() => setLeftMenuVisibility(false)}
          pageUri={pageUri}
        />
        <section className={'c-staffers'}>
          <button
            className={'menu-button'}
            onClick={() => setLeftMenuVisibility(true)}
          >
            <img src={plus} alt={'plus sign'} />
          </button>
          <header className={'c-staffers-header'}>
            <h3>{selectedLeftMenuItem.name}</h3>
            <span className="border"></span>
          </header>
          {Array.isArray(selectedStaff)
            && selectedStaff
              .sort((a = { lastName: '' }, b = { lastName: '' }) => a.lastName.localeCompare(b.lastName))
              .map((staffer) => {
                const { _id: id } = staffer || {};
                return <StaffCard staffer={staffer} key={id} />;
              })}
        </section>
      </main>
      <Footer />
      <Copyright />
    </>
  );
};

AllStaffPage.sections = [];

export default AllStaffPage;
