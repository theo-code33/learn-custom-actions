const core = require('@actions/core');
const github = require('@actions/github');

const generateNewRelease = async () => {
  try {
    const version = core.getInput('version');
    const context = github.context;
    console.log(`version: ${version}`)
    const octokit = github.getOctokit(context.token);
    await octokit.rest.release.createRelease({
      ...context.repo,
      tag_name: version,
      tag_commitish: context.sha,
      name: version,
      body: `New release ${version} published to NPM.`,
      draft: false,
      prerelease: false,
      generate_release_notes: false,
    })
  } catch (error) {
    core.setFailed(error.message);
  } 
}

generateNewRelease()