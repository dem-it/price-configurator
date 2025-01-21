export interface ConfigurationData {
    questions: ConfigurationQuestion[];
}

export interface ConfigurationQuestion {
    id: string;
    title: string;
    description: string;
    type: ConfigurationQuestionType;
    answers: ConfigurationAnswer[];
}

export interface ConfigurationAnswer {
    id: string;
    title: string;
    description: string;
    imageId?: string | undefined;
    surcharge: number;
}

/**
 * Enum representing the different types of configuration questions.
 */
export enum ConfigurationQuestionType {
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
    Multiple = "multiple",
}