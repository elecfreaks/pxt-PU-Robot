
class Parameters {
    walkTilt: number;
    jumpTilt: number;
    legSize: number;
    dof: number;
    servoErr: number[];
    servoCtrl: number[];
    servoTarget: number[];
    servoTrim: number[];
    exploreDirection: number[];
    exploreSize: number;
    exploreDistance: number[];
    exploreMid2: number;
    exploreMid1: number;
    walkFwdStates: number[];
    walkBwdStates: number[];
    skateFwdStates: number[];
    skateBwdStates: number[];
    danceOkStates: number[];
    stateTargets: number[][];
    stateSpeedIndices: number[]; // Using index-based array for mapping
    speedCandidates: number[][];

    constructor() {
        this.walkTilt = 16;
        this.jumpTilt = 27;
        this.legSize = 45;
        this.dof = 6;

        // Initialize vectors
        this.servoErr = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
        this.servoCtrl = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
        this.servoTarget = [90.0, 90.0, 90.0, 90.0, 90.0, 90.0];

        // Servo trim
        this.servoTrim = [-7, -0.0, -7, -0.0, -9.0, 0.0];

        // Turning directions
        this.exploreDirection = [-1.0, -0.7, 0.7, 1.0];
        this.exploreSize = this.exploreDirection.length;
        this.exploreDistance = [500.0, 500.0, 500.0, 500.0];
        this.exploreMid2 = Math.floor(this.exploreSize * 0.5);
        this.exploreMid1 = Math.max(0, this.exploreMid2 - 1);

        // Movement sequences
        this.walkFwdStates = [2, 3, 4, 5];
        this.walkBwdStates = [6, 5, 7, 3];
        this.skateFwdStates = [8, 9, 10, 11];
        this.skateBwdStates = [12, 1, 13, 9];
        this.danceOkStates = [0, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 16, 17];

        let w_t = this.walkTilt;
        let l_s = this.legSize;
        let j_t = this.jumpTilt;

        // Servo targets for each pose
        this.stateTargets = [
            [90, 90, 90, 90, 90, 80],                  // 0: stand
            [10, 150, 170, 30, 40, 125],               // 1: duck
            [90 - w_t, 90 + 35, 90 - j_t, 90 + 30, 90 - l_s - 8, 80], // 2: walk1
            [93, 90 + l_s, 93, 90 + l_s, 90 - l_s - 8, 80],           // 3: w2
            [90 + j_t, 90 - 30, 90 + w_t, 90 - 35, 90 + l_s + 8, 80], // 4: w3
            [87, 90 - l_s, 87, 90 - l_s, 90 + l_s + 8, 80],           // 5: w4
            [90 - w_t, 90 - 25, 90 - j_t, 90 - 45, 90 + l_s, 80],     // 6: w5
            [90 + j_t, 90 + 45, 90 + w_t, 90 + 25, 90 - l_s, 80],     // 7: w6
            [90 - w_t + 5, 90 + 35, 90 - w_t, 90 + 10, 90 + 35, 90 + 5], // 8: skate 1
            [90 + w_t - 5, 90 + 35, 90 + w_t - 5, 90 + 25, 90 - 20, 90 - 15], // 9: s2
            [90 + w_t, 90 - 10, 90 + w_t - 5, 90 - 35, 90 - 35, 90 + 5], // 10: s3
            [90 - w_t + 5, 90 - 25, 90 - w_t + 5, 90 - 35, 90 + 20, 90 - 15], // 11: s4
            [90 - w_t + 5, 90 - 20, 90 - j_t, 90 - 20, 90 + 20, 90],  // 12: s5
            [90 + j_t, 90 + 20, 90 + w_t - 5, 90 + 20, 90 - 20, 90],  // 13: s6
            [130, 90, 50, 90, 90, 90],                 // 14: jump
            [0, 85, 180, 95, 90, 90],                  // 15
            [85, 90, 95, 90, 45, 65],                  // 16: dance
            [85, 90, 95, 90, 135, 65],                 // 17
            [75, 90, 30, 90, 135, 105],                // 18: side move
            [150, 90, 105, 90, 45, 105],               // 19
            [75, 90, 30, 90, 45, 75],                  // 20
            [150, 90, 105, 90, 135, 75],               // 21
            [75, 90, 75, 90, 90, 90],                  // 22
            [105, 90, 105, 90, 90, 90],                // 23
            [130, 90, 50, 90, 90, 55],                 // 24: soccer
            [90, 60, 90, 120, 90, 90],                 // 25: calibrate
            [90, 90, 90, 90, 90, 90]                   // 26: rest
        ];

        // Mapping dictionary
        this.stateSpeedIndices = [1, 0, 3, 4, 2, 4, 3, 2, 3, 4, 2, 4, 3, 2, 8, 10, 0, 0, 6, 6, 6, 6, 9, 7, 5, 7, 0];

        // Control speed vectors
        this.speedCandidates = [
            [1, 1, 1, 1, 1, 1],             // 0
            [1, 1, 1, 1, 0.5, 0.5],         // 1
            [2, 1, 1, 1, 1.2, 0.4],         // 2
            [1, 1, 2, 1, 1.2, 0.4],         // 3
            [1, 1, 1, 1, 1.2, 0.4],         // 4
            [5, 1, 5, 1, 1, 5],             // 5
            [0.55, 1, 0.55, 1, 1, 1],       // 6
            [2, 1, 1, 1, 1, 1],             // 7
            [5, 1, 5, 1, 1, 3],             // 8
            [1, 1, 2, 1, 1, 1],             // 9
            [6, 2, 6, 2, 1, 1]              // 10
        ];
    }
}
class MusicLib {
    loudThreshold: number;
    loud: number;
    bufferSize: number;
    buf: number[];
    lastIndex: number;
    period: number;
    hits: number;

    constructor() {
        this.loudThreshold = 15; // loudness threshold for beats
        this.loud = 0;
        this.bufferSize = 43; // 42 measurements bucket and 1 data collection bucket
        this.buf = [];
        for (let i = 0; i < this.bufferSize; i++) {
            this.buf.push(0);
        }
        this.lastIndex = 0;
        this.period = 500; // most possible period in ms
        this.hits = 0;
    }

    // ring buffer index calculation
    ringBufferIdx(m: number, icr: number, size: number) {
        const result = (m + icr) % size
        if (result < 0) {
            // Handle negative modulo in JS
            return result + size
        }
        return result
    }

