import { useContext, createContext, useState } from "react"

const DataContext = createContext()

const DataProvider = ({children}) => {
    const [hostels, setHostels] = useState(null)
    const [teams, setTeams] = useState(null)
    const [allotment, setAllotment] = useState(JSON.parse(localStorage.getItem("allotment")) || null)
    const [hostelData, setHostelData] = useState(null)
    const [selectHostel, setSelectHostel]  = useState(null)
    const [notification, setNotifications] = useState([])

    return (
        <DataContext.Provider value = {{hostels, setHostels, teams, 
                                        setTeams, allotment, setAllotment, 
                                        hostelData, selectHostel, setSelectHostel, setHostelData,
                                        notification, setNotifications}}>
            {children}
        </DataContext.Provider>
    )
}

const useData = () => useContext(DataContext)

export {useData}
export default DataProvider