rm -rf output
node r.js -o build.js
mkdir output/js/libs
mkdir output/js/libs/require
cp ../js/libs/require/require.js output/js/libs/require/require.js
cp -r ../css/* output/css
node r.js -o cssIn=../css/styles.css out=output/css/styles.css
mkdir output/img
cp -r ../img output
cp ../index.html output/index.html
sed -i 's/js\/libs\/require\/require.js/js\/main.js/g' output/index.html
s3cmd put --recursive --acl-public output/* s3://apiengine