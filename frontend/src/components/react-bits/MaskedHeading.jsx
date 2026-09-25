import "./MaskedHeading.css";

export default function MaskedHeading({
  text,
  src,
  mediaType = "image",
  poster,
  fillScale = 1.25,
  parallax = 0,
  reveal = "rise",
  trigger = "view",
  drift = 0,
  brightness = 1,
  saturation = 1,
  grayscale = false,
  duration = 1.1,
  stagger = 0.09,
  align = "center",
  weight = 700,
  tracking = -0.03,
  lineHeight = 1.06,
  textScale = 0.115,
}) {
  const words = text.trim().split(/\s+/);
  const imageStyle = {
    "--mh-image": `url("${src}")`,
    "--mh-fill-scale": fillScale,
    "--mh-parallax": `${parallax}px`,
    "--mh-drift": `${drift}px`,
    "--mh-brightness": brightness,
    "--mh-saturation": saturation,
    "--mh-grayscale": grayscale ? 1 : 0,
    "--mh-duration": `${duration}s`,
    "--mh-stagger": `${stagger}s`,
    "--mh-weight": weight,
    "--mh-tracking": `${tracking}em`,
    "--mh-line-height": lineHeight,
    "--mh-text-scale": textScale,
  };

  return (
    <section
      className={`masked-heading masked-heading--${align}`}
      data-reveal={reveal}
      data-trigger={trigger}
      style={imageStyle}
      aria-labelledby="masked-heading-title"
    >
      {mediaType === "video" ? (
        <video
          className="masked-heading__media"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : (
        <img className="masked-heading__media" src={src} alt="" aria-hidden="true" />
      )}

      <h1 id="masked-heading-title" className="masked-heading__title">
        {words.map((word, index) => (
          <span
            className="masked-heading__word"
            style={{ "--mh-word-index": index }}
            key={`${word}-${index}`}
          >
            {word}
          </span>
        ))}
      </h1>
    </section>
  );
}
