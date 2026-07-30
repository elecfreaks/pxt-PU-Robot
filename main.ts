//% color=#e7660b icon="\uf2bd"
//block="robot PU" blockId="robotPu"
namespace robotPu {
    let robot: RobotPu;
    const TEXT_MESSAGE_PREFIX = "#pumsg";

    function ensureRobot(): RobotPu {
        if (!robot) {
            const sn = "pu-" + control.deviceSerialNumber();
            robot = new RobotPu(sn, "peu");
            robot.calibrate();
            control.inBackground(function () {
                while (true) {
                    robot.updateStates();
                    robot.stateMachine();
                    basic.pause(5);
                }
            });
        }
        return robot;
    }
    
    
    export enum DistanceUnit {
        //% block="cm"
        Centimeters,
        //% block="inch"
        Inches
    }

    export enum LightSelection {
        //% block="1"
        Light1,
        //% block="2"
        Light2,
        //% block="3"
        Light3,
        //% block="4"
        Light4,
        //% block="all"
        All
    }

    export enum EyeState {
        //% block="off"
        Off,
        //% block="on"
        On
    }

    export enum Action {
        //% block="greet"
        Greet,
        //% block="rest"
        Rest,
        //% block="explore"
        Explore,
        //% block="jump"
        Jump,
        //% block="dance"
        Dance,
        //% block="kick"
        Kick
    }

    export enum MoveDirection {
        //% block="forward"
        Forward,
        //% block="backward"
        Backward,
        //% block="side left"
        SideLeft,
        //% block="side right"
        SideRight,
        //% block="left turn"
        LeftTurn,
        //% block="right turn"
        RightTurn
    }

    export enum TurnDirection {
        //% block="left"
        Left,
        //% block="straight"
        Straight,
        //% block="right"
        Right
    }

    export enum ServoJoint {
        //% block="left foot"
        LeftFoot,
        //% block="left leg"
        LeftLeg,
        //% block="right foot"
        RightFoot,
        //% block="right leg"
        RightLeg,
        //% block="head offset"
        HeadOffset,
        //% block="head pitch"
        HeadPitch
    }
    /**
     * Set trim offsets for the main PU Robot servos.
     * @param leftFoot trim offset for the left foot servo, in degrees
     * @param leftLeg trim offset for the left leg servo, in degrees
     * @param rightFoot trim offset for the right foot servo, in degrees
     * @param rightLeg trim offset for the right leg servo, in degrees
     * @param headYaw trim offset for the head yaw servo, in degrees
     * @param headPitch trim offset for the head pitch servo, in degrees
     */
    //% blockId=robotpu_setServoTrim block="set servo trim left foot %leftFoot left leg %leftLeg right foot %rightFoot right leg %rightLeg head yaw %headYaw head pitch %headPitch"
    //% subcategory="Setup"
    //% group="Setup"
    //% help=github:pxt-robotpu/docs/setup
    //% leftFoot.defl=0 leftLeg.defl=0 rightFoot.defl=0 rightLeg.defl=0 headYaw.defl=0 headPitch.defl=0
    //% weight=80 blockGap=8
    export function setServoTrim(leftFoot: number, leftLeg: number, rightFoot: number, rightLeg: number, headYaw: number, headPitch: number): void {
        ensureRobot().setTrim(leftFoot, leftLeg, rightFoot, rightLeg, headYaw, headPitch);
    }

    /**
     * Configure the maximum walking speed for forward and backward movement.
     * @param forward maximum forward speed level, from 0 to 4
     * @param backward maximum backward speed level, from 0 to 3
     */
    //% group="Setup"
    //% block="set walk speed range forward %forward backward %backward"
    //% help=github:pxt-robotpu/docs/setup
    //% forward.min=0 forward.max=4 forward.defl=2
    //% backward.min=0 backward.max=3 backward.defl=2
    //% weight=79 blockGap=8
    export function setWalkSpeedRange(forward: number, backward: number): void {
        const robot = ensureRobot();
        robot.setFwdMaxSpeed(forward);
        robot.setBwdMaxSpeed(-backward); // Note: backward speed is stored as negative value internally
    }

