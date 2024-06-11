import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import "./Home.css"
import { Link } from "react-router-dom"
import ServiceCarousel from "../../components/service_carousel/ServiceCarousel"
import { fetchFeaturedServices } from '../service/serviceData';
import { useQuery } from 'react-query';
import Testimonial from "./Testimonial"

const Home = () => {
    const { data, isLoading } = useQuery(['featuredServices'], fetchFeaturedServices);

    return (
        <>
            <Navbar />
            <div className="w-full h-full">
                <div className="home-banner">
                    <div className="max-w-6xl my-0 mx-auto h-full">
                        <div className="flex flex-col items-start justify-center h-full gap-10">
                            <div className="flex flex-col gap-6">
                                <h1 className="text-5xl font-semibold text-black tracking-wide">Schedule a service appointment</h1>
                                <span className="text-2xl text-black">Servicing your car can be really fun!</span>
                            </div>
                            <Link className="no-underline text-white rounded-xl transition-all 
                                py-3 px-5 bg-slate-500 text-lg hover:bg-slate-600" to="/ticket-form">Create new ticket</Link>
                        </div>
                    </div>
                </div>
                <div className="h-64">
                    <div className="max-w-7xl my-0 mx-auto h-full flex items-center justify-center flex-col gap-8">
                        <h1 className="text-4xl text-center">Our service is a guarantee of quality!</h1>
                        <span className="text-lg text-center max-w-3xl"> Our service offers you easy and fast solutions, tailored to your needs. Save time and have peace of mind. Servicing your car can really be a pleasure!</span>
                    </div>
                </div>
                <div className="home-example-services ">
                    {isLoading ? (<div className="pt-10"><div className="spinner "></div></div>) : (<ServiceCarousel serviceData={data} />)}
                </div>

                <Testimonial/>

                <div className="home-schedule h-96 flex items-center justify-center">
                    <div className="max-w-xl flex flex-col items-center justify-center gap-6 text-white">
                        <h1 className="text-4xl">Book a service appointment</h1>
                        <span className="text-xl">Let the specialists take care of your car.</span>
                        <Link className="no-underline text-white rounded-xl transition-all 
                            py-3 px-5 bg-slate-500 text-lg hover:bg-slate-600" to="/ticket-form">Create new ticket</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Home