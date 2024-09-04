import { Header } from "./components/header"

export default function DashboardLatouy({children}:{children:React.ReactNode} ){
return(
    <>
        <Header />
        {children}
    </>
)

}