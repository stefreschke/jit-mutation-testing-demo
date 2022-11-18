// This is the mocha adapter!

const Mocha = require('mocha');
const {
    EVENT_RUN_BEGIN,
    EVENT_RUN_END,
    EVENT_TEST_FAIL,
    EVENT_TEST_PASS,
    EVENT_SUITE_BEGIN,
    EVENT_SUITE_END,
} = Mocha.Runner.constants;

const path = require('path');
// console.log(Mocha);

function escapeRegExp(input) {
    return input.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

class MochaReporter {
    // runner: NodeJS.EventEmitter
    constructor(runner) {
        runner.on(EVENT_RUN_BEGIN, () => {
            // console.log('starting mochareporter');
            // this.passedCount = 0;
            // this.timer.reset();
            // this.tests = [];
            // StrykerMochaReporter.log?.debug('Starting Mocha test run');
        });
        runner.on(EVENT_TEST_PASS, (test) => {

            // const title: string = test.fullTitle();
            // const result: SuccessTestResult = {
            //   id: title,
            //   name: title,
            //   status: TestStatus.Success,
            //   timeSpentMs: this.timer.elapsedMs(),
            // };
            // this.tests.push(result);
            // this.passedCount++;
            // this.timer.reset();
        });
        runner.on(EVENT_TEST_FAIL, (test, err) => {
            console.log(err)

            // console.log('test ' + test + ' failed');
            // console.log(' error: ' + err);
            // const title = test.ctx?.currentTest?.fullTitle() ?? test.fullTitle();
            // const result: FailedTestResult = {
            //   id: title,
            //   failureMessage: (err.message || err.stack) ?? '<empty failure message>',
            //   name: title,
            //   status: TestStatus.Failed,
            //   timeSpentMs: this.timer.elapsedMs(),
            // };
            // this.tests.push(result);
            // if (StrykerMochaReporter.log?.isTraceEnabled()) {
            //   StrykerMochaReporter.log?.trace(`Test failed: ${test.fullTitle()}. Error: ${err.message}`);
            // }
        });
        runner.on(EVENT_RUN_END, () => {
            // console.log('ended test runs');
            // StrykerMochaReporter.log?.debug('Mocha test run completed: %s/%s passed', this.passedCount, this.tests.length);
        });
    }
}

const mochaRoot = path.dirname(require.resolve('mocha/package.json'));
const runHelpers = require(`${mochaRoot}/lib/cli/run-helpers`);
const loadOptions = require(`${mochaRoot}/lib/cli/options`).loadOptions;
const collectFiles = require(`${mochaRoot}/lib/cli/collect-files`);

async function runMocha(mocha) {
    // void promise return
    // console.log(mocha);
    return new Promise((res) => {
        mocha.run(() => res());
    });
}

// options: Mocha.MochaOptions
// return Mocha
function createMocha(options) {
    return new Mocha(options);
}

// mocha: Mocha, options: MochaOptions
function configureMocha(mocha, options) {
    // operation: (input: T) => void
    function setIfDefined(value, operation) {
        if (typeof value !== 'undefined') {
            operation.apply(mocha, [value]);
        }
    }
    mocha.timeout(10000)

    setIfDefined(options['async-only'], (asyncOnly) => asyncOnly && mocha.asyncOnly());
    setIfDefined(options.ui, mocha.ui);
    setIfDefined(options.grep, mocha.grep);
}

// mocha: Mocha, testFiles: Iterable<String>
function addTestFiles(mocha, testfiles) {
    for (var i = 0; i < testfiles.length; i++) {
        let fn = testfiles[i];
        mocha.addFile(fn);
    }
}

// intercept: (mocha: Mocha) => void, disableBail: boolean
// returns Promise<DryRunResult>
async function run(intercept, testFiles, mochaOptions) {
    // this.requireCache.clear();
    const mocha = createMocha({
        reporter: MochaReporter,
        dryRun: false,
    });
    configureMocha(mocha, mochaOptions);
    intercept(mocha);
    addTestFiles(mocha, testFiles);
    try {
        await runMocha(mocha);
        if (mocha.dispose) {
            // Since mocha 7.2
            mocha.dispose();
        }
        return { itWorked: true };
    } catch (errorMessage) {
        console.log('Oh no, stuff exploded');
        console.log(errorMessage);
        return {
            errorMessage,
        };
    }
}

async function gatherTestSuite(options) {
    const testFileNames = collectFiles(options);
    const tests = [];
    var interceptor = (mocha) => {
        mocha.suite.beforeEach('asdf', function () {
            const test = this.currentTest;
            tests.push(test);
            this.skip()
        });
    };
    var result = await run(interceptor, testFileNames, options);
    return tests;
}

const mochaTestName = t => t.fullTitle()
const mochaTestState = t => t.state

// note that test here is any object {id: id, name: name, file: fn}
async function singleTestRun(targetTest) {
    var options = loadOptions();
    options.ignore = [];
    options.extension = ['.js'];
    options.file = [''];
    options.recursive = true;
    options.sort = false;
    options.spec = ['test/**/*.js'];
    options.timeout = 10000;

    const files = [targetTest.file];
    var testWasRun = false;
    var testResult;
    var interceptor = (mocha) => {
        mocha.suite.beforeEach('asdf', function () {
            const ctName = mochaTestName(this.currentTest)
            if (ctName != targetTest.name) {
                this.skip()
            }
        });
        mocha.suite.afterEach('qwer', function () {
            const ct = this.currentTest
            const ctName = mochaTestName(ct)
            if (ctName == targetTest.name) {
                testWasRun = true
                testResult = mochaTestState(ct)
            }
        });
    };
    let result = await run(interceptor, files, options);
    return { name: targetTest.name, file: targetTest.file, testRun: testWasRun, testResult: testResult, mochaResult: result }
}

async function testSuiteDiscovery() {
    var options = loadOptions();
    options.ignore = [];
    options.extension = ['.js'];
    options.file = [''];
    options.recursive = true;
    options.sort = false;
    options.spec = ['test/**/*.js'];

    const tests = await gatherTestSuite(options);

    const testResult = []
    var simpleFeedBackString = "tests: ";
    const names = [];
    const fns = [];
    for (let id = 0; id < tests.length; id++) {
        let test = tests[id];
        let fn = test.file;
        fns.push(fn)

        simpleFeedBackString += (mochaTestState(test) == "passed") ? '.' : '?'

        let name = mochaTestName(test);
        names.push(name);

        testResult.push({
            id: id,
            name: name,
            file: fn,
            run: async function () { return await singleTestRun({ id: id, name: name, file: fn }) }
        })
    }
    return testResult;
}

async function main() {
    console.log("TEST SUITE DISCOVERY!")
    const tests = await testSuiteDiscovery()
    console.log("TEST RUN")
    var i = 1
    tests.forEach(async (t) => {
        const testRunResult = await singleTestRun(t)
        if (testRunResult.testResult != "passed")
            console.log("test: " + i++ + ", " + testRunResult.name)
    });
}

global.testSuiteDiscovery = testSuiteDiscovery
global.singleTestRun = singleTestRun

// main()
console.log("5b2723bf-ebff-479d-a4ba-cccb0dbf93f4")

