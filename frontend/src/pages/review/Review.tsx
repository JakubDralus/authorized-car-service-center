import { Link } from 'react-router-dom';
import { ReviewData, useCreateReview, useGetReview } from './reviewFunctions';
import './Review.css'
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Review = () => {
    const token = localStorage.getItem('token');

    //create form
    const [reviewFormInfo, setReviewFormInfo] = useState<string>("");
    const reviewForm = useForm<ReviewData>({
        defaultValues: {
            title: '',
            description: '',
            rate: undefined
        }
    })

    //get query
    const getReview = useGetReview(token);
    console.log(getReview.data)


    //create mutation
    const createReviewMutation = useCreateReview(setReviewFormInfo, token);
    const onSubmit = async (data: ReviewData) => {
        console.log(data)

        try {
            createReviewMutation.mutate({
                reviewData: data,
                token: token
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    //update mutation

    return (

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
                                        <div>jes data kurwa</div>
                                    ) : (
                                        <form className="flex-column-center w-full gap-10" onSubmit={reviewForm.handleSubmit(onSubmit)}>
                                            <div className='flex w-full'>
                                                <div className="flex flex-col items-start w-3/4">
                                                    <label className='flex flex-col w-full'> <span className='text-xl'>Title</span>
                                                        <span className={`text-sm min-h-5  text-red-400 transition-all ${reviewForm.formState.errors.title?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{reviewForm.formState.errors.title?.message}</span>
                                                        <input className={`p-2 ${reviewForm.formState.errors.title ? "invalid-input" : "valid-input"}`} type="text"  {...reviewForm.register("title", { required: "Field required" })}></input>
                                                    </label>
                                                </div>
                                                <div className="flex flex-col items-start w-1/4">
                                                    <label className='flex flex-col w-full'> <span className='text-xl'>Rating</span>
                                                        <span className={`text-sm min-h-5  text-red-400 transition-all ${reviewForm.formState.errors.rate?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{reviewForm.formState.errors.rate?.message}</span>
                                                        <input className={`p-2 ${reviewForm.formState.errors.rate ? "invalid-input" : "valid-input"}`} type="number"  {...reviewForm.register("rate", { required: "Field required", min: { value: 1, message: "Rating from 1 to 5" }, max: { value: 5, message: "Rating from 1 to 5" } })}></input>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start w-full h-full">
                                                <label className='flex flex-col w-full'> <span className='text-xl'>Description</span>
                                                    <span className={`text-sm min-h-5  text-red-400 transition-all ${reviewForm.formState.errors.description?.message ? 'opacity-100' : 'opacity-0'}`} role="alert">{reviewForm.formState.errors.description?.message}</span>
                                                    <textarea className={`w-full h-100 ${reviewForm.formState.errors.description ? "invalid-input" : "valid-input"}`} {...reviewForm.register("description", { required: "Field required" })}></textarea>
                                                </label>
                                            </div>
                                            <button className="auth-button" type="submit">Sign in</button>
                                        </form>
                                    )}
                                </>
                            )}
                            <div className="login-error">{reviewFormInfo ? reviewFormInfo : ""}</div>
                        </>
                        ) :
                        (
                            <div className='flex flex-col items-center justify-center gap-10'>
                                <span className='text-lg'>Please login before you add your review:</span>
                                <Link className='review-login-button' to='/login'>Log In</Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    )
}
export default Review