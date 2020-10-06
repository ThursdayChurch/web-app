import React from 'react';

import { useAuth } from '../auth';
import { Media } from '../ui';

import GroupListConnected from './GroupListConnected';

const Groups = () => {
  const { isLoggedIn, logIn } = useAuth();

  return (
    <>
      <Media
        imageUrl="https://rock.christfellowship.church/Content/ExternalSite/Banners/GroupsHeader.jpg"
        imageAlt="Find Your Group"
        ratio="21by9"
        overlay="black"
      >
        <div className="container-fluid max-width-1100 py-6 opacity-100 animate-slide-bottom-top">
          <div className="col-12 col-md text-center px-4 my-2">
            <div className="max-width-800 mx-auto">
              <h1 className="font-wieight-bold text-white">Dream Teams</h1>
              <p className="text-white">
                Thank you for your interest in joining the Dream Team. We want to help you
                discover your purpose and find the best place to use to use your gifts to
                serve others. No matter what gifts you have or what area of ministry you
                are passionate about, there is a place for you to serve at Christ
                Fellowship.
              </p>
            </div>
            {isLoggedIn ? (
              <a
                className="btn btn-blk btn-primary mt-2"
                href="https://rock.christfellowship.church/dreamteam"
              >
                Find A New Dream Team
              </a>
            ) : null}
          </div>
        </div>
      </Media>

      {isLoggedIn ? (
        <div
          className="container-fluid mt-md-6 mt-4 mb-6 px-4"
          style={{ minHeight: '30vh' }}
        >
          <div className="row pt-2">
            <div className="col">
              <h1 className="mb-0">My Dream Teams</h1>
            </div>
          </div>
          <GroupListConnected isDreamTeam />
        </div>
      ) : (
        <section className="container-fluid py-md-5 py-4 px-4">
          <div className="row justify-content-center align-items-center">
            <a
              className="btn btn-blk btn-primary col-md-4 my-2 mr-md-3"
              href="https://rock.christfellowship.church/dreamteam"
            >
              Find A Dream Team
            </a>

            <button
              className="col-md-4 btn btn-blk btn-outline-dark"
              onClick={() => logIn()}
            >
              See your Dream Teams
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Groups;
