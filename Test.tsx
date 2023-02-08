// export function PageTeste() {
    
//     const [texto, setTexto] = useState<string>('')
//     const [list, setList] = useState<teste[]>([{
//         id: 1,
//         idade: 28,
//         isPersonal: false,
//         nome: 'Guilherme',
//         array: [{
//             nome: "jao",
//             sobrenome: "aleatorio"
//         }]
//     }, {
//         id: 1,
//         idade: 29,
//         isPersonal: false,
//         nome: 'Guilherme',
//         array: [{
//             nome: "jao",
//             sobrenome: "aleatorio"
//         }]
//     }])

//     async function filterObject() {
//         let data = {
//             property: 'idade',
//             // objectProperty: 'nome',
//             search: texto,
//         }

//         let response = useSearch(list, data)
//         console.table(response)
//     }


//     return <div>
//         <input type="text" value={texto} onChange={(e:any) => setTexto(e.target.value)} />
//         <button onClick={filterObject}>Ativar</button>
//     </div>
// }