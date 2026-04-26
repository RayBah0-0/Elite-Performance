export default function Gallery() {
  const images = [
    '/showcase/1000001739.JPG',
    '/showcase/1000001756.JPG',
    '/showcase/1000001757.JPG',
    '/showcase/1000001759.JPG',
    '/showcase/1000001761.JPG',
    '/showcase/1000001764.JPG',
    '/showcase/1000001765.JPG',
    '/showcase/1000001767.JPG',
    '/showcase/1000001768.JPG',
  ];

  return (
    <section className="gallery-section py-section bg-dark min-h-screen">
      <div className="container fade-in visible">
        <div className="section-header">
          <h2>Training <span className="text-gradient">In Action</span></h2>
        </div>
        <div className="gallery-grid">
          {images.map((src, index) => (
            <div key={index} className="gallery-item">
              <img src={src} alt={`Training Action Shot ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
