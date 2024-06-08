import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

export interface ReviewData {
    title: string,
    description: string,
    rate: number
}

interface CreateUpdateMutationArgs {
    reviewData: ReviewData;
    token: string | null;
}

//create review
export const useCreateReview = (setReviewFormInfo: React.Dispatch<React.SetStateAction<string>>, token: string | null) => {
    return useMutation({
        mutationFn: ({ reviewData, token }: CreateUpdateMutationArgs) => createReview(reviewData, token),
        onSuccess: (data) => {
            setReviewFormInfo(data.message);
        },
        onError: (error: AxiosError<Error, any>) => {
            setReviewFormInfo("Error creating review.");
        },
    })
}

const createReview = async (reviewData: ReviewData, token: string | null) => {
    const res = await axios.post('http://localhost:8081/api/v1/reviews/user-review', reviewData, {
        headers: {
            'Authorization': token
        }
    });
    return res.data;
}


//update review
export const useUpdateReview = (setReviewFormInfo: React.Dispatch<React.SetStateAction<string>>, token: string | null) => {
    return useMutation({
        mutationFn: ({ reviewData, token }: CreateUpdateMutationArgs) => updateReview(reviewData, token),
        onSuccess: (data) => {
            setReviewFormInfo(data.message);
        },
        onError: (error: AxiosError<Error, any>) => {
            setReviewFormInfo("Error creating review.");
        },
    })
}

const updateReview = async (reviewData: ReviewData, token: string | null) => {
    const res = await axios.put('http://localhost:8081/api/v1/reviews/user-review', reviewData, {
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


export const useGetReview = (token: string | null) => {
    return useQuery({
        queryKey:['userReview', token],
        queryFn: () => fetchUserReview(token),
        enabled: !!token
    });
}

const fetchUserReview = async (token: string | null) :Promise<string | ReviewReadDto> => {
    const response = await axios.get('http://localhost:8081/api/v1/reviews/user-review', {
        headers: {
            'Authorization': token
        }
    });

    if (response.status !== 200) {
        throw new Error('Failed to fetch user review');
    }

    return response.data;
}