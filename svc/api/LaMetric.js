/**
 * A class that provides utility functions for the LaMetric json-format.
 */
class LaMetric {

    /**
     * Generates a response for LaMetric devices.
     * @param message {string} The message.
     * @param icon {string} The code of the icon that should be used.
     * @return object
     */
    static generateResponse(message, icon) {
        return {
            frames: [
                {
                    text: message,
                    icon: icon
                }
            ]
        };
    }

}
export default LaMetric;
