import { useRef, useState, useEffect } from "react";

export function useCarouselRef() {
  const carouselContainerRef = useRef();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    const container = carouselContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8; // 80% del ancho visible
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = carouselContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      setShowLeftArrow(scrollLeft > 0);

      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return { carouselContainerRef, scroll };
}
