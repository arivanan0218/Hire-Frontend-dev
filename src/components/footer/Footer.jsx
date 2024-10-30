import './Footer.css'
import React from 'react'
import { Link } from 'react-router-dom'
import Man from '../../assets/icons/manWalk.png'
import Car from '../../assets/icons/smallCar.png'
import FooterLogo from '../../assets/icons/footerLogo.png'

export const Footer = () => {
    return (
        <div id="Footer">
            {/* Top Section with Icons and Socials */}
            <div id="FooterTop">
                <div id="IconLeft">
                    <img src={Man} alt="Walking man icon" />
                </div>

                <div id="IconRight">
                    <img src={Car} alt="Car icon" />
                </div>
            </div>

            {/* Mid Section with Divider Lines */}
            <div id="FooterMid">
                <div id="LeftLine"><hr /></div>
                <div id="FooterSocial">
                    <span>• Facebook</span>
                    <span>• Instagram</span>
                    <span>• Twitter</span>
                </div>
                <div id="RightLine"><hr /></div>
            </div>

            {/* Bottom Section with Location, Links, and Legal */}
            <div id="FooterBottom">
                <div id="FooterCon">
                    <div id="FooterLeft">
                        <div id="LogoSection">
                            <img src={FooterLogo} alt="Footer Logo" id="Logo" />
                            <div id="LogoCon">
                                Start collaborating on your travels!
                            </div>
                        </div>
                    </div>

                    <div id="FooterRight">
                        <div id="Location">
                            <div id="LocationHead">Location</div>
                            <div id="LocationCon">
                                20, Lower road,<br />
                                Orr’s hill, Trincomalee
                            </div>
                        </div>

                        <div id="Link">
                            <div id="LinkHead">Links</div>
                            <div id="LinkCon">
                                <Link to="/about">About us</Link><br />
                                <Link to="/services">Services</Link><br />
                                <Link to="/contact">Contact us</Link>
                            </div>
                        </div>

                        <div id="Legal">
                            <div id="LegalHead">Legal</div>
                            <div id="LegalCon">
                                <Link to="/privacy">Privacy Policy</Link><br />
                                <Link to="/terms">Terms of Conditions</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="Copyright">
                Copyright © 2024 All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer;
