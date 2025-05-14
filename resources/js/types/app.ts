export type User = {
    id: number;
    name: string;
};

export type Organization = {
    id: number;
    name: string;
    domain: string;
};

export type Team = {
    id: number;
    name: string;
};

export type EvaluationPeriod = {
    id: number;
    name: string;
    description?: string;
    start_date: string;
    end_date: string;
};
