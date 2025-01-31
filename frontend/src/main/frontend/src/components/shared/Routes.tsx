import {Routes, Route} from "react-router-dom"
import HomePage from "@/components/custom/home/HomePage"
import NotFound from "@/components/shared/NotFound"

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>

            {/* Other Routes */}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default RoutesComponent
