import React, { useEffect } from 'react';
import { getCountDown } from '../../utils/helper';
const BannerComponent = (props) => {
    useEffect(() => {

        // Set the date we're counting down to
        var countDownDate = 1616421600 * 1000

        // for testing
        // var countDownDate = 1616396453 * 1000
        // Update the count down every 1 second
        var x = setInterval(function () {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            document.getElementById("idTimeBOXESClose").innerHTML ="in " + hours + "h "
                + minutes + "m " + seconds + "s ";

            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("idTimeBOXESClose").innerHTML = "has been taken";
            }
        }, 1000);

        return () => {
            clearInterval(x);
        }
    }, [])
    return (
        <div className="pp-banner-ads">
            <div className="container">
                <div className="pp-banner-ads-content">
                    <div className="pp-banner-animation"></div>
                    <div className="pp-banner-animation2"></div>
                    <div>
                        <img src="/images/logo-w.png" className="me-4" />
                        <img src="/images/blind-boxes-logo-w.png" />
                    </div>
                    <h2 className="ms-4">
                        BLIND BOXES IDO 1st Snapshot <span id="idTimeBOXESClose"></span>
                        {/* <div className="text-center">
                            <b>
                                
                            </b>
                        </div> */}


                    </h2>
                </div>
            </div>
        </div>
    );
}

export default BannerComponent;


