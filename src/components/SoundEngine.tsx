'use client';

import { useEffect, useRef } from 'react';

const ERA_IDS = [
  'era-1991',
  'era-1996',
  'era-2000',
  'era-2005',
  'era-2010',
  'era-2015',
  'era-2021',
] as const;

interface SoundEngineProps {
  enabled: boolean;
}

interface SoundHandle {
  stop: () => void;
}

function buildEra1991(ctx: AudioContext, dest: AudioNode): SoundHandle {
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.value = 60;
  const gain = ctx.createGain();
  gain.gain.value = 0.04;
  osc.connect(gain);
  gain.connect(dest);
  osc.start();

  // Subtle harmonic
  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.value = 120;
  const gain2 = ctx.createGain();
  gain2.gain.value = 0.015;
  osc2.connect(gain2);
  gain2.connect(dest);
  osc2.start();

  return {
    stop: () => {
      try { osc.stop(); } catch {}
      try { osc2.stop(); } catch {}
    },
  };
}

function buildEra1996(ctx: AudioContext, dest: AudioNode): SoundHandle {
  const notes = [261.63, 329.63, 392.0]; // C4, E4, G4
  let noteIdx = 0;
  const activeOscs: OscillatorNode[] = [];

  const playNote = () => {
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = notes[noteIdx % 3];
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(dest);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
    activeOscs.push(osc);
    // Drop ref once the osc is done so the array doesn't grow unbounded
    // during long playback (runs every 450ms).
    osc.onended = () => {
      const idx = activeOscs.indexOf(osc);
      if (idx !== -1) activeOscs.splice(idx, 1);
    };
    noteIdx++;
  };

  playNote();
  const intervalId = setInterval(playNote, 450);

  return {
    stop: () => {
      clearInterval(intervalId);
      activeOscs.forEach((o) => { try { o.stop(); } catch {} });
    },
  };
}

function buildEra2000(ctx: AudioContext, dest: AudioNode): SoundHandle {
  const gain = ctx.createGain();
  gain.gain.value = 0.05;
  gain.connect(dest);
  const scheduled: OscillatorNode[] = [];

  const sweep = (startF: number, endF: number, startTime: number, dur: number) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startF, startTime);
    osc.frequency.linearRampToValueAtTime(endF, startTime + dur);
    osc.connect(gain);
    osc.start(startTime);
    osc.stop(startTime + dur + 0.01);
    scheduled.push(osc);
    // Drop the ref once the oscillator finishes so the array doesn't grow
    // unbounded during long playbacks. stop() still works if it fires before
    // 'ended' (the osc.stop() call on a stopped oscillator is a no-op).
    osc.onended = () => {
      const idx = scheduled.indexOf(osc);
      if (idx !== -1) scheduled.splice(idx, 1);
    };
  };

  const play = () => {
    const t = ctx.currentTime;
    sweep(300, 3400, t, 0.25);
    sweep(3400, 800, t + 0.25, 0.2);
    sweep(1200, 2200, t + 0.45, 0.2);
    sweep(2200, 1200, t + 0.65, 0.2);
    sweep(800, 2400, t + 0.85, 0.3);
  };

  play();
  const intervalId = setInterval(play, 2000);

  return {
    stop: () => {
      clearInterval(intervalId);
      scheduled.forEach((o) => { try { o.stop(); } catch {} });
    },
  };
}

function buildEra2005(ctx: AudioContext, dest: AudioNode): SoundHandle {
  const activeOscs: OscillatorNode[] = [];
  const ding = () => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 880;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(dest);
    osc.start();
    osc.stop(ctx.currentTime + 0.65);
    activeOscs.push(osc);
    // Cleanup ref after oscillator ends
    osc.onended = () => {
      const idx = activeOscs.indexOf(osc);
      if (idx !== -1) activeOscs.splice(idx, 1);
    };
  };

  ding();
  const intervalId = setInterval(ding, 5000);

  return {
    stop: () => {
      clearInterval(intervalId);
      activeOscs.forEach((o) => { try { o.stop(); } catch {} });
    },
  };
}