    /**
     * check if it is a beat, compute music period, and update threshold
     */
    isABeat(timestamp: number, loudness: number, snr: number, sampleMs: number = 125): boolean {
        this.loud = loudness * 0.01; // scale down
        let isABeatResult = false;

        // compute bucket index
        let idx = Math.floor(timestamp / sampleMs) % this.bufferSize;

        if (idx == this.lastIndex) {
            // update the data collection bucket
            this.hits += 1;
            this.buf[idx] = (this.buf[idx] * (this.hits - 1) + this.loud) / this.hits;
        } else {
            // fill the new bucket
            this.hits = 0;
            this.buf[idx] = this.loud;
            this.lastIndex = idx;

            // beat detection only when previous bucket is full
            let cIdx = this.ringBufferIdx(idx, -2, this.bufferSize);
            let prevIdx = cIdx;
            let c = 0; // beat count

            // Calculate average loudness
            let sumLoud = 0;
            for (let val of this.buf) {
                sumLoud += val;
            }
            let avgLoudness = sumLoud / this.bufferSize;
            let length = this.bufferSize - 3;

            for (let j = 0; j < length; j++) {
                let nl = this.ringBufferIdx(cIdx, -1, this.bufferSize);
                let nr = this.ringBufferIdx(cIdx, 1, this.bufferSize);

                if (this.buf[cIdx] > this.buf[nl] * snr &&
                    this.buf[cIdx] > this.buf[nr] * snr &&
                    this.buf[cIdx] > avgLoudness) {

                    c++;
                    if (prevIdx == cIdx) {
                        this.loudThreshold = this.buf[cIdx] * 0.9;
                        isABeatResult = true;
                    }
                }
                cIdx = nl; // move to previous
            }

            if (c > 0) {
                let newPeriod = sampleMs * length / c;
                let periodRatio = this.period > 0 ? newPeriod / this.period : 1.0;
                let smoothFactor = (periodRatio > 0.8 && periodRatio < 1.2) ? 0.1 : 0.05;

                this.period = (this.period * (1.0 - smoothFactor)) + (newPeriod * smoothFactor);
            }
        }
        return isABeatResult;
    }
}
class Content {
    notes: string[];
    chord: number[][];
    pattern: number[][];
    loc: string[];
    act: string[];
    sub: string[];
    obj: string[];
    sentences: string[];

    constructor() {
        this.notes = ["#70REYY", "#62MIYY", "#58FAOR", "#52SOHW", "#46LAOR", "#42TIYY", "#39DOWW",
            "#35REYY", "#31MIYY", "#29FAOR", "#26SOHW", "#23LAOR", "#21TIYY", "#20DOWW"];
        this.chord = [[0, 3, 5], [0, 2, 4, 6], [0, 2, 4, 7], [0, 1, 2, 3]];
        this.pattern = [[0, 0, 0, 0], [0, 0, 1], [0, 1, 0], [1, 0, 0], [1, 1], [3]];
        this.loc = ["here", "there", "up", "down", "left", "right", "front", "back", ""];
        this.act = ["liked", "saw", "heard", "felt", ""];
        this.sub = ["I", "He", "She", "They", ""];
        this.obj = ["me", "you", "him", "her", "them", "it", "the dance", "the song", ""];
        this.sentences = ["I am so tired.", "Let's go, go, go!", "Be careful!", "Life lies in motion.",
            "Let's pair up!", "I am stuck!", "New song:", "Easy peasy!", "I like my backpack",
            "I love you", "You are the best!", "yeh!", "woohoo!"];
    }

    // Helper to pick random item from an array
    private choice<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Helper to get random integer between min and max (inclusive)
    private randint(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Composes a procedural song string
     */
    composeSong(): string {
        let song: string[] = [];
        let b = this.notes.length;
        let d = this.choice(this.chord);
        let w = this.choice(this.pattern);
        let k = 0;

        while (k < 16) {
            let l = this.randint(0, b - 1);
            for (let m of w) {
                let n = (l + this.choice(d) + this.choice([-1, 0, 0, 0, 0, 1])) % b;
                if (n < 0) n += b; // Handle negative modulo

                let o = this.notes[n];

                if (m >= 1 && this.randint(0, 8) == 0) {
                    song.push(o);
                    for (let count = 0; count < m; count++) {
                        let innerIdx = (n + this.choice([-1, 0, 1])) % b;
                        if (innerIdx < 0) innerIdx += b;
                        song.push(this.notes[innerIdx]);
                    }
                } else {
                    // Python: n + n[-1] * 4 * j
                    // Appends the last character of the note string repeated (4 * j) times
                    let repeatedChar = o.charAt(o.length - 1);
                    let suffix = "";
                    for (let count2 = 0; count2 < (4 * m); count2++) {
                        suffix += repeatedChar;
                    }
                    song.push(o + suffix);
                }
                k += m + 1;
            }
            d = this.choice(this.chord);
            w = this.choice(this.pattern);
        }
        return song.join("");
    }

    /**
     * Generates a random "cute" sentence
     */
    cuteWords(): string {
        return this.choice(this.sub) + " " +
            this.choice(this.act) + " " +
            this.choice(this.obj) + " " +
            this.choice(this.loc) + ".";
    }
}
class HCSR04 {
    timeoutUS: number;
    trig: DigitalPin;
    echo: DigitalPin;
    private lastCm: number;

    constructor(trigPin: DigitalPin = DigitalPin.P2, echoPin: DigitalPin = DigitalPin.P8) {
        // Default timeout: 30000us (approx 500cm)
        this.timeoutUS = 500 * 2 * 30;
        this.trig = trigPin;
        this.echo = echoPin;
        this.lastCm = -1;

        // Initialize pins
        pins.digitalWritePin(this.trig, 0);
        pins.digitalReadPin(this.echo);
    }

    /**
     * Measures distance in centimeters
     */
    distanceCm(): number {
        // 1. Send 10us pulse to Trigger pin
        pins.digitalWritePin(this.trig, 0);
        control.waitMicros(5);
        pins.digitalWritePin(this.trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(this.trig, 0);

        // 2. Read the pulse width on Echo pin (High pulse)
        // returns duration in microseconds
        let t = pins.pulseIn(this.echo, PulseValue.High, this.timeoutUS);

        // 3. Handle timeout (Python code defaults to 500 if t < 0)
        if (t <= 0) {
            t = 500;
        }

        control.waitMicros(5);

        // 4. Calculate distance: (time * speed of sound / 2)
        // The original multiplier 0.0171821 is (343.64 m/s / 2 / 10000)
        let cm = t * 0.0171821;

        // Min/Max clamp to reduce jitter and outliers
        if (cm < 2) cm = 2;
        if (cm > 400) cm = 400;

        // Simple debouncing/smoothing against the previous reading
        if (this.lastCm < 0) {
            this.lastCm = cm;
        } else {
            let diff = Math.abs(cm - this.lastCm);
            let alpha = diff > 60 ? 0.2 : 0.5;
            this.lastCm = this.lastCm * (1 - alpha) + cm * alpha;
        }

        return this.lastCm;
    }
}
// Configuration Constants

class WK {
    public i2cAddress: number;
    public lastBlinkTS: number;
    private eyeIsOn: boolean;
    private leftEyeBrightness: number;
    private rightEyeBrightness: number;
    private eyeBrightIcr: number;
    private blinkInterval: number;
    public pos: number;
    public numSteps: number;
    private blinkG: number;
    private idle: boolean;
    public currentState: number;
    private autoLeftBlinkEnabled: boolean; // Add auto-blink enable/disable flags
    private autoRightBlinkEnabled: boolean; // Add auto-blink enable/disable flags

    constructor() {
        this.i2cAddress = 16;
        this.lastBlinkTS = 0;
        this.eyeIsOn = true;
        this.leftEyeBrightness = 1023;
        this.rightEyeBrightness = 1023;
        this.eyeBrightIcr = 1;
        this.blinkInterval = 6000;
        this.pos = 0;
        this.numSteps = 0;
        this.blinkG = 4000;
        this.idle = false;
        this.currentState = 0;
        this.autoLeftBlinkEnabled = true; 
        this.autoRightBlinkEnabled = true;
        // I2C is initialized automatically in MakeCode
    }

    /**
     * Control a DC motor. sp: -100 to 100.
     */
    public motor(m: number, sp: number): void {
        if (sp >= -100 && sp <= 100 && m >= 1 && m <= 2) {
            let buf = pins.createBuffer(4);
            buf.setNumber(NumberFormat.UInt8LE, 0, m);
            buf.setNumber(NumberFormat.UInt8LE, 1, 0x01);
            buf.setNumber(NumberFormat.Int8LE, 2, sp); // Signed speed
            buf.setNumber(NumberFormat.UInt8LE, 3, 0);
            pins.i2cWriteBuffer(this.i2cAddress, buf);
        }
    }

