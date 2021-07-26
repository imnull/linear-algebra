import { Determinant } from './src/determinant'

const deter2 = new Determinant(2)
deter2.setRow(0, [1,2])
deter2.setRow(1, [2,1])
deter2.print()
console.log(deter2.reduce())

const deter3 = new Determinant(3)
deter3.setValue([
    [1,0,0],
    [0,2,6],
    [0,0,3],
])
deter3.print()
console.log(deter3.reduce())
console.log(deter3.isTriangular())