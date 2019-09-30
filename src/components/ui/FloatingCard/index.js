import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-pro-light'

const FloatingCard = ({
    children,
    overlay,
    onPressExit
}) => (
        <div
            className={classnames(
                "p-fixed",
                "vw-100",
                "vh-100",
                'd-flex',
                'justify-content-center',
                'align-content-center',
                'py-6',
                'px-1',
                'px-md-6'
            )}
            style={{
                zIndex: 1000,
                top: 0,
                left: 0
            }}
        >
            <div className={classnames(
                "p-absolute",
                "w-100",
                "h-100",
                "bg-dark",
                'opacity-65',
                `bg-${overlay}`
            )}></div>
            <div
                className="card mt-6"
                style={{
                    maxWidth: 600,
                    overflowY: 'scroll'
                }}
            >
                <div
                    className={classnames(
                        "card-header",
                        "bg-white",
                        "text-right",
                        'border-0',
                        "sticky-top"
                    )}
                >
                    <button className="border-0" onClick={onPressExit}>
                        <FontAwesomeIcon icon={faTimes} size='2x' />
                    </button>
                </div>
                <div className="card-body px-4 pt-0">
                    {children}
                </div>
            </div>
        </div >
    )

FloatingCard.defaultProps = {
    overlay: 'dark'
}

FloatingCard.propTypes = {
    overlay: PropTypes.oneOf([
        'dark'
    ])
}

export default FloatingCard