    /**
     * Set servo angle (0-180).
     */
    public servo(sr: number, a: number): void {
        if (sr >= 0 && sr <= 7) {
            a = Math.min(180, Math.max(0, Math.floor(a)));
            let reg = (sr == 7) ? 0x10 : sr + 3;
            let buf2 = pins.createBuffer(4);
            buf2.setNumber(NumberFormat.UInt8LE, 0, reg);
            buf2.setNumber(NumberFormat.UInt8LE, 1, a);
            buf2.setNumber(NumberFormat.UInt8LE, 2, 0);
            buf2.setNumber(NumberFormat.UInt8LE, 3, 0);
            pins.i2cWriteBuffer(this.i2cAddress, buf2);
        }
    }

    /**
     * Move servo toward target with controlled speed.
     */
    public servoStep(target: number, sp: number, idx: number, p: Parameters): void {
        sp = Math.abs(sp);
        target = Math.max(0, Math.min(179, target));
        let err = target - p.servoTarget[idx];
        p.servoErr[idx] = err;

        if (Math.abs(err) <= sp) {
            p.servoTarget[idx] = target;
        } else {
            p.servoTarget[idx] += (err >= 0) ? sp : -sp;
        }
        this.servo(idx, p.servoTarget[idx]);
    }

    /**
     * Move all servos immediately to target state.
     */
    public servoMove(idx: number, para: Parameters): void {
        for (let p = 0; p < para.dof; p++) {
            this.servo(p, para.stateTargets[idx][p] + para.servoTrim[p]);
        }
        this.idle = true;
    }

    /**
     * Check if servos reached target.
     */
    public isServoIdle(servoList: number[], p: Parameters): boolean {
        this.idle = servoList.every(i => Math.abs(p.servoErr[i]) < 1);
        return this.idle;
    }

    /**
     * Move robot through state sequences.
     */
    public move(p: Parameters, states: number[], sync_list: number[], sp: number, async_list: number[], async_sp: number): number {
        if (sp == 0) return 0;

        this.pos = Math.min(this.pos, states.length - 1);
        this.currentState = states[this.pos];
        let targets = p.stateTargets[this.currentState];

        let sp_idx = p.stateSpeedIndices[this.currentState] || 1;
        let sps = p.speedCandidates[sp_idx];

        for (let q of sync_list) {
            this.servoStep(targets[q] + p.servoTrim[q] + p.servoCtrl[q], sp * sps[q], q, p);
        }

        for (let r of async_list) {
            this.servoStep(targets[r] + p.servoTrim[r] + p.servoCtrl[r], async_sp * sps[r], r, p);
        }

        if (this.isServoIdle(sync_list, p)) {
            this.pos = (this.pos + 1) % states.length;
            this.numSteps += 1;
            return 0;
        }
        return 1;
    }

    /**
     * Control onboard LED lights.
     */
    public setLight(light: number): void {
        let buf3 = pins.createBuffer(4);
        buf3.setNumber(NumberFormat.UInt8LE, 0, 0x12);
        buf3.setNumber(NumberFormat.UInt8LE, 1, light);
        buf3.setNumber(NumberFormat.UInt8LE, 2, 0);
        buf3.setNumber(NumberFormat.UInt8LE, 3, 0);
        pins.i2cWriteBuffer(this.i2cAddress, buf3);
    }

    /**
     * Eyes ON/OFF control.
     */
    public eyesCtl(c: number): void {
        // Directly control left and right eyes without any judgment
        pins.digitalWritePin(DigitalPin.P12, c);//left eye
        pins.digitalWritePin(DigitalPin.P13, c);//right eye
        this.eyeIsOn = (c == 1);
        this.lastBlinkTS = control.millis();
    }

    /**
     * Left eye brightness (0-1023).
     */
    public leftEyeBright(b: number): void {
        pins.analogWritePin(AnalogPin.P12, b);
        this.leftEyeBrightness = b;
    }

    /**
     * Right eye brightness (0-1023).
     */
    public rightEyeBright(b: number): void {
        pins.analogWritePin(AnalogPin.P13, b);
        this.rightEyeBrightness = b;
    }

    /**
     * Blink animation logic.
     */
    public blink(alert_l: number): void {

        let ts_diff = control.millis() - this.lastBlinkTS;

        if (this.eyeIsOn) {
            if (ts_diff > this.blinkInterval) {
                this.eyesCtl(0);
            } else {
                let brightness = Math.min(1023, alert_l * 102);
                this.blinkG = alert_l * 400;
                if(this.autoLeftBlinkEnabled)
                {
                    this.leftEyeBright(brightness);
                }
                if(this.autoRightBlinkEnabled)
                {
                    this.rightEyeBright(brightness);
                }
            }
        } else {
            if (ts_diff > Math.randomRange(100, 250)) {
                this.eyesCtl(1);
                if (Math.randomRange(0, 4) == 0) {
                    this.blinkInterval = Math.randomRange(100, 250);
                } else {
                    this.blinkInterval = Math.randomRange(this.blinkG, this.blinkG * 2);
                }
            }
        }
    }

    /**
     * Enable or disable auto blink functionality for both eyes.
     */
    public setAutoBlinkEnabled(enabled: boolean): void {
        this.autoLeftBlinkEnabled = enabled;
        this.autoRightBlinkEnabled = enabled;
        // If auto-blink is disabled and eye is off, keep off state
            if (!enabled && !this.eyeIsOn) {
                // Ensure eye stays off
            this.eyesCtl(0);
        }
    }

    /**
     * Enable or disable auto blink functionality for left eye.
     */
    public setAutoLeftBlinkEnabled(enabled: boolean): void {
        this.autoLeftBlinkEnabled = enabled;

        if (!enabled && !this.eyeIsOn) {
            pins.digitalWritePin(DigitalPin.P12, 0); 
        }
    }

    /**
     * Enable or disable auto blink functionality for right eye.
     */
    public setAutoRightBlinkEnabled(enabled: boolean): void {
        this.autoRightBlinkEnabled = enabled;

        if (!enabled && !this.eyeIsOn) {
            pins.digitalWritePin(DigitalPin.P13, 0); 
        }
    }

    /**
     * Pulsing/Flash animation.
     */
    public flash(icr: number = 50): void {
        this.leftEyeBrightness += this.eyeBrightIcr;

        if (this.leftEyeBrightness >= 1023) {
            this.eyeBrightIcr = -icr;
            this.leftEyeBrightness = 1023;
        } else if (this.leftEyeBrightness <= 0) {
            this.eyeBrightIcr = icr;
            this.leftEyeBrightness = 0;
        }

        this.rightEyeBright(1023 - this.leftEyeBrightness);
        this.leftEyeBright(this.leftEyeBrightness);
    }
}

/**
 * RobotPu Class for MakeCode
 * Optimized with internal WK and Parameters instances.
 */

class RobotPu {
    // Component Instances
    public pr: Parameters;
    public wk: WK;
    public sonar: HCSR04;
    public np: neopixel.Strip;
    public content: Content;
    public music: MusicLib;

    // Basic identification
    public name: string;
    public sn: string;
    public gst: number;
    private prevGst: number; // Used for detecting state changes

        // Movement & State
            public lastCmdTS: number;
            public fwdSpeed: number = 4;
            public bwdSpeed: number = -3;
            public walkSpeed: number = 0;
            public walkDirection: number = 0;
            private headPitchBias: number = 0;
            private headYawBias: number = 0;
            private alertLevel: number = 10;
            private alertScale: number = 0.9;
            private restState: number = 26;
            
