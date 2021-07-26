import { TDeterminant } from './type'
import { reduce, isTriangular, slice } from './matrix'

export class Determinant implements TDeterminant {
    private readonly value: number[][]
    public readonly size: number
    constructor(size: number) {
        this.size = size
        this.value = Array(this.size).fill(this.size).map(size => Array(size).fill(0))
    }

    toString() {
        return this.value.map(row => row.join('\t')).join('\n')
    }

    print() {
        console.log(this.toString())
    }

    getCell(rowIndex: number, columnIndex: number) {
        return this.value[rowIndex][columnIndex]
    }

    getRow(rowIndex: number) {
        return this.value[rowIndex].slice(0)
    }

    getColumn(columnIndex: number) {
        return this.value.map(row => row[columnIndex])
    }

    getValue() {
        return this.value.map(row => row.slice(0))
    }

    setCell(rowIndex: number, columnIndex: number, value: number) {
        this.value[rowIndex][columnIndex] = value
        return this
    }

    setRow(rowIndex: number, values: number[]) {
        const cells = this.value[rowIndex]
        for(let i = 0, len = Math.min(this.size, values.length); i < len; i++) {
            cells[i] = values[i] || 0
        }
        return this
    }
    setColumn(columnIndex: number, value: number[]) {
        for(let i = 0, len = Math.min(this.size, value.length); i < len; i++) {
            const cells = this.value[i]
            cells[columnIndex] = value[i] || 0
        }
    }

    setValue(values: number[][]) {
        for(let i = 0, len = Math.min(this.size, values.length); i < len; i++) {
            this.setRow(i, values[i])
        }
        return this
    }

    clone() {
        const deter = new Determinant(this.size)
        deter.setValue(this.getValue())
        return deter
    }

    isTriangular() {
        return isTriangular(this.value)
    }

    reduce() {
        return reduce(this.value)
    }
}
