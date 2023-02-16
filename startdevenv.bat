
START tsc -p ./ -w && START watchify out/Qame.js -o public/js/Qame.js -dv && START node-sass src/Style/Main.scss -o public/css/ --output-style compact -w && node increment.js