            // Scheduled execution related properties
            public scheduledAction: number = -1; // Target action for scheduled execution
            public scheduledInterval: number = 3000; // Internal interval parameter (milliseconds)
            public lastScheduledExecTS: number = 0; // Timestamp of last scheduled execution
            public isScheduledRunning: boolean = false; // Whether scheduled execution is running

    // IMU & Balance
    private bodyPitch: number = 0;
    private bodyPitch2: number = 0;
    private bodyRoll: number = 0;
    private bodyRoll2: number = 0;
    private pth: number = 0;
    private rl: number = 0;
    private maxG: number = 1.0;
    private gThreshold: number = 2000;

    // State Tracking
    private fellCount: number = 0;
    private lastState: number = 0;
    private radioGroupID: number = 166;

    // Current dance state (sequence of state indices)
    private danceState: number[] = [0];

    // Predefined dance routines
    private danceDict: { [key: number]: number[] } = {
        14: [0, 15, 15, 0, 3, 5, 3],  // Forward-backward movement
        0: [0, 19, 0, 18, 0, 3],      // Side-to-side movement
        5: [3, 5, 2, 5, 3],           // Quick steps
        16: [17, 16, 17, 16, 17]      // Rocking motion
    };

    private danceSpeed: number = 1.5;           // Dance speed multiplier
    private lastLowBeat: number = 0;       // Timestamp of last low beat
    private lastHIghBeat: number = 0;      // Timestamp of last high beat
    private danceYawWiggle: number = 12;     // Left/right wiggle angle (degrees)
    private dancePitchWiggle: number = 15;     // Up/down wiggle angle (degrees)

    // Balance & Tilt Offsets
    private l_o_t: number = 0;         // Left tilt offset
    private r_o_t: number = 0;         // Right tilt offset
    private maxRollCtrl: number = 15.0; // Max roll control authority

    /** Current exploration speed (calculated by set_explore_param) */
    private exploreSpeed: number = 0.0;

    /** Current exploration direction bias (-1.0 to 1.0) */
    private exploreDirection: number = 0.0;

    /** Index in the ep_dis array representing the clearest path */
    private ep_max_i: number = 0;

    /** Distance threshold: Consider an obstacle "hit" if closer than this (cm) */
    private exploreDangerDistance: number = 7.5;

    /** Tilt offset applied during exploration maneuvers */
    private ep_ot: number = 0;

    /** Far threshold: Begin slowing down or planning turns if obstacle is within this (cm) */
    private exploreCautionDistance: number = 20;

    // Command Dictionary
    public cmdFuncDict: { [key: string]: (v: number) => void };
    // Define the State Dictionary
    private stateFuncDict: { [key: number]: () => void };

    // beacon timeout
    public beaconTimeout: number = 2000;

    constructor(sn: string, name: string = "peu") {
        // Initialize Core Components inside constructor
        this.pr = new Parameters();
        this.wk = new WK();

        this.sn = sn;
        this.name = name;
        this.gst = 0;
        this.prevGst = 0;
        this.lastCmdTS = control.millis();

        // Hardware Setup
        this.sonar = new HCSR04(DigitalPin.P2, DigitalPin.P8);
        this.np = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB);
        this.content = new Content();
        this.music = new MusicLib();

        // Audio & Radio Setup
        radio.setGroup(this.radioGroupID);
        billy.voicePreset(BillyVoicePreset.LittleRobot);
        music.setVolume(255);

        // Initialize Command Dictionary
        this.cmdFuncDict = {
            "#puspeed": (v) => this.speed(v),
            "#puturn": (v) => this.turn(v),
            "#puroll": (v) => this.roll(v),
            "#pupitch": (v) => this.pitch(v),
            "#puB": (v) => this.button(v),
            "#pulogo": (v) => this.logo(v),
            "#purs": (v) => this.pose(v)
        };
        // We use arrow functions () => to ensure 'this' refers to the RobotPu instance
        this.stateFuncDict = {
            [-3]: () => this.fall(),
            [-2]: () => this.fetal(),
            [0]: () => this.idle(),
            [1]: () => this.explore(),
            [2]: () => this.jump(),
            [3]: () => this.dance(),
            [4]: () => this.kick(),
            [5]: () => this.joystick(),
            [6]: () => this.manual(),
            [7]: () => this.continuousMove(),
            [8]: () => this.scheduledExecute() 
        };

        this.wk.eyesCtl(1);
        this.showChannel();
    }

    /**
 * Handles manual movement and stance control from a remote.
 * Ported from joystick() in Python.
 */
    public joystick(): number {
        // 1. If speed is near zero, handle stationary behavior
        if (Math.abs(this.walkSpeed) < 0.1) {
            // Smoothly move the head/body to match bias values
            // Servo 4 is waist/roll, Servo 5 is head/pitch
            this.wk.servoStep(90 + this.headYawBias, 1, 4, this.pr);
            this.wk.servoStep(90 + this.headPitchBias, 1, 5, this.pr);

            // 2. If the turn stick is pushed far left/right while standing, side-step
            if (Math.abs(this.walkDirection) > 0.9) {
                return this.sideStep(this.walkDirection);
            }

            // Otherwise, stay in idle stance
            return this.rest();
        } else {
            // 3. If there is speed, perform the balanced walk
            return this.walk(this.walkSpeed, this.walkDirection);
        }
    }
    
    /**
     * Handles continuous movement behavior. Similar to joystick but updates lastCmdTS continuously.
     */
    public continuousMove(): number {
        this.lastCmdTS = control.millis();
        // 1. If speed is near zero, handle stationary behavior
        if (Math.abs(this.walkSpeed) < 0.1) {
            // Smoothly move the head/body to match bias values
            // Servo 4 is waist/roll, Servo 5 is head/pitch
            this.wk.servoStep(90 + this.headYawBias, 1, 4, this.pr);
            this.wk.servoStep(90 + this.headPitchBias, 1, 5, this.pr);

            // 2. If the turn stick is pushed far left/right while standing, side-step
            if (Math.abs(this.walkDirection) > 0.9) {
                return this.sideStep(this.walkDirection);
            }

            // Otherwise, stay in idle stance
            return this.rest();
        } else {
            // 3. If there is speed, perform the balanced walk
            return this.walk(this.walkSpeed, this.walkDirection);
        }
    }

    /**
 * Executes a side-stepping (lateral) movement.
 * @param di Directional bias: positive for right, negative for left.
 */
    /**
 * Executes a side-stepping movement using specific state indices.
 * @param di Directional bias: positive for right, negative for left.
 */
    public sideStep(di: number): number {
        // 1. Select the gait state sequence based on direction
        // Python: [20, 22, 0, 19] if walkDirection > 0 else [18, 21, 23, 0]
        let sts = di > 0 ? [20, 22, 0, 19] : [18, 21, 23, 0];

        // 2. Reset the Control Vector to neutral
        // This clears any persistent tilt or pitch offsets
        this.setCt([0, 1, 2, 3, 4, 5], [0, 0, 0, 0, 0, 0]);

        // 3. Calculate movement speed based on forward speed multiplier
        let movementSpeed = di * this.fwdSpeed * 0.68;

        // 4. Execute the movement via the WK engine
        // Parameters: states, sync_servos (0-3), sync_speed, async_servos (4-5), async_speed
        return this.wk.move(
            this.pr,
            sts,
            [0, 1, 2, 3],
            movementSpeed,
            [4, 5],
            movementSpeed
        );
    }
    
