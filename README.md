# Siem Board

This small app displays each useful web ui of our SOC.

## Usage

Install required dependencies:
```bash
npm install electron
```

Start the app:
```bash
npx electron .
```

Or if you want to compile it and start it:
```bash
npx electron-packager . siem-board --platform=linux --arch=x64
cd siem-board-linux-x64
./siem-board
```
