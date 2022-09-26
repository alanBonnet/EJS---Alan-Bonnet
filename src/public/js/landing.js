console.log('Hola desde archivo estático')

const eliminarTarea = async (id) => {
    console.log(id)
    try {
        await fetch(`http://localhost:3000/task/${id}`,
        {method: 'DELETE'})
    console.log("usuario eliminado correctamente")
    } catch (error) {
        console.log("Hubo un error con la petición: ", error.message)
    }
}
const editarTarea = async (id) => {
    console.log(id)
    try {
        await fetch(`http://localhost:3000/task/${id}`,
        {method:'PUT',
        body:{
            id:1,
            nombre:"Terminar y entregar el TP de servidor1212",
            motivo:"Asi quedo libre para otras materias."
          }})
        
    } catch (error) {
        
    }
}