    /**
     * Executes an in-place turning movement. One foot remains stationary while the other moves.
     * @param di Directional bias: positive for right turn, negative for left turn.
     */
    public turnInPlace(di: number): number {
        // 1. Use the same gait states as walking, but with different control parameters
        let sts = this.pr.walkFwdStates;
        
        // 2. Reset the Control Vector to neutral first
        this.setCt([0, 1, 2, 3, 4, 5], [0, 0, 0, 0, 0, 0]);
        
        // 3. Calculate movement speed for turning (slower than normal walking)
        let movementSpeed = Math.abs(di) * this.fwdSpeed * 0.5;
        
        // 4. Execute the movement via the WK engine with adjusted control
        return this.moveBalance(movementSpeed, di * 2, this.pr.walkFwdStates, this.pr.walkBwdStates);
    }

    public showChannel() {
        // basic.showNumber(this.radioGroupID);
    }

    public talk(text: string) {
        billy.say(text);
    }

    /**
 * Triggers the balanced walking gait.
 * @param sp Speed (positive for forward, negative for backward)
 * @param di Directional bias (-1.0 to 1.0)
 */
    public walk(sp: number, di: number): number {
        return this.moveBalance(sp, di, this.pr.walkFwdStates, this.pr.walkBwdStates);
    }

    /**
     * IMU Balance Calculations using this.pr and this.wk
     */
    private balanceParam() {
        let ax = input.acceleration(Dimension.X);
        let ay = input.acceleration(Dimension.Y);
        let az = input.acceleration(Dimension.Z);

        this.maxG = Math.sqrt(ax * ax + ay * ay + az * az);
        this.pth = Math.atan2(ay, -az) * (180 / Math.PI);
        this.rl = Math.asin(ax / (this.maxG || 1)) * (180 / Math.PI);

        // Use this.pr and this.wk for calculations
        let bd_p = this.pth + (this.pr.stateTargets[0][5] + this.pr.servoTrim[5] - this.pr.servoTarget[5]);
        let servo_lft = (this.pr.servoTarget[4] - this.pr.stateTargets[0][4] - this.pr.servoTrim[4]) * (Math.PI / 180);

        this.bodyRoll = bd_p * Math.sin(servo_lft) + this.rl * Math.cos(servo_lft);
        this.bodyRoll2 = (this.bodyRoll + 9 * this.bodyRoll2) * 0.1;

        this.bodyPitch = bd_p * Math.cos(servo_lft) - this.rl * Math.sin(servo_lft);
        this.bodyPitch2 = (this.bodyPitch + 9 * this.bodyPitch2) * 0.1;
    }

    private setCt(indexList: number[], valueList: number[]) {
        let le = Math.min(indexList.length, valueList.length);
        for (let i = 0; i < le; i++) {
            this.pr.servoCtrl[indexList[i]] = valueList[i]; // Reference internal pr
        }
    }

    public moveBalance(sp: number, di: number, forwardStates: number[], backwardStates: number[]) {
        let sts = sp > 0 ? forwardStates : backwardStates;
        this.balanceParam();

        let l_o_t = 0;
        let r_o_t = 0;
        let lf = 0;

        if (this.wk.pos < 2 || this.wk.pos == 6) { // Reference internal wk
            l_o_t = Math.min(this.maxRollCtrl, Math.max(0.0, this.bodyRoll * 0.8 - this.pr.walkTilt));
            lf = -12 * di;
        } else {
            r_o_t = Math.max(-this.maxRollCtrl, Math.min(0.0, this.bodyRoll * 0.8 + this.pr.walkTilt));
            lf = 12 * di;
        }

        let o_t = l_o_t + r_o_t;
        sp /= 1.0 + 0.01 * (Math.abs(this.bodyRoll) + Math.abs(this.bodyPitch)) + Math.sqrt(Math.abs(o_t * 0.5));

        this.setCt([0, 1, 2, 3, 4, 5],
            [o_t, lf - o_t, o_t, -lf - o_t, -40 * di - o_t, Math.min(25.0, -2.0 * this.bodyPitch2)]);

        // Call internal wk.move
        return this.wk.move(this.pr, sts, [0, 1, 2, 3], sp, [4, 5], sp);
    }

    /**
 * Update robot states based on sensor inputs.
 * Ported from set_states() in Python.
 */
    public updateStates(): void {
        // 1. Fall detection using Accelerometer
        if (input.isGesture(Gesture.FreeFall)) {
            this.gst = -2; // Enter fall state
        }

        // 2. Handle automatic state transitions (Inactivity Timeout)
        if (this.gst > 0) { // If in an active state
            this.alertLevel = 10; // Reset alert level
            // 2-second timeout to return to idle
            if (control.millis() - this.lastCmdTS > this.beaconTimeout) {
                this.walkSpeed = 0;
                this.walkDirection = 0;
                this.wk.pos = 0;
                this.wk.numSteps = 0;
                this.gst = 0;
            }
        }

        // 3. Balance monitoring and recovery logic
        if (this.gst != -2) { // If not in protective fetal position
            // Check tilt thresholds (equivalent to bodyRoll2/bodyPitch2 in Python)
            if (Math.abs(this.bodyRoll2) > 75 || Math.abs(this.bodyPitch2) > 75) {
                this.balanceParam(); // Recalculate IMU data
                this.fellCount++;
                this.wk.numSteps = 0; // Reset step count on fall

                if (this.fellCount > 16) {
                    this.gst = -3; // Enter "Help me" recovery state
                }
            } else {
                this.fellCount = 0;
                // Return to previous state after standing up
                if (this.gst == -3) {
                    this.gst = this.lastState;
                    this.talk("Thanks");
                }
            }
        }
    }

    // Behavior States
    private idle() {
        this.walkSpeed = 0;
        this.walkDirection = 0;
        if (Math.randomRange(0, 100) == 0) this.alertLevel *= this.alertScale;
        this.rest();
    }

    public rest(): number {
        this.balanceParam();
        let rl = Math.min(35.0, Math.max(-35.0, this.bodyRoll2));
        if (Math.abs(rl) > 5) {
            this.setCt([0, 1, 2, 3, 4], [rl, rl * -1.0, rl, rl * -1.0, rl * -0.5]);
        }
        if (Math.abs(this.bodyPitch2) > 12) {
            this.setCt([5], [-this.bodyPitch2]);
        }
        let sl = input.soundLevel();
        this.pr.stateTargets[this.restState][5] = 90 - sl * 0.3;
        return this.wk.move(this.pr, [this.restState], [0, 1, 2, 3, 4, 5], 1 + sl * 0.001, [], 0.5);
    }

    /**
 * Handles the robot's behavior when it has fallen and cannot recover.
 * Ported from fall() in Python.
 */
    public fall(): void {
        // 1. Trigger the "Knight Rider" style eye flash effect
        this.wk.flash();

        // 2. Randomly trigger a voice request for help (approx 1 in 500 cycles)
        if (Math.randomRange(0, 500) == 0) {
            // Use pxt-billy to speak the distress message
            this.talk("Help me stand up!");

            // 3. Publish a status code via radio for remote monitoring
            this.sendStatusCode("E2");
        }
    }

