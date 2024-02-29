// src/mockedDataSets.ts

interface MockedDataSets {
  [key: string]: string[][];
}

export const mockedDataSets: MockedDataSets = {
  "/data/dataset1.csv": [
    ["ID", "Address", "City", "State", "Zip", "Price"],
    ["1", "123 Main St", "Anytown", "StateA", "12345", "200000"],
    ["2", "456 Pine St", "Laketown", "StateB", "67890", "250000"],
    ["3", "789 Oak Ave", "Forest City", "StateC", "24680", "300000"],
  ],
  "/data/dataset2.csv": [
    ["ID", "Address", "City", "State", "Zip", "Price"],
    ["4", "101 Elm St", "Hilltown", "StateA", "54321", "180000"],
    ["5", "202 Maple Ave", "Rivertown", "StateB", "98760", "220000"],
    ["6", "303 Birch Blvd", "Mountain City", "StateC", "13579", "260000"],
  ],
  "/data/dataset3.csv": [
    ["ID", "Address", "City", "State", "Zip", "Price"],
    ["7", "135 Ninth St", "Palo Alto", "CA", "94303", "160000"],
  ],
};
