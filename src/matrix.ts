export const clone = (matrix: number[][]) => {
    return matrix.map(r => r.slice(0))
}

export const slice = (matrix: number[][], row: number, column: number) => {
    const m = clone(matrix)
    m.splice(row, 1)
    m.forEach(r => r.splice(column, 1))
    return m
}

export const isUpperTriangular = (matrix: number[][]) => {
    for(let i = 0, len = matrix.length - 1; i < len; i++) {
        const seg = matrix[i].slice(i + 1)
        if(seg.some(v => v !== 0)) {
            return false
        }
    }
    return true
}

export const isLowerTriangular = (matrix: number[][]) => {
    for(let i = 1, len = matrix.length; i < len; i++) {
        const seg = matrix[i].slice(0, i)
        if(seg.some(v => v !== 0)) {
            return false
        }
    }
    return true
}

export const isTriangular = (matrix: number[][]) => {
    if(matrix.length < 2) {
        return true
    } else if(matrix.length === 2) {
        return matrix[1][0] === 0 || matrix[0][1] === 0
    } else if(matrix.length === 3) {
        return (
            (matrix[1][0] === 0 && matrix[2][0] === 0 && matrix[2][1] === 0)
            || (matrix[0][1] === 0 && matrix[0][2] === 0 && matrix[1][2] === 0)
        )
    }
    return isLowerTriangular(matrix) || isUpperTriangular(matrix)
}

export const getDiagonal = (mat: number[][]) => {
    return mat.map((row, i) => row[i])
}

export const reduce = (mat: number[][]) => {
    if(mat.length === 1) {
        return mat[0][0]
    } else if(mat.length === 2) {
        return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0]
    } else if(mat.length > 2) {
        if(isTriangular(mat)) {
            return getDiagonal(mat).reduce((r, v) => r * v)
        } else {
            let value: number = 0
            mat[0].forEach((head, colIdx) => {
                const M = slice(mat, 0, colIdx)
                const A = Math.pow(-1, 2 + colIdx) * head * reduce(M)
                value += A
            })
            return value
        }
    }
    return 0
}