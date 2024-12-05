import PropTypes from "prop-types"

function Skeleton({className=""}) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  )
}

Skeleton.propTypes = {
    className: PropTypes.string,
}

export default Skeleton
