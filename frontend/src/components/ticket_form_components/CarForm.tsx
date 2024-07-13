import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Car,TicketDataContext } from "../../pages/ticket_form/ticketFormFunctions";

interface CarFormProps {
  nextStep: () => void;
  prevStep: () => void;
}

export const CarForm: React.FC<CarFormProps> = ({ prevStep, nextStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Car>();
  const ticketDataContext = useContext(TicketDataContext);

  const onSubmit = (data: Car) => {
    ticketDataContext?.setTicketData((prevTicketData) => ({
      ...prevTicketData,
      car: {
        model: data.model,
        manufacturedYear: data.manufacturedYear,
        licensePlate: data.licensePlate,
        vin: data.vin,
        color: data.color,
        mileage: data.mileage,
      },
    }));
    nextStep();
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h2 className="text-2xl mb-20 mt-10">Provide your car details</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex justify-center gap-10 items-center mb-20 max-[680px]:flex-col max-[680px]:gap-8">
          <div className="flex justify-center items-start flex-col gap-8">
            <label className="flex flex-col gap-3">
              Model
              <input
                className="car-form-input"
                type="text"
                {...register("model", { required: "Model is required" })}
              />
              {errors.model && (<p className="text-red-500 text-sm">{errors.model.message}</p>)}
            </label>
            
            <label className="flex flex-col gap-3">
              VIN
              <input
                className="car-form-input"
                type="text"
                maxLength={17}
                {...register("vin", {
                  required: "VIN is required",
                  minLength: {
                    value: 17,
                    message: "VIN must be 17 characters",
                  },
                  maxLength: {
                    value: 17,
                    message: "VIN must be 17 characters",
                  },
                })}
              />
              {errors.vin && (<p className="text-red-500 text-sm">{errors.vin.message}</p>)}
            </label>

            <label className="flex flex-col gap-3">
              Year of manufacture
              <input
                className="car-form-input"
                type="number"
                {...register("manufacturedYear", {
                  required: "Year of manufacture is required",
                  valueAsNumber: true,
                  min: { value: 1886, message: "Year must be after 1886" },
                  max: {
                    value: new Date().getFullYear(),
                    message: `Year must be before or equal to ${new Date().getFullYear()}`,
                  },
                })}
              />
              {errors.manufacturedYear && (
                <p className="text-red-500 text-sm">
                  {errors.manufacturedYear.message}
                </p>
              )}
            </label>
          </div>

          <div className="flex justify-center items-start flex-col gap-8">
            <label className="flex flex-col gap-3">
              License plate number
              <input
                className="car-form-input"
                type="text"
                maxLength={7}
                {...register("licensePlate", {
                  required: "License plate number is required",
                  pattern: {
                    value: /^[A-Z0-9]{1,7}$/,
                    message: "License plate number must be alphanumeric and up to 7 characters",
                  },
                })}
              />
              {errors.licensePlate && (
                <p className="text-red-500 text-sm">
                  {errors.licensePlate.message}
                </p>
              )}
            </label>

            <label className="flex flex-col gap-3">
              Color
              <input
                className="car-form-input"
                type="text"
                {...register("color", {
                  required: "Color is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Color must not contain numbers",
                  },
                })}
              />
              {errors.color && (
                <p className="text-red-500 text-sm">{errors.color.message}</p>
              )}
            </label>

            <label className="flex flex-col gap-3">
              Mileage
              <input
                className="car-form-input"
                type="number"
                {...register("mileage", {
                  required: "Mileage is required",
                  valueAsNumber: true,
                })}
              />
              {errors.mileage && (<p className="text-red-500 text-sm">{errors.mileage.message}</p>)}
            </label>
          </div>
        </div>

        <div className="w-full h-full flex justify-between sticky bottom-7 mt-12">
          <button type="button" className="ticket-form-button" onClick={prevStep}>Prev</button>
          <button type="submit" className="ticket-form-button">Next</button>
        </div>
      </form>
    </div>
  );
};
