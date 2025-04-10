import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";

type GallerySectionProps = {
  isGalleryInView: boolean;
  isMobile: boolean;
  backgroundGradient: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

const Gallery: React.FC<GallerySectionProps> = ({
  isGalleryInView,
  isMobile,
  backgroundGradient,
  isModalOpen,
  setIsModalOpen
}) => {
  const galleryControls = useAnimationControls();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Define image data with correct paths and types
  const galleryImages = [
    { src: "./img/portfolio/1.jpg", span: 1 },
    { src: "./img/portfolio/2.jpg", span: 1 },
    { src: "./img/portfolio/3.jpg", span: 1 },
    { src: "./img/portfolio/4.jpeg", span: 1 },
    { src: "./img/portfolio/12.jpg", span: 2 },
    { src: "./img/portfolio/6.jpg", span: 2 },
    { src: "./img/portfolio/7.png", span: 1 },
    { src: "./img/portfolio/8.jpg", span: 1 },
    { src: "./img/portfolio/9.jpg", span: 2 },
  ];

  useEffect(() => {
    if (isGalleryInView) {
      galleryControls.start("visible");
    }
  }, [isGalleryInView, galleryControls]);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setIsModalOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <motion.div
      style={{ background: backgroundGradient }}
      className="w-screen min-h-screen flex justify-center items-center relative z-10 py-20"
    >
      <motion.div
        initial={false}
        animate={galleryControls}
        className="max-w-[1200px] w-full px-6"
      >
        {/* Heading Section */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="khula-regular text-black text-5xl max-sm:text-3xl tracking-tight mt-20 "
          >
            Achievements
          </motion.h2>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-3 gap-4 mt-10">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              onClick={() => handleImageClick(index)}
              className={`
                bg-gray-200 rounded-2xl overflow-hidden cursor-pointer
                ${image.span === 2 ? 'col-span-2' : ''}
                ${
                  index === 3 || index === 4 ? 'h-[400px]' :
                  index === 5 || index === 6 ? 'h-[350px]' :
                  'h-[300px]'
                }
                
              `}
            >
              <img 
                src={image.src}
                className="w-full h-full object-cover hover:scale-105 transform transition-transform duration-300"
                alt={`Gallery image ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              onClick={() => handleImageClick(index)}
              className="bg-gray-200 rounded-2xl overflow-hidden h-[250px] cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              <img 
                src={image.src}
                className="w-full h-full object-cover"
                alt={`Gallery image ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <ImageModal
          images={galleryImages.map(img => img.src)}
          currentIndex={currentImageIndex}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </motion.div>
    </motion.div>
  );
};

export default Gallery;



