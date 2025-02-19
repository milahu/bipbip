import fs from 'fs';

/*
 * Save the result of benchmarks to a file.
 */
async function saveResult(filePath, result) {
    const content = JSON.stringify(result, null, 2);
    return new Promise((resolve, reject) => {
        fs.writeFile(
            filePath,
            content,
            {
                encoding: 'utf8'
            },
            error => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            }
        );
    });
}
/*
 * Load previously saved benchmark results.
 */

async function loadResult(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(
            filePath,
            {
                encoding: 'utf8'
            },
            (error, content) => {
                if (error && error.code === 'ENOENT') {
                    resolve(null);
                } else if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(content));
                }
            }
        );
    });
}

export { saveResult, loadResult };
