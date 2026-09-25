import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const SplitText = ({
  text,
  className = '',
  delay = 10,
  duration = 1.3,
  ease,
  easing,
  splitType = 'chars',
  splitBy,
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign,
  tag = 'p',
  onLetterAnimationComplete,
  ...elementProps
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(() => document.fonts?.status === 'loaded');
  const shouldReduceMotion = useReducedMotion();
  const resolvedEase = easing ?? ease ?? 'elastic.out';
  const resolvedSplitType = splitBy ?? splitType;

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (fontsLoaded || !document.fonts) return undefined;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) setFontsLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [fontsLoaded]);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded || shouldReduceMotion) return;
      // Prevent re-animation if already completed
      if (animationCompletedRef.current) return;
      const el = ref.current;

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch {
          /* noop */
        }
        el._rbsplitInstance = null;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets;
      const assignTargets = self => {
        if (resolvedSplitType.includes('chars') && self.chars.length) targets = self.chars;
        if (!targets && resolvedSplitType.includes('words') && self.words.length) targets = self.words;
        if (!targets && resolvedSplitType.includes('lines') && self.lines.length) targets = self.lines;
        if (!targets) targets = self.chars || self.words || self.lines;
      };

      const splitInstance = new GSAPSplitText(el, {
        type: resolvedSplitType,
        smartWrap: true,
        autoSplit: resolvedSplitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: self => {
          assignTargets(self);
          const tween = gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease: resolvedEase,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              },
              willChange: 'transform, opacity',
              force3D: true
            }
          );
          return tween;
        }
      });

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch {
          /* noop */
        }
        el._rbsplitInstance = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        resolvedEase,
        resolvedSplitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        shouldReduceMotion
      ],
      scope: ref
    }
  );

  const renderTag = () => {
    const style = {
      ...(textAlign ? { textAlign } : {}),
      overflow: 'hidden',
      display: 'block',
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      willChange: shouldReduceMotion ? 'auto' : 'transform, opacity'
    };
    const classes = `split-parent ${className}`;
    const Tag = tag || 'p';

    return (
      <Tag ref={ref} style={style} className={classes} {...elementProps}>
        {text}
      </Tag>
    );
  };
  return renderTag();
};

export default SplitText;
