const getYieldForPlant = plant => plant.yield;

const getYieldForCrop = plant => plant.crop.yield * plant.numCrops;

const getTotalYield = plant => plant.crops.reduce((sum, item) => {
        return sum + item.crop.yield * item.numCrops},0);

const getCostsForCrop = plant => plant.numCrops * plant.cost;

const getRevenueForCrop = plant => getYieldForCrop(plant) * plant.salePrice;

const getProfitForCrop = plant => getRevenueForCrop(plant) - getCostsForCrop(plant);

const getTotalProfit = plant => plant.crops.reduce((sum, item) => {
        return sum + getProfitForCrop(item)},0);

const getYieldForPlantEnv = (plant, environment) => {
    for (let what in plant.crop.factors) {
        const factor = plant.crop.factors[what][environment[what]];
        plant.crop.yield *= (100+factor)/100;
    };
    return plant.crop.yield;
}

const getYieldForCropEnv = (plant, environment) => getYieldForPlantEnv(plant, environment) * plant.numCrops;

const getRevenueForCropEnv = (plant, environment) => getYieldForCropEnv(plant, environment) * plant.salePrice;

const getProfitForCropEnv = (plant, environment) => getRevenueForCropEnv(plant, environment) - getCostsForCrop(plant);

const getTotalProfitEnv = (plant, environment) => plant.crops.reduce((sum, item) => {
        return sum + getProfitForCropEnv(item, environment)},0);

module.exports = {
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
    getTotalProfitEnv
}