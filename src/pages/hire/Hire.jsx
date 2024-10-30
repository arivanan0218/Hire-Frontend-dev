import React from 'react'
import './Hire.css'
import Filter from '../../assets/icons/filterBlue.png'
import Add from '../../assets/icons/addBlue.png'

export const Hire = () => {
    return (
        <div className='hire'>
            <div className="hireTopBar">
                <div >
                    <img src={Filter} className='hireFilter' />
                </div>
                <div className="hireHead">
                    Connect with <span> Drivers </span>
                </div>
                <div>
                    <img src={Add} className='hireAdd' />
                </div>
            </div>

            <div className="hireCard">
                <div className="cardRight">
                    <div className="rightTop">

                    </div>
                    <div className="rightBottom">

                    </div>

                </div>
                <div className="cardLeft">
                    <div className="profPic">

                    </div>
                    <div className="hireCon">
                        <div className="conTop">
                            <div className="hirePath">

                            </div>
                            <div className="driverName">
                                <div className="driverIcon">

                                </div>
                                <div className="name">

                                </div>
                            </div>
                        </div>
                        <div className="conBottom">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hire
