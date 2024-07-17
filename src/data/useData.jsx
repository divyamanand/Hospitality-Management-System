import { useContext, createContext, useState } from "react"

const DataContext = createContext()

const DataProvider = ({children}) => {
    const [hostels, setHostels] = useState(null)
    const [teams, setTeams] = useState(null)
    const [allotment, setAllotment] = useState(null)

    return (
        <DataContext.Provider value = {{hostels, setHostels, teams, setTeams, allotment, setAllotment}}>
            {children}
        </DataContext.Provider>
    )
}

const useData = () => useContext(DataContext)

export {useData}
export default DataProvider