console.log('my script is loaded')

function displayFilter(){
    console.log('filter on')
    if (document.getElementById('filter-comp').style.visibility=='visible')
    {
        document.getElementById('filter-comp').style.visibility='hidden'

    }
    else{
        document.getElementById('filter-comp').style.visibility='visible'
    }

}
