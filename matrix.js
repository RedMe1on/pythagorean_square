const form = document.getElementById("matrix");
const button = document.getElementById('calc_button')
button.addEventListener('click', calculate)


function getSumDigits(string) {
    let sum = 0
    string.split('').forEach(num => {
        sum += Number(num);
    })
    return sum
}

function getCountDigits(string) {
    let obj = {}
    for (let digit of string) {
        if (obj.hasOwnProperty(digit)) {
            obj[digit] += 1
        } else obj[digit] = 1
    }
    return obj
}

function fillTemplate(obj) {
    obj = {
        character: null,
        health: null,
        lucky: null,
        target: null,
        energy: null,
        logic: null,
        duty: null,
        family: null,
        interest: null,
        work: null,
        memory: null,
        habit: null
    }


}
function calculate(event) {
    // const day = document.getElementById('day').value
    // const month = document.getElementById('month').value
    // const year = document.getElementById('year').value
    const date = document.getElementById('birthday').value
    const arr = date.toString().split('-')

    const array = arr.map(num => num.replaceAll('0', ''))

    const day = array[2]
    const month = array[1]
    const year = array[0]
    console.log(array)
    let number_1 = 0
    for (let number of array) {
        number_1 += getSumDigits(number)
    }
    console.log('number_1', number_1)

    let number_2 = getSumDigits(number_1.toString())

    console.log('number_2', number_2)

    let number_3 = number_1 - day[0] * 2

    console.log('day[0]', day[0])
    console.log('number_3', number_3)

    let number_4 = getSumDigits(number_3.toString())

    console.log('number_4', number_4)
    const all_digits = day + month + year + number_1.toString() + number_2.toString() + number_3.toString() + number_4.toString()
    console.log('all_digits', all_digits)
    // const all_digits = day.toString() + month.toString() + year.toString()
    const obj = getCountDigits(all_digits)

    console.log(obj)


}