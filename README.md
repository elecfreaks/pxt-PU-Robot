# micro:bit PU Robot

![](pu.png/)

This extension is designed to program and drive the PU Robot. You can purchase the PU Robot from the 
[Elecfreaks store](https://shop.elecfreaks.com/products/elecfreaks-micro-bit-pu-robot-kit?utm_source=copyToPasteBoard&utm_medium=product-links&utm_content=web).

## Code Example
```JavaScript
input.onButtonPressed(Button.A, function () {
    robotPu.setServoAngle(robotPu.ServoJoint.LeftFoot, 45);  // 左脚45度
    robotPu.setServoAngle(robotPu.ServoJoint.RightFoot, 135); // 右脚135度
});

input.onButtonPressed(Button.B, function () {
    robotPu.setServoAngle(robotPu.ServoJoint.LeftLeg, 60);   // 左腿60度
    robotPu.setServoAngle(robotPu.ServoJoint.RightLeg, 120); // 右腿120度
});
```

## Supported targets
for PXT/microbit

## License
MIT