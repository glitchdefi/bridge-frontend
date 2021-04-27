import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import { actGetListProjects } from "../../redux/action/user";
import Particles from 'react-particles-js';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

const HomePage = (props) => {
  const dispatch = useDispatch();
  const [init, seInit] = useState(true);

  useEffect(() => {
    dispatch(actGetListProjects())
    seInit(false)
    if (init) {

      setInterval(() => {
        dispatch(actGetListProjects())
      }, 5 * 1000);
    }
  }, [init])



  return (
    <>
    
      <div className="pp-homepage">
       
      </div>


      <Particles params={{
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 2000
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      }} />
    </>
  );
};

export default HomePage;
