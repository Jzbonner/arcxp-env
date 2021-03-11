import React from 'react';
import { useContent } from 'fusion:content';
import './default.scss';

const Schedule = () => {
  const tour = 'pga';
  const year = '2021';
  const scheduleData = useContent({
    source: 'sportradar-api',
    query: {
      tour: `${tour}`,
      year: `${year}`,
    },
  });

  if (scheduleData) {
    const date = new Date();
    const today = `${date.getFullYear()
    }-${
      (`0${date.getMonth() + 1}`).slice(-2)
    }-${
      date.getDate()}`;
    return (
      <div className="uws-widget-cnt">
        <div
          id="id-wcnt-us.season.nfl.standings"
          data-widget="us.season.nfl.standings"
          data-border="0"
          className="uws-widget-inner-cnt"
          data-sr-widget="us.season.nfl.standings"
          data-sr-loaded=""
          data-sr-input-props='{"border":false,"seasonId":2020}'
        >
          <div className="sr-wwrap srm-fullyloaded">
            <div
              className="sr-bb sr-nfl-standings sr-ltr sr-nfl-standings--large sr-us-common-standings--large"
              data-responsive='{"small":{"width":"- 640","classes":"sr-nfl-standings--small sr-us-common-standings--small sr-us-navigation-dropdown--small"},"large":{"width":"640 -","classes":"sr-nfl-standings--large sr-us-common-standings--large"}}'
              data-responsive-key="nfl-standings"
              data-resp-id="18"
            >
              <div className="sr-loader__container">
                <div className="sr-loader__overlay"></div>
                <div className="sr-nfl-standings__wrapper srt-base-1">
                  <div className="sr-nfl-standings__standings-header">
                    <div className="sr-nfl-standings__standings-title srm-is-uppercase">
                      <span>PGA Schedule</span>
                    </div>
                  </div>
                  <div className="sr-nfl-standings__tables srt-base-1-primary">
                    <div className="sr-bb sr-nfl-standings-tables sr-ltr">
                      <div className="sr-loader__container">
                        <div className="sr-loader__overlay"></div>
                        <div className="sr-nfl-standings__tables-divisions">
                          <div className="sr-us-common-standings__heading sr-us-common-standings__heading-is-top srt-base-1 srt-text-secondary srm-is-uppercase">
                            <span>Current Tournament</span>
                          </div>
                          <div>
                            <div className="sr-us-table-scroller__relative sr-us-common-standings__scroller sr-us-common-standings__table-is-below-title srt-base-1 srm-first-table srt-base-1 sr-resize-sensor sr-bb">
                              <div className="sr-us-table-scroller__overflow sr-us-common-standings__scroller-overflow srm-begin srm-end">
                                <div className="sr-us-table-scroller__inner">
                                  <table className="sr-us-table__table">
                                    <thead>
                                      <tr>
                                        <td className="sr-us-table-cell__fixed-container sr-us-common-standings__header-border">
                                          <div className="sr-us-table-cell__cell sr-us-table-cell__fixed-cell sr-us-common-standings__header-col sr-us-common-standings__header-border sr-us-common-standings__header-col-1 sr-us-common-standings__fixed-col srm-is-uppercase">
                                            <span className="srt-text-secondary">
                                              Date
                                            </span>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="sr-us-table-cell__cell sr-us-common-standings__header-col sr-us-common-standings__header-border sr-us-common-standings__header-col-n sr-us-common-standings__stat-col srm-is-uppercase">
                                            <span className="srt-text-secondary">
                                              Tournament/Course
                                            </span>
                                          </div>
                                        </td>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {scheduleData.tournaments
                                        .filter(
                                          tournament => tournament.end_date >= today,
                                        )
                                        .map(tournament => (
                                            <tr key={tournament.id}>
                                              <td className="sr-us-table-cell__fixed-container sr-us-common-standings__data-border srm-is-clickable">
                                                <div className="sr-us-table-cell__cell sr-us-common-standings__data-col sr-us-common-standings__data-border sr-us-common-standings__stat-col srm-is-clickable">
                                                  <span>
                                                    {tournament.start_date}
                                                  </span>
                                                </div>
                                              </td>
                                              <td>
                                                <div className="sr-us-table-cell__cell sr-us-common-standings__data-col sr-us-common-standings__data-border sr-us-common-standings__stat-col srm-is-clickable">
                                                  <span>{tournament.name}</span>
                                                </div>
                                              </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                </div>
                                <div className="sr-resize-sensor__resize-triggers">
                                  <div className="sr-resize-sensor__expand-trigger">
                                    <div
                                      style={{
                                        width: '1562px',
                                        height: '10px',
                                      }}
                                    ></div>
                                    <div className="sr-resize-sensor__contract-trigger"></div>
                                  </div>
                                  <div className="sr-us-common-standings__heading sr-us-common-standings__heading-is-below-table srt-base-1 srt-text-secondary srm-is-uppercase">
                                    <span>Past Results</span>
                                  </div>
                                  <div>
                                    <div className="sr-us-table-scroller__relative sr-us-common-standings__scroller sr-us-common-standings__table-is-below-title srt-base-1 srt-base-1 sr-resize-sensor sr-bb">
                                      <div className="sr-us-table-scroller__overflow sr-us-common-standings__scroller-overflow srm-begin srm-end">
                                        <div className="sr-us-table-scroller__inner">
                                          <table className="sr-us-table__table">
                                            <thead>
                                              <tr>
                                                <td className="sr-us-table-cell__fixed-container sr-us-common-standings__header-border">
                                                  <div className="sr-us-table-cell__cell sr-us-table-cell__fixed-cell sr-us-common-standings__header-col sr-us-common-standings__header-border sr-us-common-standings__header-col-1 sr-us-common-standings__fixed-col srm-is-uppercase">
                                                    <span className="srt-text-secondary">
                                                      Date
                                                    </span>
                                                  </div>
                                                </td>
                                                <td>
                                                  <div className="sr-us-table-cell__cell sr-us-common-standings__header-col sr-us-common-standings__header-border sr-us-common-standings__header-col-n sr-us-common-standings__stat-col srm-is-uppercase">
                                                    <span className="srt-text-secondary">
                                                      Tournament
                                                    </span>
                                                  </div>
                                                </td>
                                                <td>
                                                  <div className="sr-us-table-cell__cell sr-us-common-standings__header-col sr-us-common-standings__header-border sr-us-common-standings__header-col-n sr-us-common-standings__stat-col srm-is-uppercase">
                                                    <span className="srt-text-secondary">
                                                      Winner
                                                    </span>
                                                  </div>
                                                </td>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {scheduleData.tournaments
                                                .filter(
                                                  tournament => tournament.end_date < today,
                                                )
                                                .map(tournament => (
                                                    <tr key={tournament.id}>
                                                      <td>
                                                        <div className="sr-us-table-cell__cell sr-us-common-standings__data-col sr-us-common-standings__data-border sr-us-common-standings__stat-col srm-is-clickable">
                                                          <span>
                                                            {
                                                              tournament.end_date
                                                            }
                                                          </span>
                                                        </div>
                                                      </td>
                                                      <td>
                                                        <div className="sr-us-table-cell__cell sr-us-common-standings__data-col sr-us-common-standings__data-border sr-us-common-standings__stat-col srm-is-clickable">
                                                          <span>
                                                            {tournament.name}
                                                          </span>
                                                        </div>
                                                      </td>
                                                      <td>
                                                        <div className="sr-us-table-cell__cell sr-us-common-standings__data-col sr-us-common-standings__data-border sr-us-common-standings__stat-col srm-is-clickable">
                                                          <span>Winner</span>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                          </table>
                                        </div>
                                        <div className="sr-resize-sensor__resize-triggers">
                                          <div className="sr-resize-sensor__expand-trigger">
                                            <div
                                              style={{
                                                width: '1562px',
                                                height: '188px',
                                              }}
                                            ></div>
                                            <div className="sr-resize-sensor__contract-trigger"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Schedule;
