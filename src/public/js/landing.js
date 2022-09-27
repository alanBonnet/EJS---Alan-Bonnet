console.log('Hola desde archivo estático')



const eliminarTarea = async (id) => {
    try {
        await fetch(`http://localhost:3000/task/${id}`,
        {method: 'DELETE'})
        console.log("usuario eliminado correctamente")
        setTimeout(()=>{location.reload()},5000)
    } catch (error) {
        console.log("Hubo un error con la petición: ", error.message)
    }
}






const editarTarea = async (id,index) => {
    const nombreTarea= document.getElementById(`nombreTarea${index}`);
    const motivoTarea= document.getElementById(`motivoTarea${index}`);
    const fechaTarea = document.getElementById(`fechaTarea${index}`);
    const horaTarea = document.getElementById(`horaTarea${index}`);
    const estadoTarea = document.getElementById(`estadoTarea${index}`)
    const formatoFecha = fechaTarea.value+"T";
    const formatoHora = horaTarea.value+":00";
    const form = {
        nombre:nombreTarea.value,
        motivo:motivoTarea.value,
        fecha: new Date(`${formatoFecha}${formatoHora}`),
        estado:estadoTarea.options[estadoTarea.selectedIndex].index
    }
    console.log(form)
    try {
        await fetch(`http://localhost:3000/task/${id}`,
            {
                method:'PUT',
                headers:{
                    'Content-type': 'application/json'
                },
                body:JSON.stringify(form)
            }
        )
        .then(res => {
            if (res.ok) { console.log("HTTP request successful") }
            else { console.log("HTTP request unsuccessful") }
            return res
        })
        .then(res => res.json())
        .then(data => {console.log(data); setTimeout(()=>{location.reload()},5000)})
        .catch(error => console.log(error))
    } catch (error) {
        console.log(error.message)
    }
}