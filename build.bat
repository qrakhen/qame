tsc -p ./ && browserify out/Qame.js -o public/js/Qame.js -dv && node-sass src/Style/Main.scss -o public/css/ --output-style compact && node increment.js