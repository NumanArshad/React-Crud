import React, { useState } from "react"
import context from "./themeContext"
const ThemeProvider = ({ children }) => {
    const theme = useState("light")
    return (<context.Provider value={theme}>
        {children}
    </context.Provider>)
}
export default ThemeProvider