const userData= [{prevRoutes: [{miles: 10}, {miles: 10}, {miles: 10}]}]

// userData[0].prevRoutes.map((prev, i)=>{
//     console.log(prev)
//     prev.miles.reduce((acc = 0, mile)=> {
//        acc + mile[i].miles
//     console.log(acc)
// })
// })

const result = userData[0].prevRoutes.reduce((acc, curVal)=> {
    console.log(acc)   
    return acc + Number(curVal.miles)
})

console.log(result)