function buildEra2010(ctx: AudioContext, dest: AudioNode): SoundHandle {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = 432;
  const gain = ctx.createGain();
  gain.gain.value = 0.018;
  osc.connect(gain);
  gain.connect(dest);
  osc.start();

  return { stop: () => { try { osc.stop(); } catch {} } };
}

function buildEra2015(ctx: AudioContext, dest: AudioNode): SoundHandle {
  // White noise
  const bufSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = 600;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.018;
  noise.connect(lowpass);
  lowpass.connect(noiseGain);
  noiseGain.connect(dest);
  noise.start();

  // Gentle pad
  const padFreqs = [261.63, 329.63, 392.0, 523.25];
  const padOscs = padFreqs.map((f) => {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = 0.008;
    o.connect(g);
    g.connect(dest);
    o.start();
    return o;
  });

  return {
    stop: () => {
      try { noise.stop(); } catch {}
      padOscs.forEach((o) => { try { o.stop(); } catch {} });
    },
  };
}

function buildEra2021(ctx: AudioContext, dest: AudioNode): SoundHandle {
  const base = ctx.createOscillator();
  base.type = 'sine';
  base.frequency.value = 80;

  const lfo = ctx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.15;

  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 8;
  lfo.connect(lfoGain);
  lfoGain.connect(base.frequency);

  const baseGain = ctx.createGain();
  baseGain.gain.value = 0.03;
  base.connect(baseGain);
  baseGain.connect(dest);

  const harm = ctx.createOscillator();
  harm.type = 'sine';
  harm.frequency.value = 320;
  const harmGain = ctx.createGain();
  harmGain.gain.value = 0.012;
  harm.connect(harmGain);
  harmGain.connect(dest);

  const high = ctx.createOscillator();
  high.type = 'sine';
  high.frequency.value = 640;
  const highGain = ctx.createGain();
  highGain.gain.value = 0.006;
  high.connect(highGain);
  highGain.connect(dest);

  base.start();
  lfo.start();
  harm.start();
  high.start();

  return {
    stop: () => {
      [base, lfo, harm, high].forEach((o) => { try { o.stop(); } catch {} });
    },
  };
}

const ERA_BUILDERS: Record<string, (ctx: AudioContext, dest: AudioNode) => SoundHandle> = {
  'era-1991': buildEra1991,
  'era-1996': buildEra1996,
  'era-2000': buildEra2000,
  'era-2005': buildEra2005,
  'era-2010': buildEra2010,
  'era-2015': buildEra2015,
  'era-2021': buildEra2021,
};

export default function SoundEngine({ enabled }: SoundEngineProps) {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const activeRef = useRef<SoundHandle | null>(null);
  const currentEraRef = useRef<string>('');

  const getCtx = (): AudioContext => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
      masterGainRef.current = ctxRef.current.createGain();
      masterGainRef.current.gain.value = 1;
      masterGainRef.current.connect(ctxRef.current.destination);
    }
    return ctxRef.current;
  };

  const stopActive = () => {
    if (activeRef.current) {
      activeRef.current.stop();
      activeRef.current = null;
    }
  };

  const playEra = (eraId: string) => {
    stopActive();
    const builder = ERA_BUILDERS[eraId];
    if (!builder) return;
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    activeRef.current = builder(ctx, masterGainRef.current!);
  };

  useEffect(() => {
    if (!enabled) {
      stopActive();
      return;
    }

    if (currentEraRef.current) {
      playEra(currentEraRef.current);
    }

    const observers: IntersectionObserver[] = [];

    ERA_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            currentEraRef.current = id;
            if (enabled) playEra(id);
          }
        },
        { threshold: 0.4 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      stopActive();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return null;
}

