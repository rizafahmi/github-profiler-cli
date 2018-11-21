const ora = require('ora');
const github = require('./github.js');

(async () => {
  const spinner = ora('Get username...');
  spinner.start();
  const [_node, _path, username] = process.argv;
  try {
    spinner.text = 'Get Repositories...';
    spinner.color = 'yellow';
    const repos = await github.getUserRepositories(username);
    spinner.text = 'Compute stars...';
    spinner.color = 'orange';
    const stars = await github.computeTotalStars(repos);
    spinner.succeed();
    console.log(`${username} got ${stars} star(s)!`);
  } catch (error) {
    console.error('💩 happen: ', error);
    spinner.fail();
  }
})();
