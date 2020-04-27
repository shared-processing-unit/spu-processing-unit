import Feature from './Feature'
import { reverse, vectorAdd } from './matrixHelper'

export const evaluate = (data: number[]) => {
    const ginis = vectorAdd(
        weightedGinies(data),
        weightedGinies(reverse(data)).reverse()
    )
    const value: number = Math.max(...ginis)
    return { splitOn: ginis.indexOf(value), value }
}

const weightedGinies = (data: number[]) => {
    const occurences = new Map<number, number>()
    return data.map((category, i) => {
        const occurence = occurences.get(category) || 0
        occurences.set(category, occurence + 1)
        return giniImpurity(Array.from(occurences.values())) / (i + 1)
    })
}
const giniImpurity = (occurence: number[]) => {
    return occurence.reduce((prev, cur) => (prev += cur * cur), 0)
}

export default class Split {
    public readonly featureIndex: number
    public readonly index1: number
    public readonly index2: number

    constructor(
        public readonly value: number,
        public readonly splitOn: number,
        feature: Feature
    ) {
        this.featureIndex = feature.id
        this.index1 = feature.ref[splitOn]
        this.index2 = feature.ref[splitOn + 1]
    }
}