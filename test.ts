/**
 * Hardware smoke test for the public PU Robot API.
 *
 * Pass criteria:
 * 1. The project compiles in MakeCode without TypeScript or blocks errors.
 * 2. In the simulator, it runs without unhandled runtime exceptions.
 * 3. On a micro:bit V2 with the PU Robot connected:
 *    - Button A moves the foot servos.
 *    - Button B runs the greet action and then stops it.
 *    - Button A+B sends radio values and a short text message.
 *
 * Notes:
 * - Sensor values may be 0 or placeholder values if robot hardware is absent.
 * - This extension is micro:bit V2 only.
 */

robotPu.setServoTrim(0, 0, 0, 0, 0, 0)
robotPu.setWalkSpeedRange(2, 2)
robotPu.setAmbienceLight(robotPu.LightSelection.All, 0, 0, 0)
robotPu.setEyesState(robotPu.EyeState.On, robotPu.EyeState.On)
robotPu.setLeftEyeBrightness(40)
robotPu.setRightEyeBrightness(40)

robotPu.setControllerRadioGroup(160)
robotPu.initControllerButtons()
robotPu.enableRemoteControlWithGroup(160)

let receivedTurn = 0
let receivedText = ""

robotPu.onControlValueReceived(robotPu.ControlValueType.Turn, function (value) {
    receivedTurn = value
})

robotPu.onControlValueReceived(robotPu.ControlValueType.Text, function (value) {
    receivedText = value
})

input.onButtonPressed(Button.A, function () {
    robotPu.setServoAngle(robotPu.ServoJoint.LeftFoot, 45)
    robotPu.setServoAngle(robotPu.ServoJoint.RightFoot, 135)
    robotPu.smoothSetServoAngle(robotPu.ServoJoint.HeadPitch, 100, 2)
})

input.onButtonPressed(Button.B, function () {
    robotPu.executeAction(robotPu.Action.Greet)
    basic.pause(500)
    robotPu.exitLoop()
    robotPu.setMoveDirection(robotPu.MoveDirection.LeftTurn)
})

input.onButtonPressed(Button.AB, function () {
    robotPu.sendControlValue(robotPu.SendControlType.Turn, 0.25)
    robotPu.sendControlValue(robotPu.SendControlType.Speed, 0.5)
    robotPu.sendControlValue(robotPu.SendControlType.Button, 1)
    robotPu.sendTextMessage("pu-test")
})

let distance = robotPu.ultrasonicDistance(robotPu.DistanceUnit.Centimeters)
let roll = robotPu.bodyRoll()
let pitch = robotPu.bodyPitch()
let tempo = robotPu.musicTempo()
let front = robotPu.frontDistanceArray()
let turnValue = robotPu.getControlValue(robotPu.ControlValueType.Turn)
let textValue = "" + robotPu.getControlValue(robotPu.ControlValueType.Text)
let joystickTurn = robotPu.readJoystickValue(robotPu.JoystickAxis.Turn)
let buttonState = robotPu.getControllerButtonPressed(robotPu.ControllerButton.B1)
let smoke = distance + roll + pitch + tempo + front.length + turnValue + joystickTurn + receivedTurn

if (buttonState && (textValue.length > 1000 || receivedText.length > 1000)) {
    smoke += 1
}
