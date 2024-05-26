import "./Service.css"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import ServiceInformation from "../../components/service_information/ServiceInformation"
import {Link} from "react-router-dom";
import ServiceCarousel from "../../components/service_carousel/ServiceCarousel";
import { useQuery } from 'react-query';
import { fetchFeaturedServices, findServiceDataById, ServiceCarouselProps, ServiceData } from './serviceData';
import { useLocation } from "react-router-dom";

const Services = () =>{
    const serviceId = useLocation()
    const { service_id } = serviceId.state
    const asoText = {title: "Our service is a guarantee of quality", description: "No one knows your car like we do, which is why we can solve any problem you have. We are flexible and professional. You'll always leave us satisfied and confident in your vehicle. We understand that every day brings its challenges, so we guarantee reliability on every mile and no unpleasant surprises on the road. We take care of your car! Our service offers quick and convenient solutions tailored to your needs. Save time and stay calm. Servicing your car can truly be a pleasant experience!"}

    const {data: availableServices, error: availableServicesError, isLoading: availableServicesIsLoading } = useQuery(['featuredServices'], fetchFeaturedServices);
    
    if (availableServicesIsLoading) {
        return <div className="spinner"></div>
      }

    const filtredService = availableServices.filter((service: ServiceData) => service.serviceId == service_id)
    const currentService = filtredService[0]

    return(
        <>
            <Navbar />
            <div className="flex flex-col justify-center">
                <div className="body-container flex flex-col">
                    <div className="image-container">
                        <img className="service-image"  src={`data:image/jpeg;base64,${currentService.smallPhoto}`} />
                        <div className="service-image-overlay"></div>
                        <div className="text-overlay flex justify-center">
                            <p className="text-white font-bold">{currentService.name}</p>
                        </div>
                    </div>

                    <ServiceInformation title={currentService.name} description={currentService.description} />
                    <ServiceInformation title={asoText.title} description={asoText.description} />

                    <div className="schedule-service-container justify-center items-center flex flex-col gap-20">
                        <p className="text-3xl">Schedule a service appointment</p>

                        <Link to="/" className="schedule-service-button">Book an appointment</Link>
                    </div>

                    <ServiceCarousel serviceData={availableServices} currentServiceId={service_id} />
 
                    
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Services