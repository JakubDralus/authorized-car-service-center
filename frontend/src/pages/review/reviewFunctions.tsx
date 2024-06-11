import { AxiosError } from "axios";
import { UseFormReturn } from "react-hook-form";
import { UseQueryResult, useMutation, useQuery } from "react-query";
import axiosInstance from "../../api/AxiosInstance";

export interface ReviewData {
    title: string,
    description: string,
    rate: number
}

interface CreateUpdateMutationArgs {
    reviewData: ReviewData;
    token: string | null;
}

export interface ReviewStatus{
    status: string,
    message: string
}

//create review
export const useCreateReview = (setReviewFormInfo: React.Dispatch<React.SetStateAction<ReviewStatus>>, token: string | null) => {
    return useMutation({
        mutationFn: ({ reviewData, token }: CreateUpdateMutationArgs) => createReview(reviewData, token),
        onSuccess: (data) => {
            setReviewFormInfo({
                status: "Success",
                message: data.message
            });
        },
        onError: (error: AxiosError<Error, any>) => {
            setReviewFormInfo({
                status: "Error",
                message: "Error creating review."
            });
        },
    })
}

const createReview = async (reviewData: ReviewData, token: string | null) => {
    const res = await axiosInstance.post('/reviews/user-review', reviewData, {
        headers: {
            'Authorization': token
        }
    });
    return res.data;
}



//update review
export const useUpdateReview = (setReviewFormInfo: React.Dispatch<React.SetStateAction<ReviewStatus>>, token: string | null) => {
    return useMutation({
        mutationFn: ({ reviewData, token }: CreateUpdateMutationArgs) => updateReview(reviewData, token),
        onSuccess: (data) => {
            setReviewFormInfo({
                status: "Success",
                message: data.message
            });
        },
        onError: (error: AxiosError<Error, any>) => {
            setReviewFormInfo({
                status: "Error",
                message: "Error updating review."
            });
        },
    })
}

const updateReview = async (reviewData: ReviewData, token: string | null) => {
    const res = await axiosInstance.put('/reviews/user-review', reviewData, {
        headers: {
            'Authorization': token
        }
    });
    return res.data;
}



//get review
export interface ReviewReadDto {
    reviewId: number,
    title: string,
    description: string,
    rate: number,
    createdAt: string,
    userId: number
}

interface ReviewApiResponse {
    timeStamp: string,
    status: number,
    success: boolean,
    message: string,
    data: ReviewReadDto
}


export const useGetReview = (token: string | null, updateForm : UseFormReturn<ReviewData, any, undefined>): UseQueryResult<ReviewApiResponse, Error> => {
    return useQuery({
        queryKey:['userReview', token],
        queryFn: () => fetchUserReview(token),
        enabled: !!token,
        onSuccess: (data) => {
            updateForm.setValue("rate", data.data.rate);
            updateForm.setValue("description", data.data.description);
            updateForm.setValue("title", data.data.title);
        },
        retry:0
    });
}

const fetchUserReview = async (token: string | null) :Promise<ReviewApiResponse> => {
    const response = await axiosInstance.get('http://localhost:8081/api/v1/reviews/user-review', {
        headers: {
            'Authorization': token
        }
    });

    if (response.status !== 200) {
        throw new Error('Failed to fetch user review');
    }

    return response.data;
}