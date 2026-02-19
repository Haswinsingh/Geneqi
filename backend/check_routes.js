const fs = require('fs');
const path = require('path');
const routesDir = path.join(__dirname, 'routes');

console.log('Checking routes in:', routesDir);

fs.readdirSync(routesDir).forEach(file => {
    if (file.endsWith('.js')) {
        try {
            console.log(`Loading ${file}...`);
            require(path.join(routesDir, file));
            console.log(`${file} LOADED SUCCESSFULLY`);
        } catch (e) {
            console.error(`ERROR LOADING ${file}:`, e.message);
            console.error(e.stack);
        }
    }
});
console.log('Done checking routes.');
