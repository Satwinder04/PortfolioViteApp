import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "./assets/globals.scss";
import Navbar from "./components/hero/Navbar";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import MouseGradient from "./components/MouseGradient";
import { debounce } from "lodash";
import BackgroundSVG from "./components/hero/BackgroundSVG";
import About from "./components/about";
import { useColorAnimation } from "./hooks/useColorAnimation";
import Contact from "./components/contact";
import Projects from "./components/projects";
import SectionSpacer from "./components/SectionSpacer";
import { useIsTouchDevice } from "./hooks/useIsTouchDevice";
import Loader from "./components/Loader";
import { ReactLenis } from "@studio-freight/react-lenis";
import { PixelatedCanvas } from "./components/ui/pixelated-canvas";

function App() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const isMobile = useMemo(() => window.innerWidth <= 768, []);

  const isTouchDevice = useIsTouchDevice();

  const updateDimensions = useCallback(
    debounce(() => {
      const newDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      dimensionsRef.current = newDimensions;
      setDimensions(newDimensions);
    }, 200),
    []
  );

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  const { scrollYProgress } = useScroll();
  const textColor = useMotionValue("#FFFFFF");
  const svgOpacity = useMotionValue(1);

  const { hue1, hue2 } = useColorAnimation();

  const [isLoading, setIsLoading] = useState(true);

  const landingSectionVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        delay: 0.5,
      },
    },
  };

  return (
    <ReactLenis root>
      <Loader onLoadingComplete={() => setIsLoading(false)} />

      <div style={{ visibility: isLoading ? "hidden" : "visible" }} className="text-white">
        <MouseGradient isMobile={isMobile} />
        <motion.div
          className="w-screen overflow-hidden min-h-screen sm:h-screen lg:grid grid-cols-1 sm:grid-cols-2 gap-3 flex justify-center"
        >
          {/* <div className="block md:hidden">
            <BackgroundSVG
              width={dimensions.width}
              height={dimensions.height}
              isMobile={isMobile}
              svgOpacity={svgOpacity}
              isLoading={isLoading}
            />
          </div> */}


          <Navbar />
          <motion.div
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            variants={landingSectionVariants}
            className="flex justify-center items-center relative z-10 flex-col px-4 sm:px-0 py-12 sm:py-0 sm:mt-0 mt-20 order-2 sm:order-1"
          >
            <motion.h1
              className="text-[32px] sm:text-[48px] md:text-[65px] leading-tight sm:leading-[85px] text-light khula-regular uppercase text-center w-full max-w-[732px]"
              style={{
                transform: isMobile
                  ? "none"
                  : useTransform(
                    scrollYProgress,
                    [0, 0.5],
                    ["translateY(0px)", "translateY(-200px)"]
                  ),
                opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
                textShadow: "0px 0px 6px rgba(255,255,255,0.25)",
              }}
            >
              COLLABORATING TO MERGE{" "}
              <motion.span
                style={{
                  backgroundImage: useTransform(
                    [hue1, hue2],
                    ([h1, h2]) =>
                      `linear-gradient(90deg, hsl(${h1}, 100%, 50%), hsl(${h2}, 100%, 50%))`
                  ),
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                CREATIVITY
              </motion.span>{" "}
              WITH FUNCTIONALITY.
            </motion.h1>
            <motion.p
              className="poppins-regular text-base sm:text-lg mt-4 max-w-[390px] text-gray-2 px-2 sm:px-0 text-center leading-[1.5] sm:leading-[123%]"
              style={{
                transform: isMobile
                  ? "none"
                  : useTransform(
                    scrollYProgress,
                    [0, 0.5],
                    ["translateY(0px)", "translateY(-200px)"]
                  ),
                opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
              }}
            >
              Passionate web designer delivering impactful user experiences.
            </motion.p>
          </motion.div>
          <PixelatedCanvas
            className="lg:block hidden order-1 sm:order-2"
            src="/img/portfolio/bg1.png"
            width={1000}
            height={900}
            cellSize={5}
            dotScale={0.4}
            shape="circle"
            backgroundColor="#000"
            dropoutStrength={0.1}
            interactive
            distortionStrength={9}
            distortionRadius={350}
            distortionMode="repel"
            followSpeed={0.1}
            jitterStrength={100}
            jitterSpeed={0.3}
            sampleAverage
            tintColor=""
            tintStrength={0.2}
          />
        </motion.div>
        <div ref={aboutRef} id="about">
          <About
            isAboutInView={useInView(aboutRef, { amount: 0.3 })}
            isMobile={isMobile}
          />
        </div>

        <SectionSpacer />

        <div ref={projectsRef} id="projects" className="relative">
          <Projects
            isProjectsInView={useInView(projectsRef, {
              amount: isTouchDevice ? 0.1 : 0.3,
            })}
            isMobile={isMobile}
          />
        </div>

        <div ref={contactRef} id="contact" className="relative bg-black">
          <Contact
            isContactInView={useInView(contactRef, { amount: 0.5 })}
            isMobile={isMobile}
          />
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;
