export class Carousel {
  constructor(root: Element) {
    try {
      const track = root.querySelector(".carousel-track") as HTMLElement;
      const slides = Array.from(track.children);
      const nextButton = root.querySelector(".carousel-btn.next");
      const prevButton = root.querySelector(".carousel-btn.prev");

      let currentIndex = 0;

      const updateCarousel = () => {
        const slideWidth = slides[0]?.getBoundingClientRect().width || 0;
        track!.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      };

      nextButton?.addEventListener("click", () => {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
          updateCarousel();
        }
      });

      prevButton?.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });

      updateCarousel();
    } catch (err) {
      console.error("Carousel init error:", err);
    }
  }
}
