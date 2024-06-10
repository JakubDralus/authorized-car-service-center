import "./Services.css"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import { Link } from "react-router-dom";
import { useQuery } from 'react-query';
import { fetchFeaturedServices, ServiceData, classSelector } from '../service/serviceData';



const Services = () => {

    const { data, error, isLoading } = useQuery(['availableServices'], fetchFeaturedServices);

    return (
        <>
            <Navbar />
            {isLoading ? (
                <div className="spinner"></div>
            ):(
            <div className="services-body-wrapper">
                <div className="services-wrapper flex flex-wrap mx">
                    {data && data.map((service: ServiceData, index: number) => (
                        <Link key={index} to ={`/service/${service.serviceId}`} state={{service_id: service.serviceId}}  className={classSelector(index) ? "small-service" : "big-service"}>
                            <img className={classSelector(index) ? "small-image" : "big-image"} src={`data:image/jpeg;base64,${service.smallPhoto}`} alt="service"/>
                            <div className="image-text-services">
                                <p className="text-white font-bold">{service.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            )}

            <Footer />
        </>
    )
}

export default Services