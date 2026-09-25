import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const splitTextQueue = [];
let activeSplitTextItem = null;
const SPLIT_TEXT_CASCADE_GAP = 0.22;

const runNextSplitText = () => {
  if (activeSplitTextItem) return;

  const nextItem = splitTextQueue.shift();
  if (!nextItem) return;
  if (nextItem.cancelled) {
    runNextSplitText();
    return;
  }

  activeSplitTextItem = nextItem;
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    if (activeSplitTextItem === nextItem) activeSplitTextItem = null;
    runNextSplitText();
  };

  nextItem.finish = finish;
  nextItem.run(finish);
};

const enqueueSplitText = run => {
  const item = { run, finish: null, cancelled: false };
  splitTextQueue.push(item);
  runNextSplitText();

  return () => {
    item.cancelled = true;
    if (activeSplitTextItem === item) item.finish?.();
  };
};

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
  animationFrom,
  animationTo,
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
  const easingAliases = { easeOutCubic: 'power3.out' };
  const requestedEase = easing ?? ease ?? 'elastic.out';
  const resolvedEase = easingAliases[requestedEase] ?? requestedEase;
  const resolvedSplitType = splitBy ?? splitType;
  const resolvedFrom = animationFrom ?? from;
  const resolvedTo = animationTo ?? to;

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
      let tween;
      let sequenceAdvance;
      let sequenceCleanup;
      let sequenceTrigger;
      let destroyed = false;
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
          gsap.set(targets, { ...resolvedFrom });

          sequenceTrigger = ScrollTrigger.create({
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4,
            onEnter: () => {
              sequenceCleanup = enqueueSplitText(finishSequence => {
                if (destroyed) {
                  finishSequence();
                  return;
                }

                tween = gsap.to(targets, {
                  ...resolvedTo,
                  duration,
                  ease: resolvedEase,
                  stagger: delay / 1000,
                  onComplete: () => {
                    animationCompletedRef.current = true;
                    onCompleteRef.current?.();
                  },
                  willChange: 'transform, opacity',
                  force3D: true
                });
                sequenceAdvance = gsap.delayedCall(SPLIT_TEXT_CASCADE_GAP, finishSequence);
              });
            }
          });

          return undefined;
        }
      });

      el._rbsplitInstance = splitInstance;

      return () => {
        destroyed = true;
        sequenceAdvance?.kill();
        sequenceCleanup?.();
        sequenceTrigger?.kill();
        tween?.kill();
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
        JSON.stringify(resolvedFrom),
        JSON.stringify(resolvedTo),
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
