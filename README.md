<p align="center">
  <a href="https://dronetools.dev/"><img src="https://github.com/rboyle-software/drone-tools/blob/a1cb94f51c795f3afe8f2c3e01e31c3a80b9725c/public/dt-logo-transparent1.png" width="500px"></a>
</p>
<hr>

- Estimate propeller tip speed!
- Optimize settings to achieve maximum performance!
- Factor in current air temperature at target altitude!
- Compare to Local Mach 1 and adjust accordingly!
<br><br>


Drone Tools is a simple toolbox for pilots of high-power, high-speed multirotor aircraft. At max throttle and high airspeeds these amazing machines are at risk of breaking the sound barrier! That sounds super cool but may result in lost efficiency or undesirable flight characteristics.
<br><br>
The propeller tip speed calculator enables pilots to estimate the max potential tip speed based on propeller, battery, and motor specs (calculations are based on an unloaded brushless motor).
<br><br>


<p align="center">
  <img src="https://github.com/rboyle-software/drone-tools/blob/ba6c0e06b95b88eb8894995629d558bbcfff7a74/public/drone-tools-ui.png" width="600px">
</p>
<br><br>

## Contribute to this project!

Please feel free to create an issue or send a message to correct our math or propose additional features.
<br><br>

## To run the app locally:

- Fork and Clone this repository
- Install dependencies
- Use `npm run run-dev` to launch the app on the development server and host the Netlify function on its own separate development server.
<br><br>

## To Do:

- [x] RPM * Prop Max Circumference over Distance / Time = Prop Tip Speed
- [x] Prop Tip Speed + Airspeed = Max Tip Speed?
- [x] Motor kV rating * battery V rating = unloaded RPM estimate
- [ ] Account for airframe pitch, horizontal velocity
- [x] add input field for anticipated airspeed (convert knots to MPH?)
- [x] API call for temp, pressure, humidity / display local Mach 1
- [x] make it mobile browser-friendly

<br><br>
[![Netlify Status](https://api.netlify.com/api/v1/badges/bba96309-cd3a-494c-90f9-cde59c2896a0/deploy-status)](https://app.netlify.com/sites/dronetools/deploys)
