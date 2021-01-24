const getYieldForPlant = (plant) => {
    return plant.yield;
};

const getYieldForCrop = (plant) => {
    return plant.crop.yield * plant.numCrops;
};

const getTotalYield = (plant) => {
    return plant.crops.reduce((sum, item) => {
        return sum + item.crop.yield * item.numCrops
        },0);
};

const getCostsForCrop = (plant) => {
    return plant.numCrops * plant.cost;
};

const getRevenueForCrop = (plant) => {
    return getYieldForCrop(plant) * plant.salePrice;
};

const getProfitForCrop = (plant) => {
    return getRevenueForCrop(plant) - getCostsForCrop(plant);
};

const getTotalProfit = (plant) => {
    return plant.crops.reduce((sum, item) => {
        return sum + getProfitForCrop(item);
        },0);
};

const getYieldForCropEnv = (plant) => {
    for ( what in plant.crop.factors) {
        plant.crop.yield *= 
            (100+plant.crop.factors[what][plant.environment[what]])/100;
    };
    return plant.crop.yield;
};

const getRevenueForCropEnv = (plant) => {
    return getYieldForCropEnv(plant) * plant.salePrice;
};

const getProfitForCropEnv = (plant) => {
    return getRevenueForCropEnv(plant) - getCostsForCrop(plant);
};

const getTotalProfitEnv = (plant) => {
    return plant.crops.reduce((sum, item) => {
        return sum + getProfitForCropEnv(item);
        },0);
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
    getYieldForCropEnv,
    getRevenueForCropEnv,
    getProfitForCropEnv,
    getTotalProfitEnv
}