import PropTypes from 'prop-types'
import Loader from '../components/Loaders/Loader'
import { Outlet } from 'react-router-dom'

function LoadinData({isLoading}) {
    if(isLoading)
    {
        return <Loader />
    }
    else
    {
        
        return <Outlet/>
    }
}

LoadinData.propTypes = {
    isLoading: PropTypes.bool,
}

export default LoadinData
