export default function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = sectionId === 'gallery' ? -50 : 0; // Adjust offset for gallery
      window.scrollTo({
        top: section.offsetTop + offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="select-none text-light text-3xl flex justify-between w-full items-center h-[90px] px-8 absolute top-0">
      <p className="text-3xl">SS</p>
    </div>
  );
}
