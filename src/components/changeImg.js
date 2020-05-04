import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ImageChanger extends Component {
//   constructor(props) {
//     super(props);
//   }
  render() {
    const { changeImg, useNew, useOld } = this.props
    return (
      <div>
          <img 
            src={changeImg}
            onClick={useNew}
            alt={changeImg}
          />
          <p>
            <button onClick={useOld}>use old Img </button>
          </p>

          <p>
                The url is {changeImg}
          </p>
      </div>
    )
  }
}

ImageChanger.propTypes = {
    changeImg: PropTypes.string.isRequired,
    useNew: PropTypes.func.isRequired,
    useOld: PropTypes.func.isRequired
}

export default ImageChanger