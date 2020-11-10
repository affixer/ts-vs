export const parsePrice = (cost: number) => {
    let reverseCost = cost.toString().split('').reverse().join('')
    let characterCount = reverseCost.length
    let costCountStr = ''
    let i = 0;
    while (i + 3 < characterCount - 1) {
        costCountStr += reverseCost.substr(i, 3) + ','
        characterCount++
        i += 3
    }
    costCountStr += reverseCost.substr(i)
    return costCountStr.toString().split('').reverse().join('')
}