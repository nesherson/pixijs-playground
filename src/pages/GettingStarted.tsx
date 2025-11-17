import {
    Application,
    extend
} from '@pixi/react';
import {
    Container,
    Graphics,
    Sprite,
} from 'pixi.js';

import { GettingStartedStage } from '../components/GettingStartedStage';
import { useState } from 'react';

extend({
    Container,
    Graphics,
    Sprite,
});

export default function GettingStarted() {
    const [bunnySpeed, setBunnySpeed] = useState(1);

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBunnySpeed(parseInt(e.target.value));
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Getting started</h1>
            <p className="text-slate-600">
                This is simple initial project
            </p>
            <div className='my-5'>
                <div className='flex'>
                    <div className='flex flex-col'>
                        <label htmlFor="bunny-speed">
                            Bunny speed
                        </label>
                        <input
                            id='bunny-speed'
                            type='range'
                            min={1}
                            max={10}
                            step={1}
                            value={bunnySpeed}
                            onChange={handleRangeChange} />
                    </div>
                </div>
                <Application>
                    <GettingStartedStage bunnySpeed={bunnySpeed} />
                </Application>
            </div>
        </div>
    );
}