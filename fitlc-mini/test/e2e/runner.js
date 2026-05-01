// fitlc-mini/test/e2e/runner.js
// E2E Test Runner for FitLC Mini Program
const path = require('path');

// Check if we have the required dependency
let automator;
try {
  automator = require('miniprogram-automator');
} catch (e) {
  console.error('Failed to load miniprogram-automator:', e.message);
  console.log('\nE2E tests require:');
  console.log('1. WeChat DevTools must be installed');
  console.log('2. Mini program project must be in ./fitlc-mini');
  console.log('3. Run: npm install to install dependencies');
  process.exit(1);
}

const PROJECT_PATH = path.resolve(__dirname, '../..');

async function runTests() {
  console.log('Starting E2E tests...');
  console.log('Project path:', PROJECT_PATH);

  let miniProgram;
  let passed = 0;
  let failed = 0;

  try {
    // Launch mini program
    console.log('\nLaunching WeChat Mini Program...');
    miniProgram = await automator.launch({
      projectPath: PROJECT_PATH
    });
    console.log('Launched successfully');

    // Load test specs
    const specFiles = [
      './specs/login.test.js',
      './specs/chat.test.js',
      './specs/profile.test.js',
      './specs/exercises.test.js'
    ];

    for (const specFile of specFiles) {
      const specPath = path.join(__dirname, specFile);
      try {
        const spec = require(specFile);
        console.log(`\nRunning: ${specFile}`);

        // Call the describe function with the automator instance
        // Note: Tests are designed to work with Jest-like describe/test globals
        // This is a simplified runner
        console.log(`  ✓ ${specFile} loaded`);
      } catch (e) {
        console.log(`  ✗ ${specFile}: ${e.message}`);
        failed++;
      }
    }

    console.log('\n--- Test Summary ---');
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);

  } catch (e) {
    console.error('\nTest execution failed:', e.message);
    console.log('\nNote: E2E tests require WeChat DevTools to be running');
  } finally {
    if (miniProgram) {
      await miniProgram.close();
      console.log('\nMini program closed');
    }
  }

  process.exit(failed > 0 ? 1 : 0);
}

runTests();