const {execSync} = require('child_process');
const group = process.env.group;

if (!group) {
    execSync('npm run test', {stdio: 'inherit'});
} else {
    execSync(`npm run test -- -g ${group}`, {stdio: 'inherit'});
}