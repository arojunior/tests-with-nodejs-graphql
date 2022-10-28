const util = require(`util`);
const exec = util.promisify(require(`child_process`).exec);

const startContainers = async () => {
  console.log(`=== starting containers...`);
  await exec(`docker-compose up -d`);
};

const waitForMigrations = async () => {
  console.log(`=== waiting for the migrations...`);
  return new Promise(resolve => {
    const interval = setInterval(async () => {
      const { stdout } = await exec(`docker-compose logs`);
      const isApplied = stdout.match(/Successfully applied/g);
      const isValidated = stdout.match(/Successfully validated/g);
      const flywayLog = isApplied || isValidated;
      const isMigrationsAppliedOrValidated = flywayLog && !!flywayLog.length;

      if (isMigrationsAppliedOrValidated) {
        clearInterval(interval);
        resolve();
      }
    }, 300);
  });
};

const destroyContainers = async () => {
  console.log(`=== destroying containers...`);
  await exec(`docker-compose down`);
};

jest.setTimeout(120000);

beforeAll(async () => {
  await startContainers();
  await waitForMigrations();
});

afterAll(async () => {
  await destroyContainers();
});
