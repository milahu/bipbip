/* @flow */
import {
    runSuite,
    printSuiteResult,
    type SuiteInput,
    type SuiteResult
} from './suite';

import type { ScenarioOptions } from './scenario';

export type BenchmarkInput = {
    suites: SuiteInput[]
};

export type BenchmarkResult = {
    suites: SuiteResult[]
};

/*
 * Execute a set of benchmarks.
 */
async function runBenchmark(
    input: BenchmarkInput,
    options: ScenarioOptions
): Promise<BenchmarkResult> {
    const suites = await input.suites.reduce(async (prev, suite) => {
        const result = await prev;
        return result.concat([await runSuite(suite, options)]);
    }, []);

    return {
        suites
    };
}

/*
 * Print results for a benchmark.
 */
function printResult(result: BenchmarkResult, previous: ?BenchmarkResult) {
    result.suites.forEach(suite => {
        const previousSuite = previous
            ? previous.suites.find(prev => prev.name == suite.name)
            : null;

        printSuiteResult(suite, previousSuite);
        process.stdout.write('\n');
    });
}

export { runBenchmark, printResult };
