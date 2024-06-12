import { Link } from 'react-router-dom';
import { ReviewData, ReviewStatus, useCreateReview, useGetReview, useUpdateReview } from './reviewFunctions';
import './Review.css'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReviewPopup from '../../components/popups/ReviewPopup';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Review = () => {
    const token = localStorage.getItem('token');
    const [reviewFormInfo, setReviewFormInfo] = useState<ReviewStatus>({
        message: "",
        status: ""
    });

    //popup
    const [showPopup, setShowPopup] = useState<boolean>(false);

    //create
    const createReviewForm = useForm<ReviewData>({
        defaultValues: {
            title: '',
            description: '',
            rate: undefined
        }
    })

    const createReviewMutation = useCreateReview(setReviewFormInfo, token);

    const onCreateSubmit = async (data: ReviewData) => {
        try {
            createReviewMutation.mutate({
                reviewData: data,
                token: token
            }, {
                onSuccess: () => {
                    getReview.refetch();
                    setShowPopup(true);
                },
                onError: () => {
                    setShowPopup(true);
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }


    //update
    const [showEditInputs, setShowEditInputs] = useState<boolean>(false)
    const handleShowEditInputs = () => {
        setShowEditInputs(!showEditInputs);
    }

    const updateReviewForm = useForm<ReviewData>({
        defaultValues: {
            title: '',
            description: '',
            rate: -1
        }
    })

    const updateReviewMutation = useUpdateReview(setReviewFormInfo, token);

    const onUpdateSubmit = async (data: ReviewData) => {
        try {
            updateReviewMutation.mutate({
                reviewData: data,
                token: token
            }, {
                onSuccess: () => {
                    getReview.refetch();
                    setShowPopup(true);
                    setShowEditInputs(false);
                },
                onError: () => {
                    setShowPopup(true);
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }


    //get
    const getReview = useGetReview(token, updateReviewForm);


    return (
        <>
            <Navbar />
            <div className="h-full w-full">
                <div className="review-banner"></div>
                <div className='w-full'>
                    <div className='max-w-6xl my-0 mx-auto h-full flex flex-col items-center justify-center'>
                        <h1 className='my-10 text-center text-4xl'>Rate our service!</h1>
                        {token ?
                            (<>
                                {getReview.isLoading ? (<div className='spinner'></div>) : (
                                    <>
                                        {getReview.data ? (
                                            <>
                                                {showEditInputs ? (
                                                    // update review form
                                                    <>
                                                        <form className="px-4 flex-column-center w-full gap-10" onSubmit={updateReviewForm.handleSubmit(onUpdateSubmit)}>
                                                            <div className='flex w-full gap-2'>
                                                                <div className="flex flex-col items-start w-3/4">
                                                                    <label className='flex flex-col w-full'> <span className='text-xl'>Title</span>
                                                                        <span className={`text-sm min-h-5  text-red-400 transition-all ${updateReviewForm.formState.errors.title?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{updateReviewForm.formState.errors.title?.message}</span>
                                                                        <input className={`p-2 ${updateReviewForm.formState.errors.title ? "invalid-input" : "valid-input"}`} type="text"  {...updateReviewForm.register("title", { required: "Field required" })}></input>
                                                                    </label>
                                                                </div>
                                                                <div className="flex flex-col items-start w-1/4">
                                                                    <label className='flex flex-col w-full'> <span className='text-xl'>Rating</span>
                                                                        <span className={`text-sm min-h-5  text-red-400 transition-all ${updateReviewForm.formState.errors.rate?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{updateReviewForm.formState.errors.rate?.message}</span>
                                                                        <input className={`p-2 ${updateReviewForm.formState.errors.rate ? "invalid-input" : "valid-input"}`} type="number"  {...updateReviewForm.register("rate", { required: "Field required", min: { value: 1, message: "Rating from 1 to 5" }, max: { value: 5, message: "Rating from 1 to 5" } })}></input>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col items-start w-full h-full">
                                                                <label className='flex flex-col w-full'> <span className='text-xl'>Description</span>
                                                                    <span className={`text-sm min-h-5  text-red-400 transition-all ${updateReviewForm.formState.errors.description?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{updateReviewForm.formState.errors.description?.message}</span>
                                                                    <textarea className={`w-full h-100 p-2 ${updateReviewForm.formState.errors.description ? "invalid-input" : "valid-input"}`} {...updateReviewForm.register("description", { required: "Field required" })}></textarea>
                                                                </label>
                                                            </div>
                                                            <button className="auth-button mb-2" type="submit">Edit Review</button>
                                                        </form>
                                                        <button className='mb-10' onClick={handleShowEditInputs}>Go back</button>
                                                    </>
                                                ) : (
                                                    // review description
                                                    <div className='flex flex-col justify-center items-center gap-20 w-full'>
                                                        <div className='w-full'>
                                                            <h2 className='my-10 text-center text-2xl'>Your review</h2>
                                                            <div className='flex flex-col items-center justify-center gap-10'>
                                                                <div className='flex flex-col items-center justify-center w-full'>
                                                                    <span className='text-xl'>Title</span>
                                                                    <span>{getReview.data.data.title}</span>
                                                                </div>
                                                                <div className='flex flex-col items-center justify-center w-full'>
                                                                    <span className='text-xl'>Rating</span>
                                                                    <span>{getReview.data.data.rate}</span>
                                                                </div>
                                                                <div className='flex flex-col items-center justify-center w-full'>
                                                                    <span className='text-xl'>Description</span>
                                                                    <span className='text-center w-full h-auto break-words'>{getReview.data.data.description}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button className="auth-button mb-10" onClick={handleShowEditInputs}>Edit review</button>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            // create review form
                                            <form className="px-4 flex-column-center w-full gap-10" onSubmit={createReviewForm.handleSubmit(onCreateSubmit)}>
                                                <div className='flex w-full gap-2'>
                                                    <div className="flex flex-col items-start w-3/4">
                                                        <label className='flex flex-col w-full'> <span className='text-xl'>Title</span>
                                                            <span className={`text-sm min-h-5  text-red-400 transition-all ${createReviewForm.formState.errors.title?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{createReviewForm.formState.errors.title?.message}</span>
                                                            <input className={`p-2 ${createReviewForm.formState.errors.title ? "invalid-input" : "valid-input"}`} type="text"  {...createReviewForm.register("title", { required: "Field required" })}></input>
                                                        </label>
                                                    </div>
                                                    <div className="flex flex-col items-start w-1/4">
                                                        <label className='flex flex-col w-full'> <span className='text-xl'>Rating</span>
                                                            <span className={`text-sm min-h-5  text-red-400 transition-all ${createReviewForm.formState.errors.rate?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{createReviewForm.formState.errors.rate?.message}</span>
                                                            <input className={`p-2 ${createReviewForm.formState.errors.rate ? "invalid-input" : "valid-input"}`} type="number"  {...createReviewForm.register("rate", { required: "Field required", min: { value: 1, message: "Rating from 1 to 5" }, max: { value: 5, message: "Rating from 1 to 5" } })}></input>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start w-full h-full">
                                                    <label className='flex flex-col w-full'> <span className='text-xl'>Description</span>
                                                        <span className={`text-sm min-h-5  text-red-400 transition-all ${createReviewForm.formState.errors.description?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{createReviewForm.formState.errors.description?.message}</span>
                                                        <textarea className={`w-full h-100 p-2 ${createReviewForm.formState.errors.description ? "invalid-input" : "valid-input"}`} {...createReviewForm.register("description", { required: "Field required" })}></textarea>
                                                    </label>
                                                </div>
                                                <button className="no-underline text-white rounded-xl transition-all 
                                                    py-3 px-5 bg-slate-500 text-lg hover:bg-slate-600 mb-10" type="submit">
                                                        Create Review
                                                </button>
                                            </form>
                                        )}
                                    </>
                                )}
                            </>
                            ) :
                            (
                                // login
                                <div className='flex flex-col items-center justify-center gap-10'>
                                    <span className='text-lg'>Please login before you add your review:</span>
                                    <Link className='review-login-button' to='/login'>Log In</Link>
                                </div>
                            )
                        }
                        {/* popup */}
                        {showPopup && (
                            <ReviewPopup status={reviewFormInfo.status} message={reviewFormInfo.message} onClose={() => setShowPopup(false)} />
                        )}
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}
export default Review