    /**
 * Set the robot to a compact fetal position for protection or power saving.
 * Ported from fetal() in Python.
 */
    public fetal(): void {
        // 1. Trigger the eye pulsing animation
        this.wk.flash();

        // 2. 0.5% chance to shout for help (random.randint(0, 200) == 0)
        if (Math.randomRange(0, 200) == 0) {
            this.talk("Help me!");
        }

        // 3. Move to the Fetal State (Index 1)
        // states: [1], sync_list: all servos [0-5], speed: 2.0, async: none, async_sp: 0.5
        this.wk.move(this.pr, [1], [0, 1, 2, 3, 4, 5], 2.0, [], 0.5);
    }

    /**
 * Manual servo control mode - does nothing to avoid interfering with user servo commands
 */
    public manual(): void {
        this.walkSpeed = 0;
        this.walkDirection = 0;
        this.lastCmdTS = control.millis();
        this.wk.lastBlinkTS = control.millis(); 
        // Do nothing else - this state allows direct servo control without interference
        // from the state machine's automatic movement commands
    }

    /**
 * Publishes a status or error code via radio.
 * @param code The status/error code string (e.g., "E2", "OK", "BATT").
 */
    public sendStatusCode(code: string): void {
        // 1. Construct the message string
        // Python equivalent: f"#puc:{self.sn}:{code}"
        let message = "#puc:" + this.sn + ":" + code;

        // 2. Send the message over the radio
        // This will be received by anything on the same radio group ID
        radio.sendString(message);
    }

    public s_code(code: string): void {
        this.sendStatusCode(code);
    }

    /**
 * Calculates exploration speed and direction based on sonar point-cloud.
 * Ported from set_explore_param() in Python.
 */
    private setExploreParam(): void {
        // 1. Check for obstacles in the "middle" view of the point cloud
        let mid_view = [this.pr.exploreDistance[this.pr.exploreMid1], this.pr.exploreDistance[this.pr.exploreMid2]];
        let obs_hcsr = Math.min(mid_view[0], mid_view[1]);

        let nd = 0; // New Direction variable

        // 2. Decision Logic based on distance thresholds
        if (obs_hcsr < this.exploreDangerDistance + this.exploreCautionDistance) {
            // Path is getting tight: Look only at middle indices for turn direction
            // Python slice [mid1 : mid2+1]
            let slice = this.pr.exploreDistance.slice(this.pr.exploreMid1, this.pr.exploreMid2 + 1);
            nd = this.getTurnFromSonar(slice, 3);
        } else {
            // Path is clear: Look at the whole point cloud for a better direction
            nd = this.getTurnFromSonar(this.pr.exploreDistance, 5);
        }

        // 3. Overall minimum distance check
        obs_hcsr = Math.min(this.pr.exploreDistance[0], Math.min(this.pr.exploreDistance[1], Math.min(this.pr.exploreDistance[2], this.pr.exploreDistance[3])));
        let dis = obs_hcsr - this.exploreDangerDistance;

        // 4. Handle "Stuck" logic (if speed is negative)
        if (this.exploreSpeed < 0) {
            // Turn aggressively to escape the corner
            nd = nd > 0 ? 1 : -1;
            this.exploreDirection = (this.exploreDirection * 9 + nd) * 0.1; // Slow smoothing for escape

            dis -= 12 + Math.randomRange(-5, 0);

            // Low probability to shout for help via radio
            if (Math.randomRange(0, 400) == 0) {
                this.talk(this.content.sentences[5]);
                this.sendStatusCode("W1"); // Send Warning Code 1
            }
        } else {
            // Normal direction smoothing (Low pass filter)
            this.exploreDirection = (this.exploreDirection * 3 + nd) * 0.25;
        }

        // 5. Apply Low-pass filter to Speed
        let target_sp = 0;
        if (dis >= 0) {
            target_sp = Math.min(this.fwdSpeed, (dis + 5));
        } else {
            target_sp = Math.max(this.bwdSpeed, (dis - 5) * 0.6);
        }
        this.exploreSpeed = (this.exploreSpeed + target_sp) * 0.5;
    }

    private set_explore_param(): void {
        this.setExploreParam();
    }

    /**
 * Map sonar distance readings to a steering direction for auto-pilot.
 * @param ep_dis List of sonar distance readings from left to right
 * @param turn_gain Scaling factor for turn intensity (default: 1.5)
 * @returns Steering direction between -1.0 (left) and 1.0 (right)
 */
    public getTurnFromSonar(distances: number[], turnGain: number = 1.5): number {
        // 1. Guard against empty arrays
        if (distances.length == 0) {
            return 0.0;
        }

        // 2. Calculate the total weight (total distance)
        let tw = 0;
        for (let d of distances) {
            tw += d;
        }

        // 3. If everything is zero (no readings), go straight
        if (tw == 0) {
            return 0.0;
        }

        // 4. Calculate Center of Mass (CM)
        let weighted_sum = 0;
        let count = distances.length;

        for (let i = 0; i < count; i++) {
            // Calculate normalized position from -1 (left) to 1 (right)
            // Python: i * 2 / (len(ep_dis) - 1) - 1
            let pos = (count > 1) ? (i * 2 / (count - 1) - 1) : 0;

            // Add weighted position to the sum
            weighted_sum += distances[i] * pos;
        }

        let cm = weighted_sum / tw;

        // 5. Apply turn gain and clamp between -1.0 and 1.0
        let d = cm * turnGain;
        return Math.max(-1.0, Math.min(1.0, d));
    }

    public get_turn_from_sonar(ep_dis: number[], turn_gain: number = 1.5): number {
        return this.getTurnFromSonar(ep_dis, turn_gain);
    }

    /**
 * Autonomous exploration with obstacle point-cloud mapping.
 * Updates the distance array and adjusts movement parameters.
 */
    public explore(): number {
        // 1. Determine which index of the target states (s_tg) to check
        // Python: pr.s_tg[1 if wk.pos < 2 else 3]
        let targetIndex = this.wk.pos < 2 ? 1 : 3;
        let angleValue = this.pr.servoTarget[targetIndex];

        // 2. Map the angle value to a point-cloud index (0-3)
        // Python: 0 if a > 110 else 1 if a > 90 else 2 if a > 70 else 3
        let d_i = angleValue > 110 ? 0 :
            angleValue > 90 ? 1 :
                angleValue > 70 ? 2 : 3;

        // 3. Update the exploration distance array with a rolling average
        // We multiply by 0.5 to give 50% weight to the new sonar reading
        let currentSonar = this.sonar.distanceCm();
        this.pr.exploreDistance[d_i] = (this.pr.exploreDistance[d_i] + currentSonar) * 0.5;

        // 4. Update the exploration speed (exploreSpeed) and direction (exploreDirection)
        this.setExploreParam();

        // 5. Execute the walk using exploration parameters
        return this.walk(this.exploreSpeed, this.exploreDirection);
    }

    /**
 * Executes a specific jumping sequence and manages the auxiliary jump servo.
 * Ported from jump() in Python.
 */
    public jump(): number {
        // 1. Execute the move sequence
        // states: [24, 14, 0, 0]
        // sync_servos (legs): [0, 1, 2, 3] at speed 3
        // async_servos (waist/head): [4, 5] at speed 2
        let md = this.wk.move(
            this.pr,
            [24, 14, 0, 0],
            [0, 1, 2, 3],
            3,
            [4, 5],
            2
        );

        // 2. Check if move completed (md == 0) and gait is at the end (pos == 3)
        if (md == 0 && this.wk.pos == 3) {
            // Transition to Joystick/Manual state
            this.gst = 5;

            // Retract/Reset auxiliary servo 6
            this.wk.servo(6, 0);
        } else {
            // Extend/Activate auxiliary servo 6 during the jump
            this.wk.servo(6, 100);
        }

        return md;
    }

