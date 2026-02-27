# RenCTF

RenCTF is a web application/hardware project intended to teach STEM-related challenges through an interactive & team-based medium. We have a webapp that lets users interface with a virtual game board that has a whole LED Matrix that plays gifs, displays the virtual gameboard, and user-rankings and stats! 

This material is based upon work supported by the National Science Foundation under Award No. 2344237 and No. 2245573. Any opinions, findings and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Science Foundation.

<p align="center">
  <img src="docs/RenCTF.png" alt="RenCTF Board" width="400"/>
  <img src="docs/Back.png" alt="Back png" width="400"/>
</p>


---

### Developed using:
- Firebase (Front-end Hosting & Database)
- Angular (Front-end Framework)
- Heroku (Back-end/server Hosting)
- Blender (Webapp/Matrix GIFs & Rendering)
- Fusion360 (Designing 3D-Printed Housing)


### Hardware
  - 64x64 LED Matrix
  - 5.5” HDMI OLED Display
  - Raspberry Pi ZERO WH
  - Custom 3D-Printed Case



## Setup!

1. Make sure you have these installed:
   - Node.js and npm
   - Angular CLI
   - Firebase CLI
   - Heroku CLI


2. Clone this repo:
   ```bash
   git clone https://github.com/renaaron/renctf.git
   ```

3. Navigate to the `Webapp` directory:
   ```bash
   cd Webapp
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Configure Firebase:
   - Replace the stubbed-out API keys with your Firebase project credentials in `fake_env.js` (the `Server` directory also needs this fake_env.js file)

4. Start the development server:
   ```bash
   npm start
   ```

### Server Setup
1. Navigate to the `Server` directory:
   ```bash
   cd Server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Deploy the backend to Heroku:
   ```bash
   heroku login
   git push heroku master
   ```

