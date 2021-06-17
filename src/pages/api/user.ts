import { NextApiRequest, NextApiResponse } from "next"

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        {id:1, name: 'Érico'},
        {id:2, name: 'Brisa'},
        {id:3, name: 'Lua'}
    ]

    return response.json(users)
}

//Serverless - não existe um servidor 24h funcionando para dar informações e sim vai subir um ambiente isolado