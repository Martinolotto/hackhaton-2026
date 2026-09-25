import DotField from './DotField';

export default function Background() {
  return (
    <div className="home-background" aria-hidden="true">
      <DotField
        dotRadius={1.5}
        dotSpacing={30}
        cursorRadius={350}
        cursorForce={0.1}
        bulgeOnly
        bulgeStrength={58}
        glowRadius={160}
        waveAmplitude={0}
        sparkle={false}
        gradientFrom="#30aac2"
        gradientTo="#03b1f0"
        glowColor="#251f2d"
      />
    </div>
  );
}
