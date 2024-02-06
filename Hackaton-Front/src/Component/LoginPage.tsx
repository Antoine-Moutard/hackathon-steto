import { Dispatch, SetStateAction } from "react"

type LoginPageProps = {
    etat:string,setEtat: Dispatch<SetStateAction<string>>
}

export const LoginPage = ({etat, setEtat}: LoginPageProps) => {

    function test(){
        let newEtat = "connect"
        setEtat(newEtat)
    }

    return (
        <div> 
            <table>
                <tr>
                    <th scope="col">XXXXX</th>
                    <th scope="col">YYYYY</th>
                    <th scope="col">AAAAA</th>
                </tr>
                <tr onClick={() => test()}>
                    <th scope="row">TR-7</th>
                    <td>7</td>
                    <td>4,569</td>
                </tr>
                <tr>
                    <th scope="row">Khiresh Odo</th>
                    <td>7</td>
                    <td>7,223</td>
                </tr>
                <tr>
                    <th scope="row">Mia Oolong</th>
                    <td>9</td>
                    <td>6,219</td>
                </tr>
            </table>
        </div>
    )
}