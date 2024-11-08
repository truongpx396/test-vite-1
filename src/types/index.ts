// This file defines TypeScript types and interfaces used throughout the application. 
// It exports these types for use in other files.

export interface ExampleType {
    id: number;
    name: string;
    isActive: boolean;
}

export type ExampleArray = ExampleType[];