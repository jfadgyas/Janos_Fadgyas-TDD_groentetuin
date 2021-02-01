const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
    getYieldForPlantEnv,
    getYieldForCropEnv,
    getRevenueForCropEnv,
    getProfitForCropEnv,
    getTotalProfitEnv } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe('getCostsForCrop', () => {
    test('Calculate cost per crop', () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 230,
            cost: 1
        };
        expect(getCostsForCrop(input)).toBe(230);
    });
});

describe('getRevenueForCrop', () => {
    test('Calculate revenue per crop', () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 2,
            salePrice: 2
        };
        expect(getRevenueForCrop(input)).toBe(12);
    });
});

describe('getProfitForCrop', () => {
    test('Calculate profit per crop', () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 2,
            cost: 1,
            salePrice: 2
        };
        expect(getProfitForCrop(input)).toBe(10);
    });
});

describe('getTotalProfit', () => {
    test('Calculate total profit', () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const potato = {
            name: "potato",
            yield: 5,
        };
        const crops = [
            { crop: corn, numCrops: 5, cost: 1, salePrice: 2 },
            { crop: pumpkin, numCrops: 2, cost: 3, salePrice: 1 },
            { crop: potato, numCrops: 1, cost: 3, salePrice: 2 },
        ];
        expect(getTotalProfit({crops})).toBe(34);
    });
});

// Environment factors
describe("getYieldForPlantEnv", () => {
  test("Get yield for plant, with more environment factors", () => {
      const corn = {
          name: "corn",
          yield: 30,
          factors: {
            sun: {
              low: -50,
              medium: 0,
              high: 50,
            },
            wind: {
              low: 10,
              medium: 0,
              high: -10,
            },
          },
        };
        const avocado = {
          name: "avocado",
          yield: 3,
          factors: {
            sun: {
              low: -20,
              medium: 0,
              high: 50,
            },
            wind: {
              low: 0,
              medium: -30,
              high: -60,
            },
          },
        };
        const environmentFactors = {
          sun: "high",
          wind: "high",
          ground: "soft"
        };
      expect(getYieldForPlantEnv({crop: corn, numCrops: 10}, environmentFactors)).toBe(40.5);
      expect(getYieldForPlantEnv({crop: avocado, numCrops: 10}, environmentFactors)).toBe(1.8);
  });
});

describe("getYieldForCropEnv", () => {
    test("Get yield for crop, with 1 environment factor", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
              sun: {
                low: -50,
                medium: 0,
                high: 50,
              },
            },
          };
          const environmentFactors = {
            sun: "low",
          };
        expect(getYieldForCropEnv({crop: corn, numCrops: 10}, environmentFactors)).toBe(150);
    });
});

describe("getYieldForCropEnv", () => {
    test("Get yield for crop, with more environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
              sun: {
                low: -50,
                medium: 0,
                high: 50,
              },
              wind: {
                low: 10,
                medium: 0,
                high: -10,
              },
            },
          };
          const avocado = {
            name: "avocado",
            yield: 3,
            factors: {
              sun: {
                low: -20,
                medium: 0,
                high: 50,
              },
              wind: {
                low: 0,
                medium: -30,
                high: -60,
              },
            },
          };
          const environmentFactors = {
            sun: "high",
            wind: "high",
            ground: "soft"
          };
        expect(getYieldForCropEnv({crop: corn, numCrops: 10}, environmentFactors)).toBe(405);
        expect(getYieldForCropEnv({crop: avocado, numCrops: 10}, environmentFactors)).toBe(18);
    });
});

describe('getRevenueForCropEnv', () => {
    test('Calculate revenue per crop with environmental factors', () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
              sun: {
                low: -50,
                medium: 0,
                high: 50,
              },
              wind: {
                low: 10,
                medium: 0,
                high: -10,
              },
            },
          };
          const avocado = {
            name: "avocado",
            yield: 3,
            factors: {
              sun: {
                low: -20,
                medium: 0,
                high: 50,
              },
              wind: {
                low: 0,
                medium: -30,
                high: -60,
              },
            },
          };
          const environmentFactors = {
            sun: "high",
            wind: "high",
            ground: "soft"
          };
          expect(getRevenueForCropEnv({crop: corn, numCrops: 10, salePrice: 3}, environmentFactors)).toBe(1215);
          expect(getRevenueForCropEnv({crop: avocado, numCrops: 10, salePrice: 2}, environmentFactors)).toBe(36);
    });
});

describe('getProfitForCropEnv', () => {
    test('Calculate profit per crop with environmental factors', () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
              sun: {
                low: -50,
                medium: 0,
                high: 50,
              },
              wind: {
                low: 10,
                medium: 0,
                high: -10,
              },
            },
          };
          const avocado = {
            name: "avocado",
            yield: 3,
            factors: {
              sun: {
                low: -20,
                medium: 0,
                high: 50,
              },
              wind: {
                low: 0,
                medium: -30,
                high: -60,
              },
            },
          };
          const environmentFactors = {
            sun: "high",
            wind: "high",
            ground: "soft"
          };
          expect(getProfitForCropEnv({crop: corn, numCrops: 10, cost: 2, salePrice: 3}, environmentFactors)).toBe(1195);
          expect(getProfitForCropEnv({crop: avocado, numCrops: 10, cost: 4, salePrice: 2}, environmentFactors)).toBe(-4);
    });
});

describe('getTotalProfitEnv', () => {
    test('Calculate total profit with environmental factors', () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
              sun: {
                low: -50,
                medium: 0,
                high: 50,
              },
              wind: {
                low: 10,
                medium: 0,
                high: -10,
              },
            },
          };
          const avocado = {
            name: "avocado",
            yield: 3,
            factors: {
              sun: {
                low: -20,
                medium: 0,
                high: 50,
              },
              wind: {
                low: 0,
                medium: -30,
                high: -60,
              },
            },
          };
          const environmentFactors = {
            sun: "high",
            wind: "high",
            ground: "soft"
          };
          const crops = [
            { crop: corn, numCrops: 10, cost: 2, salePrice: 3},
            { crop: avocado, numCrops: 10, cost: 4, salePrice: 2}
        ];
          expect(getTotalProfitEnv({crops}, environmentFactors)).toBe(1191);
    });
});