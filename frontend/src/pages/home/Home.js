import Navbar from "../../components/navbar/Navbar"
import "./Home.css"
import { Link } from "react-router-dom"

const Home = () =>{


    return (
        <>
            <Navbar/>
            <div className="home-container">
                <div className="home-banner">
                    <div className="banner-wrapper">
                        <div className="banner-info-container">
                            <h1>Schedule a service appointment</h1>
                            <div>Servicing your Škoda can be really fun!</div>
                            <Link to="/">Schedule an appointment</Link>
                        </div>
                    </div>
                </div>
                <div className="home-slogan">

                </div>
            </div>
        </>
    )
}
export default Home