    /**
  * Executes a kick by accelerating the forward walking gait.
  * Returns to joystick mode when the kick completes at specific gait positions.
  */
    public kick(): number {
        // 1. Execute the forward walk states at high speed
        // legs: [0, 1, 2, 3] at speed 3, body/head: [4, 5] at speed 2
        let md = this.wk.move(
            this.pr,
            this.pr.walkFwdStates,
            [0, 1, 2, 3],
            3,
            [4, 5],
            2
        );

        // 2. Check if the movement step is finished (md == 0)
        // and ensure the gait has reached index 0 or 2 (strike positions)
        if (md == 0 && (this.wk.pos == 0 || this.wk.pos == 2)) {
            // Switch back to Joystick/Manual control state
            this.gst = 5;
        }

        return md;
    }

    /**
 * Set the robot to a neutral standing position.
 * Ported from stand() in Python.
 */
    public stand(): number {
        // 1. Execute transition to neutral state (Index 0)
        // states: [0]
        // sync_list: all servos [0, 1, 2, 3, 4, 5]
        // sync_speed: 2.0 (moderate speed)
        // async_list: [] (none)
        // async_speed: 0.5
        return this.wk.move(
            this.pr,
            [0],
            [0, 1, 2, 3, 4, 5],
            2.0,
            [],
            0.5
        );
    }

    /**
 * Monitors sensors to determine if the robot should exit sleep mode.
 * @returns 1 if the robot should wake up, 0 otherwise.
 */
    public checkWakeup(): number {
        // 1. Calculate tilt deltas (current vs filtered)
        let roll_delta = Math.abs(this.bodyRoll - this.bodyRoll2);
        let pitch_delta = Math.abs(this.bodyPitch - this.bodyPitch2);

        // 2. Check for "Wake Up" triggers:
        // - High acceleration (maxG > gThreshold)
        // - Loud sound detected
        // - Sudden tilt change > 20 degrees
        if (this.maxG > this.gThreshold ||
            input.soundLevel() > 128 || // Check if sound level is "loud" (0-255)
            roll_delta > 20 ||
            pitch_delta > 20) {

            this.alertLevel = 10; // Reset alert level to max
            return 1;        // Signal wake up
        }

        // 3. If alert level reaches 0, enter deeper sleep (state -1)
        if (this.alertLevel < 1) {
            this.gst = -1;
        }

        return 0; // Remain asleep
    }

    /**
 * Puts the robot into a low-power standby mode.
 * Ported from sleep() in Python.
 */
    public sleep_mode(): void {
        // 1. Refresh IMU data and return to a neutral standing pose
        this.balanceParam();
        this.stand();

        // 2. Turn off the 5x5 LED matrix eyes
        this.wk.eyesCtl(0);

        // 3. Clear the NeoPixel strip to save battery
        this.np.clear();
        this.np.show();

        // 4. Monitor for wake-up triggers (e.g., sound or touch)
        if (this.checkWakeup() == 1) {
            // Return to Idle/Standby state
            this.gst = 0;
            this.talk("I am awake"); // Optional feedback
        }
    }

    public sleepMode(): void {
        this.sleep_mode();
    }


    public scheduledExecute(): void {
        if (this.scheduledAction === -1 || !this.isScheduledRunning) {
            return;
        }

        const currentTime = control.millis();
        if (currentTime - this.lastScheduledExecTS >= this.scheduledInterval) {
            // 执行定时动作
            switch (this.scheduledAction) {
                case 0: // Greet
                    this.gst = 0; // 先回到空闲状态
                    this.greet();
                    break;
                case 1: // Rest
                    this.gst = 0;
                    this.rest();
                    break;
                case 2: // Explore
                    this.gst = 1;
                    this.explore();
                    break;
                case 3: // Jump
                    this.gst = 2;
                    this.jump();
                    break;
                case 4: // Dance
                    this.gst = 3;
                    this.dance();
                    break;
                case 5: // Kick
                    this.gst = 4;
                    this.kick();
                    break;
                case 6: // WalkRemote
                    this.gst = 5;
                    this.joystick();
                    break;
            }

            this.gst = 8;
            this.lastScheduledExecTS = currentTime;
            this.lastCmdTS = currentTime;
        }
    }


    public startScheduledExecute(action: number): void {
        this.scheduledAction = action;
        this.isScheduledRunning = true;
        this.lastScheduledExecTS = control.millis();
        this.gst = 8; 
        this.lastCmdTS = control.millis();
    }

 
    public stopScheduledExecute(): void {
        this.isScheduledRunning = false;
        this.scheduledAction = -1;
        this.gst = 0; // 回到空闲状态
        this.lastCmdTS = control.millis();
    }

    /**
     * Main state machine for robot behavior control.
     * Processes the current state (gst) and executes the corresponding behavior.
     */
    public stateMachine(): void {
        // 1. Check if state has changed
        if (this.gst !== this.prevGst) {
            // State has changed, reset WK state variables
            this.wk.pos = 0;
            this.wk.numSteps = 0;
            this.prevGst = this.gst;
        }

        // 2. Execute the current state's behavior
        // Python: self.stateFuncDict.get(self.gst, self.sleep)()
        let behavior = this.stateFuncDict[this.gst];

        if (behavior) {
            behavior();
        } else {
            // Fallback to sleep if state index is not found
            this.sleepMode();
        }

        // 3. Handle blinking and state tracking
        if (this.gst >= 0) {
            // Update eye blink animation based on alert level (alertLevel)
            this.wk.blink(this.alertLevel);

            // Remember last normal state for recovery (e.g., after a fall)
            this.lastState = this.gst;
        }
    }
    /**
     * Executes singing logic using the pxt-billy engine.
     * @param s The phonetic or musical string to be synthesized.
     */
    public sing(s: string): void {
        music.play(music.stringPlayable(s, 120), music.PlaybackMode.InBackground)
    }
    /**
     * Makes the robot greet using text-to-speech.
     * The robot will speak its serial number and name.
     */
    public greet(): void {
        // 1. Combine the identification strings
        this.talk("My name is " + this.sn + " " + this.name);
    }

    /**
     * Adjusts the radio group ID and updates the hardware settings.
     * @param i The amount to adjust the group ID by (positive or negative).
     */
    public incrGroupId(i: number): void {
      this.setGroupId(this.radioGroupID + i);
    }

     /**
     * Set the radio group ID and updates the hardware settings.
     * @param channel The channel to set the radio group ID to.
     */
    public setGroupId(channel: number): void {
        // 1. Calculate the new group ID with 0-255 wrapping logic
        this.radioGroupID = (channel) % 256;

        // 2. Handle negative results from the modulo (JavaScript specific)
        if (this.radioGroupID < 0) {
            this.radioGroupID += 256;
        }

        // 3. Update the native radio hardware group
        radio.setGroup(this.radioGroupID);

        // 4. Update the 5x5 LED display to show the new channel
        this.showChannel();
    }

    /**
     * Returns the current radio group/channel (0..255).
     */
    public getGroupId(): number {
        return this.radioGroupID;
    }

    /**
     * Returns the forward max speed scalar.
     */
    public getFwdMaxSpeed(): number {
        return this.fwdSpeed;
    }

    /**
     * Sets the forward max speed scalar.
     */
    public setFwdMaxSpeed(v: number): void {
        this.fwdSpeed = v;
    }

    /**
     * Returns the backward max speed scalar.
     */
    public getBwdMaxSpeed(): number {
        return this.bwdSpeed;
    }

