/**
 * Enum representing the different types of configuration questions.
 */
const enum ConfigurationQuestionType {
    /**
     * A normal question is one with multiple answers that include their own surcharge.
     */
    Regular = "regular",
    // /**
    //  * A number question is one that requires a number input.
    //  */
    // Number = "number",
    /**
     * A multiple question is one with multiple answers that include their own surcharge.
     */
    Multiple = "multiple"
}

export default ConfigurationQuestionType;
