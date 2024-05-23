import "./Services.css"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import ServiceInformation from "../../components/service_information/ServiceInformation"
import {Link} from "react-router-dom";
import ServiceCarousel from "../../components/service_carousel/ServiceCarousel";
import { useQuery } from 'react-query';
import { fetchAvailableServices, findServiceDataById, ServiceCarouselProps, ServiceData, classSelector } from '../service/serviceData';



const Services = () => {

    const {data, error, isLoading} = useQuery(['availableServices'], fetchAvailableServices);
    console.log(data)

    return(
        <>
            <Navbar />
            <div className="services-wrapper flex flex-wrap mx">
                {data && data.map((service: ServiceData, index: number) => (
                    <Link key={index} to = "/" className={classSelector(index) ? "small-service" : "big-service"}>
                        <img className={classSelector(index) ? "small-image" : "big-image"} src={`data:image/jpeg;base64,${service.smallPhoto}`} />
                        <div className="image-text-services">
                            <p className="text-white font-bold">{service.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <Footer />
        </>
    )
}

export default Services