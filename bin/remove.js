const fs = require('fs');
const path = require('path');
module.exports = (removePath, cwd) => {
  const buildfilePath = path.join(cwd, 'buildfile.json');
  const buildfile = JSON.parse(fs.readFileSync(buildfilePath).toString());

  fs.unlinkSync(removePath);
  buildfile.files.splice(buildfile.files.indexOf(removePath), 1);
  fs.writeFileSync(buildfilePath, JSON.stringify(buildfile, null, 2));
};
