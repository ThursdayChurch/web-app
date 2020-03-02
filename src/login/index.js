import React, { useState } from 'react';
import classnames from 'classnames';
import { get } from 'lodash';

import { Carousel } from 'react-bootstrap';
import { FloatingCard } from '../ui';
import Identity from './Identity';
import Passcode from './Passcode';
import ProfileInformation from './ProfileInformation';

import { useAuth } from '../auth';

const LoginCard = () => {
    const { hideLogIn } = useAuth();
    const [payload, setPayload] = useState(null);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const columnSizes = [
        'col-12',
        'col-lg-8',
    ];

    return (
        <FloatingCard
            onPressExit={() => hideLogIn()}
        >
            <h2
                className={classnames(
                    'text-center',
                    'mt-2',
                    'mb-3',
                )}
            >
                Login
      </h2>

            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                controls={false}
                indicators={false}
                interval={null}
                touch
            >
                <Carousel.Item>
                    <Identity
                        update={({ identity, isExistingIdentity, type }) => {
                            setPayload({ identity, isExistingIdentity, type });
                            setIndex(1);
                        }}
                        columns={columnSizes}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <Passcode
                        identity={get(payload, 'identity', null)}
                        isExistingIdentity={get(payload, 'isExistingIdentity', false)}
                        type={get(payload, 'type', 'sms')}
                        update={(props) => {
                            const requestedEmailPin = get(props, 'requestedEmailPin', false);

                            if (requestedEmailPin) {
                                setIndex(4);
                            } else {
                                const {
                                    identity,
                                    passcode,
                                    isExistingIdentity,
                                } = props;
                                setPayload({ identity, passcode });

                                if (isExistingIdentity) {
                                    hideLogIn();
                                } else {
                                    setIndex(2);
                                }
                            }
                        }}
                        columns={columnSizes}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <ProfileInformation
                        identity={get(payload, 'identity', null)}
                        passcode={get(payload, 'passcode', null)}
                        update={() => hideLogIn()}
                        columns={columnSizes}
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <h2 className="text-center text-success">
                        You're now logged in!
          </h2>
                </Carousel.Item>

                <Carousel.Item>
                    <h1 className="text-center text-primary">
                        <i className="fal fa-envelope fa-3x" />
                    </h1>

                    <h3 className="text-center text-primary">
                        You should get an email with instructions on how to reset your password.
          </h3>
                </Carousel.Item>
            </Carousel>
        </FloatingCard>
    );
};

export default LoginCard;
