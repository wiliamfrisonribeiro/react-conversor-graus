import { useState } from 'react'
import { Container } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
function App() {
  const tipos = [
    {
      descricao: 'Célcius',
      tipo: 'c',
    },
    {
      descricao: 'Fahrenheit',
      tipo: 'f',
    },
  ]
  const [temperatura1, setTemperatura1] = useState('')
  const [temperatura2, setTemperatura2] = useState('')
  const [tipo1, setTipo1] = useState('')
  const [tipo2, setTipo2] = useState('')

  const handleChangeTipo1 =  (event) =>  {
    const teste = event.target.value === 'c' ? 'f' : 'c'
    setTipo2(teste)
    setTipo1(event.target.value)


    if (temperatura1 && temperatura2) {     
      console.log("teste")
      getEnviar(temperatura1, tipo1)
    }
  }

  const handleChangeTipo2 = (event) => {
    const teste = event.target.value === 'c' ? 'f' : 'c'
    setTipo1(teste)
    setTipo2(event.target.value)

    
    if (temperatura1 && temperatura2) {     
      console.log("teste")
      getEnviar(temperatura1, tipo1)
    }
  }

  const handleChangeTemp1 =async (event) => {
    setTemperatura1(event.target.value)

    if(tipo1 && tipo2){
      console.log("teste2")
      debugger
      if(event.target.value === ''){
        debugger
        setTemperatura2("")
      }else{

        const tipo = tipo1 ? tipo1 : tipo2
        const temp = await getEnviar(event.target.value, tipo)
        console.log(temp)
        setTemperatura2(temp)
        console.log(temperatura2)
      }

    }
  }

  const handleChangeTemp2 = (event) => {
    setTemperatura2(event.target.value)
    if(tipo1 && tipo2){ 
      console.log("teste2")
      if(event.target.value === ''){
        debugger
        setTemperatura1("")
      }
    }
  }
  const getEnviar = async (temp, tipo) => {
    await fetch('http://localhost:3002/temperatura',
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "temperatura": temp, "tipo": tipo })
        })
        .then(response => response.json())
        .then(json => {
              debugger
            return json.temperatura
        })
        .catch(err => console.log(err))
}



  return (
    <Container maxWidth="sm">
      <h1>Temperatura</h1>
      <div>
        <FormControl variant="standard">
          <TextField
            id="outlined-select-currency"
            value={temperatura1}
            onChange={handleChangeTemp1}
          ></TextField>
          <TextField
            id="outlined-select-currency"
            select
            value={tipo1}
            onChange={handleChangeTipo1}
            size="small"
            color="grey"
            defaultValue="c"
          
          >
            {tipos.map((option) => (
              <MenuItem key={option.tipo} value={option.tipo}>
                {option.descricao}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl variant="standard">
          <h3> =</h3>
        </FormControl>
        <FormControl variant="standard">
          <TextField
            id="outlined-select-currency"
            value={temperatura2}
            onChange={handleChangeTemp2}
          ></TextField>
          <TextField
            id="outlined-select-currency"
            select
            value={tipo2}
            onChange={handleChangeTipo2}
            size="small"
            defaultValue={tipos[1].tipo}
          >
            {tipos.map((option) => (
              <MenuItem key={option.tipo} value={option.tipo}>
                {option.descricao}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </div>
    </Container>
  )
  /*  return (
   <div className="card">
      <h1>Conversor</h1>
      <select name="cars" id="cars">
        {
          tipos.map((tipos) => {
            <option >{tipos.descricao}</option>
          })
        }      
      </select>
      <br />
      <label>Conversor:</label>
      <br />
      <input type="text"></input>=<input type="text" readonly></input>
      <br />
      <button className="btn btn-primary" type="button">
        Converter
      </button>
    </div> 
  ) */
}

export default App