    /**
     * Sets the backward max speed scalar.
     */
    public setBwdMaxSpeed(v: number): void {
        this.bwdSpeed = v;
    }

    public getBodyRoll(): number {
        return this.bodyRoll;
    }

    public getBodyPitch(): number {
        return this.bodyPitch;
    }

    public getMusicTempo(): number {
        const p = this.music.period;
        if (p <= 0) return 0;
        return 60000 / p;
    }
    /**
 * Generates a random LED light show on the robot's NeoPixel strip.
 * Ported from random_light() in Python.
 */
    private randomLight(): void {
        // 1. Loop through the 4 pixels on the robot's strip
        for (let p = 0; p < 4; p++) {
            // 2. Generate random RGB values (0-128 for moderate brightness)
            let red = Math.randomRange(0, 128);
            let green = Math.randomRange(0, 128);
            let blue = Math.randomRange(0, 128);

            // 3. Set the color for the specific pixel
            // Use neopixel.rgb to combine the values into a single color object
            this.np.setPixelColor(p, neopixel.rgb(red, green, blue));
        }

        // 4. Push the updated colors to the hardware
        this.np.show();
    }
    /**
 * Makes the robot dance with self-balance based on sound analysis.
 */
    public dance(): number {
        let ts = control.millis();
        let ms = input.soundLevel();

        // 1. Check for a musical beat using the MusicLib helper
        let il = this.music.isABeat(ts, ms, 1.1);

        // 2. High-beat logic: Pulse LEDs and flip wiggle direction
        if (ts - this.lastHIghBeat > this.music.period * 0.5) {
            this.danceYawWiggle *= -1;
            this.dancePitchWiggle *= -1;
            this.randomLight(); // Trigger NeoPixel animation
            this.lastHIghBeat = ts;
        }

        // 3. Low-beat logic: Change the dance move routine
        if (il && (ts - this.lastLowBeat > this.music.period * Math.randomRange(8, 16))) {
            // Pick a new move from the approved dance state list
            this.danceState = [this.pr.danceOkStates[Math.randomRange(0, this.pr.danceOkStates.length - 1)]];
            this.lastLowBeat = ts;
        }

        // 4. Balance and tilt compensation
        this.balanceParam();
        let ft = Math.min(12.0, Math.max(-12.0, this.rl * 0.8 + this.danceYawWiggle * 0.2));
        if (Math.abs(ft) < 8) {
            ft = 0;
        }
        let lt = ft + this.danceYawWiggle;

        // 5. Apply control vectors to servos
        // Servo 5 (head/body pitch) reacts to sound volume
        this.setCt([0, 1, 2, 3, 4, 5],
            [ft, lt, ft, lt, this.rl, this.dancePitchWiggle - ms * 0.001]);

        // 6. Dynamic speed adjustment
        this.danceSpeed = Math.min(2.5, this.danceSpeed * 1.015);
        if (this.maxG > 1800) { // If shaking too hard, slow down
            this.danceSpeed *= 0.9;
        }

        // 7. Execute the movement via the WK instance
        return this.wk.move(this.pr, this.danceState, [0, 1, 2, 3], this.danceSpeed, [4, 5], this.danceSpeed);
    }

    // Command Handlers
    public speed(v: number) {
        if (v > 0.2) {
            this.walkSpeed = v * this.fwdSpeed;
            this.gst = 5;
        } else if (v < -0.2) {
            this.walkSpeed = -v * this.bwdSpeed;
            this.gst = 5;
        } else {
            this.walkSpeed = 0;
        }
    }
    public turn(v: number) { this.walkDirection = (this.walkDirection * 4 + v) * 0.2; }
    public roll(v: number) { this.headYawBias = (v + this.headYawBias) * 0.5; }
    public pitch(v: number) { this.headPitchBias = (v * -1 + this.headPitchBias) * 0.5; }
    public button(v: number) { this.gst = v; }
    public logo(v: number) { this.talk(this.sn); }
    public pose(v: number) { this.restState = v; this.gst = 0; }

    public setTrim(leftFoot: number, leftLeg: number, rightFoot: number, rightLeg: number, headYaw: number, headPitch: number) {
        this.pr.servoTrim = [leftFoot, leftLeg, rightFoot, rightLeg, headYaw, headPitch];
    }

    /**
     * Set target angles for all servos directly.
     * @param leftFoot Target angle for left foot servo (0-180)
     * @param leftLeg Target angle for left leg servo (0-180)
     * @param rightFoot Target angle for right foot servo (0-180)
     * @param rightLeg Target angle for right leg servo (0-180)
     * @param headOffset Target angle for head offset servo (0-180)
     * @param headPitch Target angle for head pitch servo (0-180)
     */
    public setServoTargets(leftFoot: number, leftLeg: number, rightFoot: number, rightLeg: number, headOffset: number, headPitch: number): void {
        // Validate and clamp angles
        const angles = [
            Math.min(180, Math.max(0, Math.floor(leftFoot))),
            Math.min(180, Math.max(0, Math.floor(leftLeg))),
            Math.min(180, Math.max(0, Math.floor(rightFoot))),
            Math.min(180, Math.max(0, Math.floor(rightLeg))),
            Math.min(180, Math.max(0, Math.floor(headOffset))),
            Math.min(180, Math.max(0, Math.floor(headPitch)))
        ];
        
        // Switch to manual mode to prevent state machine interference
        this.gst = 6; // 6 is manual mode index
        this.lastCmdTS = control.millis(); // Update command timestamp
        
        // Update target positions and set servos
        for (let i = 0; i < angles.length; i++) {
            this.pr.servoTarget[i] = angles[i];
            this.wk.servo(i, angles[i]);
        }
    }

    public calibrate() {
        /**
         * Run the robot's calibration routine.
         */
        // 1. Move to calibration position
        this.wk.servoMove(25, this.pr);

        // 2. Flashes the eyes three times for visual feedback
        for (let i = 0; i < 3; i++) {
            this.wk.flash(1020);  // Bright flash
            basic.pause(500); // In MakeCode, sleep(500) is basic.pause(500)
        }

        // 3. Turn eyes on and return to neutral position
        this.wk.eyesCtl(1);
        this.wk.servoMove(0, this.pr);
        basic.pause(2000);
    }

    public runKeyValueCommand(key: string, v: number) {
        this.runKeyValueCMD(key, v);
    }

    public runKeyValueCMD(key: string, v: number) {
        this.lastCmdTS = control.millis();
        this.beaconTimeout = 2000;

        // 3. Look up the function in the dictionary
        let action = this.cmdFuncDict[key];

        // 4. If the function exists, execute it (the "noop" equivalent)
        if (action) {
            action(v)
        }
    }

    public runStringCommand(s: string) {
        this.runStrCMD(s);
    }

    public runStrCMD(s: string) {
        // 1. Update the timestamp of the last received command
        this.lastCmdTS = control.millis()

        // 2. Process #put: Text-to-Speech
        if (s.substr(0, 4) == "#put") {
            this.talk(s.substr(4));
        }

        // 3. Process #pus: Buffered Singing (6 segments)
        else if (s.substr(0, 4) == "#pus") {
            // Assume s_list is an array of strings defined in the class
            this.sing(s.substr(4));
        }

        // 4. Process #puhi: Greeting
        else if (s.substr(0, 5) == "#puhi") {
            this.talk("My friend " + s.substr(5) + " is here")
            this.sendStatusCode("ACK")
        }

        // 5. Process #pun: Name/Serial Update
        else if (s.substr(0, 4) == "#pun") {
            this.sn = s.substr(4);
            this.greet();
        }
    }
}
