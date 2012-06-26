rm -rf output
node r.js -o build.js
node r.js -o cssIn=../css/styles.css out=output/css/styles.css
mkdir output/img
cp -r ../img output
cp -r ../css/* output/css
cp ../index.html output/index.html
sed -i 's/js\/libs\/require\/require.js/http:\/\/requirejs.org\/docs\/release\/1.0.5\/minified\/require.js/g' output/index.html
