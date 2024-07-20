import { useContext, createContext, useState } from "react"

// Create a Context for the data
const DataContext = createContext()

// Provider component to manage and provide context data
const DataProvider = ({ children }) => {
    // State for managing hostels data
    const [hostels, setHostels] = useState(null)
    // State for managing teams data
    const [teams, setTeams] = useState(null)
    // State for managing allotment data, initially from localStorage if available
    const [allotment, setAllotment] = useState(JSON.parse(localStorage.getItem("allotment")) || null)
    // State for managing hostel-related data
    const [hostelData, setHostelData] = useState(null)
    // State for managing selected hostel
    const [selectHostel, setSelectHostel] = useState(null)
    // State for managing notifications
    const [notification, setNotifications] = useState([])

    // Return the context provider with state and setter functions
    return (
        <DataContext.Provider value={{ 
            hostels, setHostels, 
            teams, setTeams, 
            allotment, setAllotment, 
            hostelData, setHostelData, 
            selectHostel, setSelectHostel, 
            notification, setNotifications 
        }}>
            {children}
        </DataContext.Provider>
    )
}

// Custom hook for using the data context
const useData = () => useContext(DataContext)

export { useData }
export default DataProvider
