// Web Audio API Sound Synthesizer for Keyboard Key Click Sound Effects

let audioCtx = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

/**
 * Triggers a realistic key click sound effect.
 * @param {Object} options Configuration options
 * @param {string} options.preset 'mechanical' | 'thock' | 'typewriter'
 * @param {number} options.volume Sound volume (0.0 to 1.0)
 * @param {string} options.code Keyboard event code
 */
export const triggerKeySound = ({ preset = 'mechanical', volume = 0.6, code = '' } = {}) => {
  if (volume <= 0) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Spacebar and Enter have a slightly deeper acoustic resonance
  const isHeavyKey = code === 'Space' || code === 'Enter' || code === 'NumpadEnter' || code === 'Backspace' || code === 'ShiftLeft' || code === 'ShiftRight';
  const pitchMult = isHeavyKey ? 0.84 : (0.94 + Math.random() * 0.12);

  const masterGain = ctx.createGain();
  const scaledVol = Math.max(0, Math.min(1, volume)) * (isHeavyKey ? 0.45 : 0.38);
  masterGain.gain.setValueAtTime(scaledVol, now);
  masterGain.connect(ctx.destination);

  if (preset === 'thock') {
    // ----------------------------------------------------
    // Deep Thock (Lubed Linear Mechanical Switch)
    // ----------------------------------------------------
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280 * pitchMult, now);
    osc.frequency.exponentialRampToValueAtTime(45 * pitchMult, now + 0.035);

    oscGain.gain.setValueAtTime(0.85, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400 * pitchMult, now);

    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.04);

    // Subtle percussive click transient
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'sine';
    clickOsc.frequency.setValueAtTime(1200 * pitchMult, now);
    clickOsc.frequency.exponentialRampToValueAtTime(200, now + 0.01);
    clickGain.gain.setValueAtTime(0.4, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

    clickOsc.connect(clickGain);
    clickGain.connect(masterGain);
    clickOsc.start(now);
    clickOsc.stop(now + 0.015);

  } else if (preset === 'typewriter') {
    // ----------------------------------------------------
    // Vintage Metallic Typewriter Click
    // ----------------------------------------------------
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(2200 * pitchMult, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.018);

    oscGain.gain.setValueAtTime(0.5, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    osc.connect(oscGain);
    oscGain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.022);

  } else {
    // ----------------------------------------------------
    // Classic Mechanical Tactile Switch Click (Default)
    // ----------------------------------------------------
    // 1. High frequency crisp click (Noise burst)
    const bufferSize = Math.floor(ctx.sampleRate * 0.012);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3400 * pitchMult, now);
    filter.Q.setValueAtTime(2.5, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.7, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noise.start(now);

    // 2. Mid stroke snap
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(850 * pitchMult, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.02);

    oscGain.gain.setValueAtTime(0.75, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

    osc.connect(oscGain);
    oscGain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.025);

    // 3. Sub housing thock
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(180 * pitchMult, now);
    subOsc.frequency.exponentialRampToValueAtTime(50, now + 0.03);

    subGain.gain.setValueAtTime(0.5, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);

    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start(now);
    subOsc.stop(now + 0.035);
  }
};
