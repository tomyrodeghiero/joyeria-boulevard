import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Intro = ({ setIntroComplete }: any) => {
  const textRef = useRef(null);
  const hrRef = useRef(null);
  const descRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    const textElem = textRef.current;
    const hrElem = hrRef.current;
    const descElem = descRef.current;
    const introElem = introRef.current;

    gsap.set([textElem, hrElem, descElem], { autoAlpha: 0 }); // hide elements initially
    gsap.fromTo(
      textElem,
      { y: 50 },
      { duration: 1, y: 0, autoAlpha: 1, delay: 1 }
    );
    gsap.fromTo(
      hrElem,
      { x: -200 },
      { duration: 0.8, x: 0, autoAlpha: 1, delay: 2.5 }
    );
    gsap.fromTo(
      descElem,
      { y: -24 },
      { duration: 0.8, y: 0, autoAlpha: 1, delay: 3.3 }
    );

    gsap.to([textElem, hrElem, descElem], {
      autoAlpha: 0,
      delay: 7.5,
    });

    gsap.to(introElem, {
      autoAlpha: 0,
      delay: 7.5,
      onComplete: () => setIntroComplete(true),
    });
  }, []);

  return (
    <div className="middle" ref={introRef}>
      <div className="cutoff">
        <p className="text" ref={textRef}>
          Boulevard
        </p>

        <div className="hr" ref={hrRef} />

        <p className="desc mb-20 lg:mb-0">
          <span className="descText" ref={descRef}>
            Joyería & Relogería
          </span>
        </p>
      </div>
    </div>
  );
};

export default Intro;