    /**
     * Read the ultrasonic distance with a selectable unit.
     * @param unit distance unit to return, either centimeters or inches
     */
    //% group="Sensors"
    //% block="ultrasonic sensor distance in %unit"
    //% help=github:pxt-robotpu/docs/sensors
    //% weight=70 blockGap=8
    export function ultrasonicDistance(unit: DistanceUnit): number {
        const robot = ensureRobot();
        const distanceCm = robot.sonar.distanceCm();
        
        if (unit === DistanceUnit.Centimeters) {
            return distanceCm;
        } else {
            // Convert to inches (1 inch ~= 2.54 cm)
            return distanceCm / 2.54;
        }
    }

    /**
     * Get body roll. Returns the current roll angle of the robot body.
     */
    //% group="Sensors"
    //% block="body roll"
    //% help=github:pxt-robotpu/docs/sensors
    //% weight=69 blockGap=8
    export function bodyRoll(): number {
        return ensureRobot().getBodyRoll();
    }

    /**
     * Get body pitch. Returns the current pitch angle of the robot body.
     */
    //% group="Sensors"
    //% block="body pitch"
    //% help=github:pxt-robotpu/docs/sensors
    //% weight=68 blockGap=8
    export function bodyPitch(): number {
        return ensureRobot().getBodyPitch();
    }

    /**
     * Get music tempo. Returns the current music tempo in beats per minute (BPM).
     */
    //% group="Sensors"
    //% block="music tempo"
    //% help=github:pxt-robotpu/docs/sensors
    //% weight=67 blockGap=8
    export function musicTempo(): number {
        return ensureRobot().getMusicTempo();
    }

    /**
     * Get front distance array. Returns an array of 5 distance values from the front sensors.
     */
    //% group="Sensors"
    //% block="front distance array"
    //% help=github:pxt-robotpu/docs/sensors
    //% weight=66 blockGap=8
    export function frontDistanceArray(): number[] {
        const d = ensureRobot().pr.exploreDistance;
        return [d[0], d[1], (d[1]+d[2])*0.5, d[2], d[3]];
    }

