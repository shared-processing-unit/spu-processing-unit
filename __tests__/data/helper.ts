import { transpose } from '../../src/algorithms/matrixHelper'
import Feature, { Entries } from '../../src/algorithms/Feature'

export default (X: [][], Y: Entries) => {
    const transposed = transpose(X)
    return transposed.map((column, featureId) => {
        const feature = column.map((value, index) => ({ value, index }))
        const x = feature
            .sort((cell1, cell2) =>
                `${cell1.value}`.localeCompare(`${cell2.value}`)
            )
            .map(({ index }) => ({ refY: Y[index], index }))
        return {
            indexes: x.map(f => f.index),
            refY: x.map(f => f.refY),
            featureId
        } as Feature
    })
}
