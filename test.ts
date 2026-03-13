
const TEST_FOOT_JOINTS = false;
const TEST_LEG_JOINTS = false;


if (TEST_FOOT_JOINTS) {
    input.onButtonPressed(Button.A, function () {
        robotPu.setServoAngle(robotPu.ServoJoint.LeftFoot, 45); 
        robotPu.setServoAngle(robotPu.ServoJoint.RightFoot, 135); 
    });
}


if (TEST_LEG_JOINTS) {
    input.onButtonPressed(Button.B, function () {
        robotPu.setServoAngle(robotPu.ServoJoint.LeftLeg, 60);   
        robotPu.setServoAngle(robotPu.ServoJoint.RightLeg, 120); 
    });
}


