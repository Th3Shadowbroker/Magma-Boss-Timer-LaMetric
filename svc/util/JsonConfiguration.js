import fs from 'fs';

/**
 * Basic json-configuration.
 */
class JsonConfiguration {

    /**
     * Construction of JsonConfiguration.
     * @param file {string} The configs filepath.
     */
    constructor(file) {
        this.file = file;
        this.config = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : {};
    }

    /**
     * Set a configuration value.
     * @param key {string}
     * @param val {string|number|object}
     */
    set(key, val) {
        this.config[key] = val;
    }

    /**
     * Get a configuration value.
     * @param key {string}
     * @return {string|number|object}
     */
    get(key) {
        return this.config[key];
    }

    /**
     * True if the given key is set.
     * @param key {string}
     * @return {boolean}
     */
    isSet(key) {
        return this.config.hasOwnProperty(key);
    }

    /**
     * Set a keys default value.
     * @param key {string}
     * @param val {string|number|object}
     */
    default(key, val) {
        if (!this.isSet(key)) this.set(key, val);
    }

    /**
     * Set multiple defaults based on the given object.
     * @param obj {object}
     */
    defaults(obj) {
        for (let key in obj) {
            this.default(key, obj[key]);
        }
    }

    /**
     * Saves the current configuration.
     * @param file {string} Optional. The file path the configuration should be saved to.
     */
    save(file = this.file) {
        fs.writeFileSync(this.file, JSON.stringify(this.config, null, 4));
    }

}
export default JsonConfiguration;
