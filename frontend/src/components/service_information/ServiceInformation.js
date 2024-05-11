import "./ServiceInformation.css"



const serviceInformation = (props) =>{

    return(
        <>
            <div className="text-wrapper flex justify-center flex-col gap-12">
                <p className="text-5xl font-bold">{props.title}</p>
                <div className="description-body bg-white text-center">
                    <p className="description-text">{props.description}</p>
                </div>
            </div>
        </>
    )
}

export default serviceInformation