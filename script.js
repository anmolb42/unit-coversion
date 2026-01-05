//Creating a object that holds units, base and type of calculation
const categories={
    length:{
        type:'linear',
        baseUnit:'metre',
        units:{
            metre:'1',
            centimetre:'0.01',
            kilometre:'1000',
            foot:'0.3048',
            inch:'0.0254'

        }
    },
    mass:{
        type:'linear',
        baseUnit:'kilograms',
        units:{
            kilogram:'1',
            gram:'0.001',
            pound:'0.4536',
            ounce:'0.02835'
        }
    },
    time:{
        type:'linear',
        baseUnit:'seconds',
        units:{
            second:'1',
            minute:'60',
            hour:'3600',
        }
    },
    temperature:{
        type:'non-linear',
        baseUnit:'Celsius',
        units:{
            celsius:'1',
            fahrenheit:'32',
            kelvin:'273.15'
        }
    }

}

const conversionMaps={
    temperature:{
        toBase:{
            'celsius':(val)=>val,
            'fahrenheit':(val)=>(val-32)*5/9,
            'kelvin':(val)=>val-273.15,
        },
        fromBase:{
            'celsius':(base)=>base,
            'fahrenheit':(base)=>(base*9/5)+32,
            'kelvin':(base)=>base+273.15,
        }
    }
}

//Accessing DOM elements
const fromUnit=document.getElementById('fromUnits')
const toUnit=document.getElementById('toUnits')
const category = document.getElementById('category')
const convert = document.getElementById('convert')
const convertFrom=document.getElementById('convertedFrom').value
const convertTo = document.getElementById('convertedTo').value

//this function will determine our units everytime a category is changed
category.addEventListener('change',function(){
    const catName=this.value
    console.log(catName)
    const units = Object.keys(categories[catName].units)
    console.log(units)

    //First we remove all the existing options to add new 
    while(fromUnit.options.length>0||toUnit.options.length>0){
        fromUnit.options[0].remove()
        toUnit.options[0].remove()
    }

    //function to add new option based on selected category
    for(let i=0;i<=units.length-1;i++){
        const fromOption=document.createElement('option')
        const toOption=document.createElement('option')

        fromOption.value=`${units[i].toLowerCase()}`
        toOption.value=`${units[i].toLowerCase()}`

        fromOption.text=`${units[i]}`
        toOption.text=`${units[i]}`

        fromUnit.appendChild(fromOption)
        toUnit.appendChild(toOption)
    }
   
}  
)


//function for conversion calculations
convert.addEventListener('click',function(){
    const convertFrom=document.getElementById('convertedFrom').value
    const inputValue=parseFloat(convertFrom)
    if (isNaN(inputValue)) {
        document.getElementById('convertedTo').value = ''; // Clear output on invalid input
        return; // Exit early
    }
    const convertTo=document.getElementById('convertedTo').value
    const fromUnit=document.getElementById('fromUnits')
    const toUnit=document.getElementById('toUnits')
    const catName= category.value
    //getting the value of unit factors from categories
    const fromVal = (categories[catName].units[fromUnit.value])
    const toVal= (categories[catName].units[toUnit.value])
    const answer= document.getElementById('convertedTo')

    console.log(fromUnit.value,toUnit.value)
    console.log(fromVal,toVal)

    if(categories[catName].type=='linear'){
        const base =inputValue * fromVal
        const result = base/toVal
        answer.value=result.toFixed(2);
    //    const answer=document.getElementById()
        console.log(base, result)
    }
    else{
        const from= fromUnit.value
        const to = toUnit.value
        // console.log(from,to)
        // console.log(convertFrom,convertTo)
        const base=conversionMaps.temperature.toBase[from](inputValue)
        const result=conversionMaps.temperature.fromBase[to](base)
         console.log(base,result)
        answer.value=result.toFixed(2)
    }
   
    

})