    /**
     * Set one ambience light, or all ambience lights, to an RGB color.
     * @param light ambience light to control
     * @param r red value from 0 to 255
     * @param g green value from 0 to 255
     * @param b blue value from 0 to 255
     */
    //% group="Actuators"
    //% block="set ambience light %light to RGB (%r, %g, %b)"
    //% help=github:pxt-robotpu/docs/actuators
    //% r.min=0 r.max=255 r.defl=255
    //% g.min=0 g.max=255 g.defl=255
    //% b.min=0 b.max=255 b.defl=255
    //% weight=65 blockGap=8
    //% inlineInputMode=inline
    export function setAmbienceLight(light: LightSelection, r: number, g: number, b: number): void {
        const robot = ensureRobot();
        
        // Ensure RGB values are within 0-255 range
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));
        
        const color = neopixel.rgb(r, g, b);
        
        switch (light) {
            case LightSelection.Light1:
                robot.np.setPixelColor(0, color);
                break;
            case LightSelection.Light2:
                robot.np.setPixelColor(1, color);
                break;
            case LightSelection.Light3:
                robot.np.setPixelColor(2, color);
                break;
            case LightSelection.Light4:
                robot.np.setPixelColor(3, color);
                break;
            case LightSelection.All:
                for (let i = 0; i < 4; i++) {
                    robot.np.setPixelColor(i, color);
                }
                break;
        }
        
        robot.np.show();
    }

    /**
     * Turn the left and right eye LEDs on or off.
     * @param leftEye desired state for the left eye
     * @param rightEye desired state for the right eye
     */
    //% group="Actuators"
    //% block="set left eye %leftEye right eye %rightEye"
    //% help=github:pxt-robotpu/docs/actuators
    //% leftEye.defl=robotPu.EyeState.On rightEye.defl=robotPu.EyeState.On
    //% weight=64 blockGap=8
    export function setEyesState(leftEye: EyeState, rightEye: EyeState): void {
        const robot = ensureRobot();
        // Disable auto-blink feature to prevent state machine interference with manual settings
        robot.wk.setAutoBlinkEnabled(false);
        robot.gst = 6; // 6 is the index for manual mode
        robot.lastCmdTS = control.millis(); // Update command timestamp
        robot.wk.lastBlinkTS = control.millis(); // Update blink timestamp
       
        const leftValue = leftEye === EyeState.On ? 1023 : 0;
        const rightValue = rightEye === EyeState.On ? 1023 : 0;
        
        robot.wk.leftEyeBright(leftValue);
        robot.wk.rightEyeBright(rightValue);
    }

    /**
     * Adjust the brightness of the left eye LED.
     * @param brightness brightness percentage from 0 to 100
     */
    //% group="Actuators"
    //% block="set left eye brightness %brightness"
    //% help=github:pxt-robotpu/docs/actuators
    //% brightness.min=0 brightness.max=100 brightness.defl=50
    //% weight=63 blockGap=8
    export function setLeftEyeBrightness(brightness: number): void {
        const robot = ensureRobot();
        robot.wk.setAutoBlinkEnabled(false);
        robot.gst = 6; // 6 is the index for manual mode
        robot.lastCmdTS = control.millis(); // Update command timestamp
        robot.wk.lastBlinkTS = control.millis(); // Update blink timestamp
       
        // Convert 0-100 brightness range to 0-1023 PWM value
        const pwmValue = Math.max(0, Math.min(1023, Math.floor(brightness * 10.23)));
        robot.wk.leftEyeBright(pwmValue);
    }

    /**
     * Adjust the brightness of the right eye LED.
     * @param brightness brightness percentage from 0 to 100
     */
    //% group="Actuators"
    //% block="set right eye brightness %brightness"
    //% help=github:pxt-robotpu/docs/actuators
    //% brightness.min=0 brightness.max=100 brightness.defl=50
    //% weight=62 blockGap=8
    export function setRightEyeBrightness(brightness: number): void {
        const robot = ensureRobot();
        robot.wk.setAutoBlinkEnabled(false);
        robot.gst = 6; // 6 is the index for manual mode
        robot.lastCmdTS = control.millis(); // Update command timestamp
        robot.wk.lastBlinkTS = control.millis(); // Update blink timestamp
        
        // Convert 0-100 brightness range to 0-1023 PWM value
        const pwmValue = Math.max(0, Math.min(1023, Math.floor(brightness * 10.23)));
        robot.wk.rightEyeBright(pwmValue);
    }

    /**
     * Run one of the built-in robot actions.
     * @param action action mode to start
     */
    //% group="Actions"
    //% block="set mode %action"
    //% help=github:pxt-robotpu/docs/actions
    //% weight=55 blockGap=8
    export function executeAction(action: Action): void {
        const robot = ensureRobot();
        robot.scheduledInterval = 0;
        robot.startScheduledExecute(action);
    }

    /**
     * Exit loop - stop timed execution.
     */
    //% group="Actions"
    //% block="stop action"
    //% help=github:pxt-robotpu/docs/actions
    //% weight=51 blockGap=8
    export function exitLoop(): void {
        const robot = ensureRobot();
        robot.stopScheduledExecute();
    }

    /**
     * Set the robot movement direction for continuous walking.
     * @param direction movement direction to use
     */
    //% group="Actions"
    //% block="set robot move direction %direction"
    //% help=github:pxt-robotpu/docs/actions
    //% weight=54 blockGap=8
    export function setMoveDirection(direction: MoveDirection): void {
        const robot = ensureRobot();
        
        // Set movement direction and speed
        switch (direction) {
            case MoveDirection.Forward:
                robot.walkSpeed = robot.fwdSpeed; // Use forward max speed
                robot.walkDirection = 0; // Straight
                break;
            case MoveDirection.Backward:
                robot.walkSpeed = robot.bwdSpeed; // Use backward max speed
                robot.walkDirection = 0; // Straight
                break;
            case MoveDirection.SideLeft:
                robot.walkSpeed = 0; // Stop forward/backward
                robot.walkDirection = -1; // Left side step
                break;
            case MoveDirection.SideRight:
                robot.walkSpeed = 0; // Stop forward/backward
                robot.walkDirection = 1; // Right side step
                break;
            case MoveDirection.LeftTurn:
                robot.walkSpeed = robot.fwdSpeed * 0.5; // Use slower speed
                robot.walkDirection = -1; // Left turn
                break;
            case MoveDirection.RightTurn:
                robot.walkSpeed = robot.fwdSpeed * 0.5; // Use slower speed
                robot.walkDirection = 1; // Right turn
                break;
        }
        
        // Reset the motion state so the new movement command starts cleanly.
        robot.gst = 7;
        // Refresh the command timestamp so the state machine keeps running this command.
        robot.lastCmdTS = control.millis();
    }

    function doCompletions(run: () => number, completions: number): void {
        let done = 0
        while (done < completions) {
        const rc = run() // Call the passed function
        if (rc == 0) done += 1 // Increment completion count each time 0 is returned
        }
    }

    /**
     * Walk a fixed number of steps in the selected direction.
     * @param direction walking direction to use
     * @param steps number of steps to complete
     * @param speed speed level from 1 to 10
     */
    //% group="Actions"
    //% block="walk %direction for %steps steps at speed %speed"
    //% help=github:pxt-robotpu/docs/actions
    //% steps.min=1 steps.max=100 steps.defl=5
    //% speed.min=1 speed.max=10 speed.defl=5
    //% direction.defl=robotPu.MoveDirection.Forward
    //% weight=53 blockGap=8
    export function setWalkSpeed(direction: MoveDirection, steps: number, speed: number): void {
        const robot = ensureRobot();
        
        // Map speed from 1-10 to appropriate range
        const normalizedSpeed = Math.max(0.1, Math.min(1, speed / 10));
        
        // Call appropriate robot movement method based on direction
        switch (direction) {
            case MoveDirection.Forward:
                // Forward walk: use user-specified speed, straight
                doCompletions(() => {
                    const currentSpeed = 2 * normalizedSpeed;
                    return robot.walk(currentSpeed, 0);
                }, steps * 2);
                break;
            case MoveDirection.Backward:
                // Backward walk: use user-specified speed, straight
                doCompletions(() => {
                    const currentSpeed = 2 * normalizedSpeed;
                    return robot.walk(currentSpeed, 0);
                }, steps * 2);
                break;
            case MoveDirection.SideLeft:
                // Left side step: negative direction, use user-specified speed
                doCompletions(() => robot.sideStep(-normalizedSpeed * 0.2), steps * 2);
                break;
            case MoveDirection.SideRight:
                // Right side step: positive direction, use user-specified speed
                doCompletions(() => robot.sideStep(normalizedSpeed * 0.2), steps * 2);
                break;
        }
    }

    /**
     * Move one servo directly to an angle.
     * @param joint servo joint to move
     * @param angle target angle from 0 to 180 degrees
     */
    //% group="Actions"
    //% block="set %joint servo to %angle"
    //% help=github:pxt-robotpu/docs/actions
    //% angle.min=0 angle.max=180 angle.defl=90
    //% weight=65 blockGap=8
    export function setServoAngle(joint: ServoJoint, angle: number): void {
        const robot = ensureRobot();
        
        // Convert joint type to internal index
        const jointIndex = getServoIndex(joint);
        if (jointIndex >= 0) {
            angle = Math.min(180, Math.max(0, Math.floor(angle)));
            // Switch to manual mode to prevent state machine interference
            robot.gst = 6; // 6 is the index for manual mode
            robot.lastCmdTS = control.millis(); // Update command timestamp
            robot.pr.servoTarget[jointIndex] = angle; // Update target position
            robot.wk.servo(jointIndex, angle); // Directly set servo angle
        }
    }

    /**
     * Smoothly move one servo to an angle in small steps.
     * @param joint servo joint to move
     * @param angle target angle from 0 to 180 degrees
     * @param step angle change per update, from 1 to 20 degrees
     */
    //% group="Actions"
    //% block="smooth move %joint servo to %angle with step %step"
    //% help=github:pxt-robotpu/docs/actions
    //% angle.min=0 angle.max=180 angle.defl=90
    //% step.min=1 step.max=20 step.defl=2
    //% weight=64 blockGap=8
    export function smoothSetServoAngle(joint: ServoJoint, angle: number, step: number): void {
        const robot = ensureRobot();
        
        // Convert joint type to internal index
        const jointIndex = getServoIndex(joint);
        // Switch to manual mode to prevent state machine interference
        robot.gst = 6; // 6 is the index for manual mode
        robot.lastCmdTS = control.millis(); // Update command timestamp
        
        // Use control loop to continuously call servoStep until target angle is reached
        control.inBackground(function () {
            while (true) {
                robot.wk.servoStep(angle, step, jointIndex, robot.pr);
                // Check if target angle has been reached
                if (Math.abs(angle - robot.pr.servoTarget[jointIndex]) <= step) {
                    break;
                }
                // Short delay to control update frequency
                control.waitMicros(50000); // 50ms
            }
        });
    }

    /**
     * Helper function to convert ServoJoint enum to internal index
     */
    function getServoIndex(joint: ServoJoint): number {
        switch (joint) {
            case ServoJoint.LeftFoot:
                return 0;
            case ServoJoint.LeftLeg:
                return 1;
            case ServoJoint.RightFoot:
                return 2;
            case ServoJoint.RightLeg:
                return 3;
            case ServoJoint.HeadOffset:
                return 4;
            case ServoJoint.HeadPitch:
                return 5;
            default:
                return -1;
        }
    }

    // ========== Controller-side blocks ==========

    let controllerRadioGroup: number = 160;

    /**
     * Set the radio group used by the handheld controller.
     * @param group radio group number from 0 to 255
     */
    //% group="Controller"
    //% block="set controller radio group %group"
    //% help=github:pxt-robotpu/docs/controller
    //% group.min=0 group.max=255 group.defl=160
    //% weight=40 blockGap=8
    export function setControllerRadioGroup(group: number): void {
        controllerRadioGroup = Math.max(0, Math.min(255, Math.floor(group)));
        radio.setGroup(controllerRadioGroup);
        initControllerButtons();
        basic.showNumber(controllerRadioGroup);
    }

    export enum JoystickAxis {
        //% block="turn"
        Turn,
        //% block="speed"
        Speed
    }

    /**
     * Read the joystick value for one axis.
     * @param axis joystick axis to read
     */
    //% group="Controller"
    //% block="read joystick value %axis"
    //% help=github:pxt-robotpu/docs/controller
    //% weight=39 blockGap=8
    export function readJoystickValue(axis: JoystickAxis): number {
        if (axis == JoystickAxis.Turn) {
            return (512 - pins.analogReadPin(AnalogPin.P2)) / 512;
        } else {
            return (512 - pins.analogReadPin(AnalogPin.P1)) / 512;
        }
    }

    /**
     * Initialize controller buttons. Set up the pull-up resistors for all controller buttons.
     */
    //% group="Controller"
    //% block="initialize controller buttons"
    //% help=github:pxt-robotpu/docs/controller
    //% weight=38 blockGap=8
    export function initControllerButtons(): void {
        pins.setPull(DigitalPin.P8, PinPullMode.PullUp);
        pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
        pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
        pins.setPull(DigitalPin.P15, PinPullMode.PullUp);
        pins.setPull(DigitalPin.P16, PinPullMode.PullUp);
    }

    export enum ControllerButton {
        //% block="joystick press"
        JoystickPress,
        //% block="B1"
        B1,
        //% block="B2"
        B2,
        //% block="B3"
        B3,
        //% block="B4"
        B4
    }

    /**
     * Check whether a controller button is currently pressed.
     * @param button controller button to test
     */
    //% group="Controller"
    //% block="%button pressed"
    //% help=github:pxt-robotpu/docs/controller
    //% weight=37 blockGap=8
    export function getControllerButtonPressed(button: ControllerButton): boolean {
        let pin: DigitalPin;
        switch (button) {
            case ControllerButton.JoystickPress:
                pin = DigitalPin.P8;
                break;
            case ControllerButton.B1:
                pin = DigitalPin.P13;
                break;
            case ControllerButton.B2:
                pin = DigitalPin.P14;
                break;
            case ControllerButton.B3:
                pin = DigitalPin.P15;
                break;
            case ControllerButton.B4:
                pin = DigitalPin.P16;
                break;
            default:
                return false;
        }
        return pins.digitalReadPin(pin) == 0;
    }

    export enum SendControlType {
        //% block="turn"
        Turn,
        //% block="speed"
        Speed,
        //% block="pitch"
        Pitch,
        //% block="roll"
        Roll,
        //% block="button"
        Button
    }

    /**
     * Send one numeric control value to the robot over radio.
     * @param type control channel to send
     * @param value value to send, usually in the range -1 to 1
     */
    //% group="Controller"
    //% block="send %type value %value"
    //% help=github:pxt-robotpu/docs/controller
    //% value.min=-1 value.max=1 value.defl=0
    //% weight=36 blockGap=8
    export function sendControlValue(type: SendControlType, value: number): void {
        switch (type) {
            case SendControlType.Turn:
                radio.sendValue("#puturn", value);
                break;
            case SendControlType.Speed:
                radio.sendValue("#puspeed", value);
                break;
            case SendControlType.Pitch:
                radio.sendValue("#pupitch", value);
                break;
            case SendControlType.Roll:
                radio.sendValue("#puroll", value);
                break;
            case SendControlType.Button:
                radio.sendValue("#puB", value);
                break;
        }
    }

    /**
     * Send a text message to the robot over radio.
     * @param text message text to send
     */
    //% group="Controller"
    //% block="send text message %text"
    //% help=github:pxt-robotpu/docs/controller
    //% text.shadow=text
    //% weight=35 blockGap=8
    export function sendTextMessage(text: string): void {
        radio.sendString(TEXT_MESSAGE_PREFIX + text);
    }

    // ========== Receiver-side blocks ==========

    let remoteControlEnabled: boolean = false;
    let currentTurnValue: number = 0;
    let currentSpeedValue: number = 0;
    let currentButtonValue: number = 0;
    let currentTextMessage: string = "";
    let currentPitchValue: number = 0;
    let currentRollValue: number = 0;
    let onTurnValueHandler: (value: number) => void = null;
    let onSpeedValueHandler: (value: number) => void = null;
    let onButtonCommandHandler: (button: number) => void = null;
    let onTextMessageHandler: (text: string) => void = null;
    let onPitchValueHandler: (value: number) => void = null;
    let onRollValueHandler: (value: number) => void = null;

    /**
     * Enable remote control on the robot and set its radio group.
     * @param group radio group number from 0 to 255
     */
    //% group="Receiver"
    //% subcategory="Remote Control"
    //% block="enable remote control on group %group"
    //% help=github:pxt-robotpu/docs/receiver
    //% group.min=0 group.max=255 group.defl=160
    //% weight=30 blockGap=8
    export function enableRemoteControlWithGroup(group: number): void {
        const robot = ensureRobot();
        remoteControlEnabled = true;
        robot.setGroupId(group);
        robot.gst = 5;
        
        radio.onReceivedValue(function (name: string, value: number) {
            if (!remoteControlEnabled) return;
            
            if (name == "#puturn") {
                currentTurnValue = value;
                if (onTurnValueHandler) {
                    onTurnValueHandler(value);
                }
            } else if (name == "#puspeed") {
                currentSpeedValue = value;
                if (onSpeedValueHandler) {
                    onSpeedValueHandler(value);
                }
            } else if (name == "#puB") {
                currentButtonValue = value;
                if (onButtonCommandHandler) {
                    onButtonCommandHandler(value);
                }
            } else if (name == "#pupitch") {
                currentPitchValue = value;
                if (onPitchValueHandler) {
                    onPitchValueHandler(value);
                }
            } else if (name == "#puroll") {
                currentRollValue = value;
                if (onRollValueHandler) {
                    onRollValueHandler(value);
                }
            }
        });
        
        radio.onReceivedString(function (receivedString: string) {
            if (!remoteControlEnabled) return;
            
            if (receivedString.substr(0, TEXT_MESSAGE_PREFIX.length) == TEXT_MESSAGE_PREFIX) {
                currentTextMessage = receivedString.substr(TEXT_MESSAGE_PREFIX.length);
                if (onTextMessageHandler) {
                    onTextMessageHandler(currentTextMessage);
                }
            }
        });
    }

    /**
     * Disable remote control. Disable the robot from receiving remote control commands.
     */
    //% group="Receiver"
    //% subcategory="Remote Control"
    //% block="disable remote control"
    //% help=github:pxt-robotpu/docs/receiver
    //% weight=29 blockGap=8
    export function disableRemoteControl(): void {
        const robot = ensureRobot();
        remoteControlEnabled = false;
        robot.gst = 0;
    }

    export enum ControlValueType {
        //% block="turn"
        Turn,
        //% block="speed"
        Speed,
        //% block="button"
        Button,
        //% block="text"
        Text,
        //% block="pitch"
        Pitch,
        //% block="roll"
        Roll
    }

    /**
     * Run a handler when a selected control value is received.
     * @param type control value type to listen for
     * @param handler callback that receives the latest value
     */
    //% group="Receiver"
    //% subcategory="Remote Control"
    //% block="on %type value received"
    //% help=github:pxt-robotpu/docs/receiver
    //% weight=28 blockGap=8
    export function onControlValueReceived(type: ControlValueType, handler: (value: any) => void): void {
        switch (type) {
            case ControlValueType.Turn:
                onTurnValueHandler = handler;
                break;
            case ControlValueType.Speed:
                onSpeedValueHandler = handler;
                break;
            case ControlValueType.Button:
                onButtonCommandHandler = handler;
                break;
            case ControlValueType.Text:
                onTextMessageHandler = handler;
                break;
            case ControlValueType.Pitch:
                onPitchValueHandler = handler;
                break;
            case ControlValueType.Roll:
                onRollValueHandler = handler;
                break;
        }
    }

    /**
     * Read the most recently received control value of a selected type.
     * @param type control value type to read
     */
    //% group="Receiver"
    //% subcategory="Remote Control"
    //% block="current %type value"
    //% help=github:pxt-robotpu/docs/receiver
    //% weight=27 blockGap=8
    export function getControlValue(type: ControlValueType): any {
        switch (type) {
            case ControlValueType.Turn:
                return currentTurnValue;
            case ControlValueType.Speed:
                return currentSpeedValue;
            case ControlValueType.Button:
                return currentButtonValue;
            case ControlValueType.Text:
                return currentTextMessage;
            case ControlValueType.Pitch:
                return currentPitchValue;
            case ControlValueType.Roll:
                return currentRollValue;
            default:
                return 0;
        }
    }
}

