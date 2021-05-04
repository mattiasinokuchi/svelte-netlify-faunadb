// Increase max listeners to avoid a warning
require('events').EventEmitter.defaultMaxListeners = 100

module.exports = {
    src_folders: [
        'test/'
    ],

    output_folder: 'result',

    webdriver: {
        start_process: true,
        server_path: 'node_modules/.bin/geckodriver',
        port: 9515
    },

    test_runner: {
        type: 'mocha',
        options: {
            ui: 'bdd',
            reporter: 'list'
        }
    },

    test_settings: {
        default: {
            desiredCapabilities: {
                browserName: 'firefox',
                firefoxOptions: {
                    args: [
                        '--headless',
                        '--no-sandbox',
                        '--disable-gpu'
                    ]
                }
            }
        }
    }
}
