import { useEffect, useRef, useState } from "react";
import "./TicketForm.css";
import Navbar from "../../components/navbar/Navbar";
import { ServicesForm } from "../../components/ticket_form_components/ServicesForm";
import { ScheduleForm } from "../../components/ticket_form_components/ScheduleForm";
import { ClientDataForm } from "../../components/ticket_form_components/ClientDataForm";
import { CarForm } from "../../components/ticket_form_components/CarForm";
import { ConfirmationForm } from "../../components/ticket_form_components/ConfirmationForm";
import { useQuery } from "react-query";
import { fetchService, fetchTicketServices } from "./ticketFormFunctions";
import { Car, Service, TicketData, Customer, Schedule, TicketDataContext, CustomerDataContext, CarDataContext, SelectedServiceContext, ScheduleDataContext } from "./ticketFormFunctions";
import Footer from "../../components/footer/Footer";
import { useSearchParams } from "react-router-dom";


export const TicketForm = () => {
    const [step, setStep] = useState<number>(1);
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    const [selectedDate, setSelectedDate] = useState<Schedule>({
        date: new Date(0),
        hour: ''
    });
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const serviceId = searchParams.get("service-id");
        if (serviceId) {
            fetchService(serviceId).then((response) => {
                console.log(response.data);
                setSelectedServices([response.data]);
            })
        }
    }, [searchParams])

    const [carData, setCarData] = useState<Car>({
        model: '',
        manufacturedYear: -1,
        licensePlate: '',
        vin: '',
        color: '',
        mileage: -1,
    });

    const [customerData, setCustomerData] = useState<Customer>({
        firstName: '',
        lastName: '',
        telephoneNumber: '',
        email: '',
        address: {
            country: '',
            city: '',
            street: '',
            postalCode: ''
        }
    });

    const [ticketData, setTicketData] = useState<TicketData>({
        fullCost: -1,
        description: '',
        services: [{
            serviceId: -1,
            name: '',
            description: '',
            estimatedRepairTime: -1,
            cost: -1
        }],
        car: {
            model: '',
            manufacturedYear: -1,
            licensePlate: '',
            vin: '',
            color: '',
            mileage: -1
        },
        customer: {
            firstName: '',
            lastName: '',
            telephoneNumber: '',
            email: '',
            address: {
                country: '',
                city: '',
                street: '',
                postalCode: ''
            }
        },
        schedule: {
            date: null,
            hour: ''
        }
    });

    //service fetching
    const { data, isLoading } = useQuery(
        ['ticketServices'],
        fetchTicketServices
    );

    const scrollRef = useRef<HTMLDivElement>(null);

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
        scrollRef.current?.scrollIntoView()
    };

    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
        scrollRef.current?.scrollIntoView()
    };

    useEffect(() => {
        console.log("Updated ticketData's services:", ticketData.services);
    }, [ticketData.services]);

    console.log(ticketData);
    return (
        <>
            <Navbar />
            <div className="w-full h-full">
                <div className="mx-auto my-0 ticket-form-wrapper">
                    <div className="flex flex-col items-center justify-center gap-5 last:gap-16">
                        <div className="w-full flex flex-col gap-5">
                            <h1 className="text-4xl text-center py-7">Creating ticket</h1>
                            <div className="flex justify-between items-center w-full gap-1">
                                <div className="form-info-box">
                                    <h3 className="text-lg font-bold">Selected services</h3>
                                    {selectedServices && (
                                        <div className="w-full">
                                            {selectedServices.map((service, index) => {
                                                return (<div key={index}>{service.name}</div>)
                                            })}
                                        </div>
                                    )}
                                </div>
                                <div className="form-info-box">
                                    <h3 className="text-lg font-bold">Scheduled date</h3>
                                    <div className="w-full">
                                        <p>
                                            {selectedDate && selectedDate.date ? (selectedDate.date.toDateString() != new Date(0).toDateString() 
                                            ? (selectedDate.date.toDateString()): null) 
                                            : null}
                                        </p>
                                        <p>{selectedDate.hour}</p>
                                    </div>
                                </div>
                                <div className="form-info-box">
                                    <h3 className="text-lg font-bold">Car</h3>
                                    { ticketData.car.model != ''  && (
                                        <div className="w-full">
                                            <p>Model: {ticketData.car.model}</p>
                                            <p>Color: {ticketData.car.color}</p>
                                            <p>License Plate: {ticketData.car.licensePlate}</p>
                                            <p>VIN: {ticketData.car.vin}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="form-info-box">
                                    <h3 className="text-lg font-bold">Personal details</h3>
                                    <div className="w-full">
                                        <p> {ticketData.customer.firstName}</p>
                                        <p> {ticketData.customer.lastName}</p>
                                        <p> {ticketData.customer.email}</p>
                                        <p> {ticketData.customer.telephoneNumber}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-around bg-gray-100 text-xl p-4">
                                <div className={`${step >= 1 ? 'text-red-500' : ''}`}>Services</div>
                                <div className={`${step >= 2 ? 'text-red-500' : ''}`}>Schedule</div>
                                <div className={`${step >= 3 ? 'text-red-500' : ''}`}>Car details</div>
                                <div className={`${step >= 4 ? 'text-red-500' : ''}`}>Client details</div>
                                <div className={`${step >= 5 ? 'text-red-500' : ''}`}>Summary</div>
                            </div>
                        </div>
                        <div className="w-full h-full bg-gray-50 p-7 mb-10" ref={scrollRef}>
                            <TicketDataContext.Provider value={{ ticketData, setTicketData }}>
                                {step === 1 && (
                                    <SelectedServiceContext.Provider value={{ selectedServices, setSelectedServices }}>
                                        {isLoading ? (<div className="spinner"></div>) : (<ServicesForm nextStep={nextStep} services={data} />)}
                                    </SelectedServiceContext.Provider>
                                )}
                                {step === 2 && (
                                    <ScheduleDataContext.Provider value={{selectedDate, setSelectedDate}}>
                                        <ScheduleForm nextStep={nextStep} prevStep={prevStep} />
                                    </ScheduleDataContext.Provider>

                                )}
                                {step === 3 && (
                                    <CarDataContext.Provider value={{ carData, setCarData }}>
                                        <CarForm nextStep={nextStep} prevStep={prevStep} />
                                    </CarDataContext.Provider>
                                )}
                                {step === 4 && (
                                    <CustomerDataContext.Provider value={{ customerData, setCustomerData }}>
                                        <ClientDataForm nextStep={nextStep} prevStep={prevStep} />
                                    </CustomerDataContext.Provider>
                                )}
                                {step === 5 && (
                                    <ConfirmationForm prevStep={prevStep} />
                                )}
                            </TicketDataContext.Provider>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
