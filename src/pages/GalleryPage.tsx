import Gallery from '../components/gallery';
import MouseGradient from '../components/MouseGradient';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const GalleryPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBackClick = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      <button 
        onClick={handleBackClick}
        className="fixed top-8 left-8 z-[999]  flex items-center gap-2"
      >
        {isModalOpen ? (
          // <X size={28} />
          <svg 
              width= "28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className='text-black'
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
        ) : (
          <>
            <svg 
              width= "28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className='text-black'
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {/* <span className="text-lg"></span> */}
          </>
        )}
      </button>

      <MouseGradient isMobile={isMobile} />
      <Gallery 
        isGalleryInView={true} 
        isMobile={isMobile} 
        backgroundGradient="linear-gradient(to bottom, #ffffff, #ffffff)"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default GalleryPage;


