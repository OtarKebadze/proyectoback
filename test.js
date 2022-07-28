const randoms = ()=>{
    return Math.ceil(Math.random()* (1000))
}

const createNum= (qty)=>{
    let numbers={};
    for (let i = 0; i <=qty; i++) {
    let randomNum= randoms();
    if (numbers[`${randomNum}`]) {
        numbers[`${randomNum}`]= numbers[`${randomNum}`]+1
    }else{
        numbers[`${randomNum}`]=1
    }
    }
    console.log(numbers)
    return numbers
}
process.on("message", (msg)=>{
    if (msg) {
        let result = createNum(msg.qty)
        process.send({result})
    }
})
