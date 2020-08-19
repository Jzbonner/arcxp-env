import React, { useState, useEffect } from 'react';
import { useAppContext, useFusionContext } from 'fusion:context';
import StaffCard from '../_helper_components/allstaff/staffCard/default';
import Footer from '../_helper_components/global/footer/default';
import Copyright from '../_helper_components/global/copyright/default';
import AuthorMenu from '../_helper_components/allstaff/authorMenu/default';
import findArea from './_helper_functions/staffpage/findArea';
import GlobalAdSlots from '../_helper_components/global/ads/default';
import ArcAd from '../features/ads/default';
import TopNavBreakingNews from '../_helper_components/global/navBar/TopNavBreakingNews/default';
import plus from '../../resources/icons/staff/plus.svg';
import AREAS_OF_EXPERTISE from './_helper_functions/staffpage/AREAS_OF_EXPERTISE';

import '../../src/styles/container/_all-staff.scss';
import '../../src/styles/base/_utility.scss';

export const AllStaffPage = () => {
  const appContext = useAppContext();
  const { globalContent, globalContentConfig } = appContext;
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;
  const { query } = globalContentConfig || {};

  const [leftMenuMenuVisibility, setLeftMenuVisibility] = useState(false);
  const [selectedLeftMenuItem, setSelectedLeftMenuItem] = useState({});
  const [selectedStaff, setSelectedStaff] = useState([]);

  const pageUri = 'staff';

  const setStaffFilter = () => {
    setLeftMenuVisibility(false);
  };

  const menuData = AREAS_OF_EXPERTISE()[arcSite];

  const updateStaffers = (selectedAreaTag) => {
    const selectedArea = findArea(selectedAreaTag, arcSite);

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
              .some(ext => parseInt(ext.trim(), 10) === parseInt(selectedArea.id, 10));
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
                [8, 17].indexOf(parseInt(expertise.trim(), 10)) === -1
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
    const selectedArea = findArea(query.id, arcSite);
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
    window.history.pushState({}, null, `/${pageUri}/${area.tag}`);
  };

  return (
    <>
      <GlobalAdSlots />
      <TopNavBreakingNews />
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
          menuData={menuData}
        />
        <section className={'c-staffers'}>
          {menuData && <><button
            className={'menu-button'}
            onClick={() => setLeftMenuVisibility(true)}
          >
            <img src={plus} alt={'plus sign'} />
          </button>
          <header className={'c-staffers-header'}>
            <h3>{selectedLeftMenuItem.name}</h3>
            <span className="border"></span>
          </header></>}
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
