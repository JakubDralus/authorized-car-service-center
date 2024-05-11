import "./Services.css"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import ServiceInformation from "../../components/service_information/ServiceInformation"
import {Link} from "react-router-dom";

const Services = () =>{
    const serviceText = {title: "titletitl etitle", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et scelerisque sem. Integer bibendum elit sapien, nec maximus nisl tempus ut. Vivamus a orci turpis. Mauris auctor condimentum sodales. Vivamus nisl mauris, aliquam sed ligula quis, tincidunt pharetra eros. Phasellus nec arcu ornare, egestas odio non, rutrum metus. Maecenas eleifend rhoncus turpis viverra vulputate. Nam in convallis tellus. Cras nec vestibulum nunc. Integer porttitor leo felis, vel placerat nisi lacinia id. Donec fermentum ipsum eget eros mattis, et tempus diam consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut eget sagittis est, in imperdiet ipsum. Sed sodales congue ultricies. Vestibulum dolor enim, feugiat id tempor in, dictum eget nibh. Suspendisse condimentum lacus vel nunc laoreet mollis. "};
    const asoText = {title: "title", description: "ąąąąąąąąąąąąąąąąąąąąąąą"}

    return(
        <>
            <Navbar />
            <div className="body-container flex flex-col">
                <div className="w-full image-container">
                    <img className="service-image w-full"  src={require('../../components/service_card/opona.png')} />
                    <div className="flex flex-col align- text-overlay">
                        <p className="text-white font-bold text-4xl">TITLE TITLE TITLE</p>
                    </div>
                </div>

                <ServiceInformation title={serviceText.title} description={serviceText.description} />
                <ServiceInformation title={asoText.title} description={asoText.description} />


                <div className="schedule-service-container flex flex-col gap-20">
                    <p className="text-3xl">Schedule a service appointment</p>

                    <Link to="/" className="schedule-service-button">Book an appointment</Link>
                </div>
            </div>
            
            <Footer />
        </>
    )
}

export default Services