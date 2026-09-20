import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { transitions, springPresets } from '../transitions';
import { TransitionView } from '../components/TransitionView';
import { motion, AnimatePresence } from 'motion/react';

const meta: Meta = {
  title: 'Motion/Playground',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const Interactive: Story = {
  render: () => {
    const [selectedTransition, setSelectedTransition] = React.useState<keyof typeof transitions>('spring');
    const [selectedPreset, setSelectedPreset] = React.useState<'fade' | 'slide-up' | 'slide-down' | 'scale' | 'pop'>('slide-up');
    const [duration, setDuration] = React.useState<'fast' | 'normal' | 'slow'>('normal');
    const [key, setKey] = React.useState(0);
    const [visible, setVisible] = React.useState(true);

    const replay = () => {
      setVisible(false);
      setTimeout(() => {
        setKey((k) => k + 1);
        setVisible(true);
      }, 50);
    };

    const activeTransitionObj = transitions[selectedTransition];

    return (
      <div className="flex flex-col gap-8 max-w-4xl font-sans">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Motion Physics Playground
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Test and tweak physics spring curves, transition timings, and orchestration variants in real time.
          </p>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-card border border-grey-200 dark:border-grey-800 rounded-xl">
          {/* Transition Curve */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Transition Curve
            </label>
            <select
              value={selectedTransition}
              onChange={(e) => {
                setSelectedTransition(e.target.value as any);
                replay();
              }}
              className="px-3 py-2 text-xs rounded-md border border-grey-300 dark:border-grey-700 bg-background text-foreground"
            >
              {Object.keys(transitions).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <div className="text-[11px] text-muted-foreground font-mono mt-1">
              {'duration' in activeTransitionObj
                ? `Duration: ${(activeTransitionObj as any).duration * 1000}ms`
                : `Stiffness: ${(activeTransitionObj as any).stiffness}, Damping: ${(activeTransitionObj as any).damping}`}
            </div>
          </div>

          {/* Animation Preset */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Variant Preset
            </label>
            <select
              value={selectedPreset}
              onChange={(e) => {
                setSelectedPreset(e.target.value as any);
                replay();
              }}
              className="px-3 py-2 text-xs rounded-md border border-grey-300 dark:border-grey-700 bg-background text-foreground"
            >
              <option value="slide-up">Slide Up</option>
              <option value="slide-down">Slide Down</option>
              <option value="scale">Scale In</option>
              <option value="pop">Pop</option>
              <option value="fade">Pure Fade</option>
            </select>
          </div>

          {/* Duration Timing */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Speed Scale
            </label>
            <div className="flex gap-2">
              {(['fast', 'normal', 'slow'] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => {
                    setDuration(spd);
                    replay();
                  }}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md border capitalize cursor-pointer transition-colors ${
                    duration === spd
                      ? 'bg-primary text-white border-primary'
                      : 'border-grey-300 dark:border-grey-700 text-foreground hover:bg-grey-100 dark:hover:bg-grey-800'
                  }`}
                >
                  {spd}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-3">
          <button
            onClick={replay}
            className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-md shadow-sm hover:bg-primary-600 transition-colors cursor-pointer"
          >
            Replay Motion
          </button>
          <button
            onClick={() => setVisible((v) => !v)}
            className="px-4 py-2 border border-grey-300 dark:border-grey-700 text-foreground text-xs font-semibold rounded-md hover:bg-grey-100 dark:hover:bg-grey-800 transition-colors cursor-pointer"
          >
            Toggle State ({visible ? 'Hide' : 'Show'})
          </button>
        </div>

        {/* Live Animation Stage */}
        <div className="p-10 border border-dashed border-grey-300 dark:border-grey-700 rounded-2xl bg-grey-50/50 dark:bg-grey-900/50 min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {visible && (
              <TransitionView
                key={key}
                preset={selectedPreset}
                duration={duration}
                transition={activeTransitionObj}
                className="w-full max-w-md p-6 bg-card border border-grey-200 dark:border-grey-800 rounded-xl shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider">
                    Live Physics Test
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary">
                    {selectedPreset} • {selectedTransition}
                  </span>
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Appalachian White Oak FAS
                </h3>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  Kiln dried batch #481-C stabilized to 7.8% moisture content with laser-profiled edge grading.
                </p>
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-grey-100 dark:border-grey-800 text-center">
                  <div>
                    <div className="text-xs font-bold text-foreground">755 kg/m³</div>
                    <div className="text-[10px] text-muted-foreground">Density</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">7.8%</div>
                    <div className="text-[10px] text-muted-foreground">Moisture</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">94.8%</div>
                    <div className="text-[10px] text-muted-foreground">Recovery</div>
                  </div>
                </div>
              </TransitionView>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  },
};

export const PhysicsSandbox: Story = {
  render: () => {
    const [preset, setPreset] = React.useState<keyof typeof springPresets>('bouncy');
    const activeSpring = springPresets[preset];

    return (
      <div className="flex flex-col gap-8 max-w-3xl font-sans">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Interactive Physics Sandbox
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Drag the timber specimen card anywhere on the canvas and release it to see real-time physics spring restoration.
          </p>
        </div>

        <div className="flex gap-2 p-3 bg-card border border-grey-200 dark:border-grey-800 rounded-xl w-fit">
          {(Object.keys(springPresets) as (keyof typeof springPresets)[]).map((key) => (
            <button
              key={key}
              onClick={() => setPreset(key)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg capitalize cursor-pointer transition-colors ${
                preset === key
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-grey-100 dark:bg-grey-800 text-foreground hover:bg-grey-200 dark:hover:bg-grey-700'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        <div className="relative h-[400px] border-2 border-dashed border-grey-300 dark:border-grey-700 rounded-2xl flex items-center justify-center overflow-hidden bg-dot-grid bg-grey-50/50 dark:bg-grey-900/50">
          <span className="absolute top-4 left-4 text-xs font-mono text-muted-foreground">
            Drag around & release • Spring: {preset} (stiffness: {activeSpring.stiffness}, damping: {activeSpring.damping})
          </span>

          <motion.div
            drag
            dragConstraints={{ left: -160, right: 160, top: -120, bottom: 120 }}
            dragSnapToOrigin
            dragTransition={{ bounceStiffness: activeSpring.stiffness, bounceDamping: activeSpring.damping }}
            whileHover={{ scale: 1.04, cursor: 'grab' }}
            whileTap={{ scale: 0.96, cursor: 'grabbing' }}
            className="p-6 bg-card border-2 border-primary/40 rounded-2xl shadow-xl w-80 select-none touch-none"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-primary">DRAGGABLE SPECIMEN</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-white uppercase">
                {preset}
              </span>
            </div>
            <h4 className="font-semibold text-base text-foreground">Black Walnut Heartwood</h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Grab and fling this card to test spring physics and velocity retention.
            </p>
            <div className="mt-4 pt-3 border-t border-grey-200 dark:border-grey-800 flex justify-between text-xs font-mono text-muted-foreground">
              <span>Stiffness: {activeSpring.stiffness}</span>
              <span>Damping: {activeSpring.damping}</span>
            </div>
          </motion.div>
        </div>
      </div>
    );
  },
};
