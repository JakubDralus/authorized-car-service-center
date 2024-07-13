import React,{ useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { CustomerForm,TicketDataContext } from "../../pages/ticket_form/ticketFormFunctions";

interface ClientDataProps {
  nextStep: () => void,
  prevStep: () => void,
}

export const ClientDataForm: React.FC<ClientDataProps> = ({ prevStep, nextStep }) => {
    const [isAddressVisible, setisAddressVisible] = useState<boolean>(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
    } = useForm<CustomerForm>();
    const ticketDataContext = useContext(TicketDataContext);

    const toggleAddress = () => {
      setisAddressVisible(!isAddressVisible);
    };

    const onSubmit = (data: CustomerForm) => {
      ticketDataContext?.setTicketData((prevTicketData) => ({
        ...prevTicketData,
        description: data.description,
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          telephoneNumber: data.telephoneNumber,
          email: data.email,
          address: {
            country: data.address?.country || "",
            city: data.address?.city || "",
            street: data.address?.street || "",
            postalCode: data.address?.postalCode || "",
          },
        },
      }));
      nextStep();
    };

  const validateAddress = () => {
    const values = getValues("address");
    const filledFields = Object.values(values).filter((value) => value !== "").length;
    return (
      filledFields === 0 ||
      filledFields === Object.keys(values).length ||
      "Fill all address fields or leave them all empty."
    );
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h2 className="text-2xl mb-20 mt-10"> Provide your personal information </h2>
      <div className="car-form-wrapper mx-auto">
        <form className="w-full flex flex-col justify-between items-center mb-20 gap-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center items-start gap-10 max-[760px]:flex-col">
            <label className="flex flex-col gap-3 max-[760px]:flex-col">
              First name
              <input
                className="customer-form-input"
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-3">
              Last name
              <input
                className="customer-form-input"
                type="text"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </label>
          </div>
          <div className="flex justify-center items-start gap-10 max-[760px]:flex-col">
            <label className="flex flex-col gap-3">
              Phone number
              <input
                className="customer-form-input"
                type="text"
                {...register("telephoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone number must be numeric",
                  },
                })}
              />
              {errors.telephoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.telephoneNumber.message}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-3">
              E-mail
              <input
                className="customer-form-input"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </label>
          </div>
          <label className="w-full flex flex-col gap-3">
            Description
            <textarea
              className="w-full h-72 p-2 border-2 border-gray-400 focus:outline-0 focus:border-black"
              {...register("description")}
            />
          </label>
          <div className="w-full bg-white border-2 border-gray-400 p-3">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={toggleAddress}
            >
              Address (optional)<div>&#8595;</div>
            </div>
            {isAddressVisible && (
              <div className="py-10 flex flex-col gap-10">
                <div className="flex justify-center items-start gap-10 max-[760px]:flex-col">
                  <label className="flex flex-col gap-3 max-[760px]:flex-col">
                    Street
                    <input
                      className="address-form-input"
                      type="text"
                      {...register("address.street", {
                        validate: validateAddress,
                      })}
                    />
                  </label>
                  <label className="flex flex-col gap-3">
                    City
                    <input
                      className="address-form-input"
                      type="text"
                      {...register("address.city", {
                        validate: validateAddress,
                      })}
                    />
                  </label>
                </div>
                <div className="flex justify-center items-start gap-10 max-[760px]:flex-col">
                  <label className="flex flex-col gap-3">
                    Postal Code
                    <input
                      className="address-form-input"
                      type="text"
                      {...register("address.postalCode", {
                        validate: validateAddress,
                        pattern: {
                          value: /^[0-9]{5}$/,
                          message: "Postal code must be 5 digits",
                        },
                      })}
                    />
                    {errors.address?.postalCode && (
                      <p className="text-red-500 text-sm">
                        {errors.address.postalCode.message}
                      </p>
                    )}
                  </label>
                  <label className="flex flex-col gap-3">
                    Country
                    <input
                      className="address-form-input"
                      type="text"
                      {...register("address.country", {
                        validate: validateAddress,
                      })}
                    />
                  </label>
                </div>
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="w-full h-full flex justify-between sticky bottom-7 mt-12">
            <button type="button" className="ticket-form-button" onClick={prevStep}>Prev</button>
            <button type="submit" className="ticket-form-button">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}
