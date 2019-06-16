import React from 'react'
import PropTypes from 'prop-types';

const Progress = ({ percentage }) => {
  return (
    <div className="progress" style={{ marginTop: 20 }}>
      <div
        className="progress-bar progress-bar-striped bg-success"
        role="progressbar"
        style={{ width: `${percentage}%` }}
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {percentage}%
      </div>
    </div>
  )
}

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
}

export default Progress 
