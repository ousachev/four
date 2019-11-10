import $axios from "../../requests";

const feedback = {
    state: { feedback: [] },
    actions: {
        getFeedback(store, feedback) {
            store.commit("getFeedback", feedback)
        },
        addReview(store, review) {
            const formData = new FormData();
            formData.append('photo', review.photo);
            formData.append('author', review.author);
            formData.append('occ', review.occ);
            formData.append('text', review.text);
            $axios.post(
                    '/reviews', formData
                )
                .then(response => {
                    store.commit("addReview", response.data)
                })

        },
        removeReview(store, review) {
            $axios.delete(
                    `reviews/${review.id}`)
                .then(store.commit("removeReview", review))
        },
        redactReview(store, review) {

            const formData = new FormData();
            formData.append('photo', review.photo);
            formData.append('author', review.author);
            formData.append('occ', review.occ);
            formData.append('text', review.text);

            $axios.post(
                `/reviews/${review.id}`, formData
            ).then(response => {
                let review = response.data;
                store.commit("redactReview", review);
                console.log(review)
            });





        }
    },
    getters: {},
    mutations: {
        getFeedback(state, feedback) { state.feedback = feedback },
        addReview(state, review) { state.feedback.unshift(review) },
        removeReview(state, review) { state.feedback = state.feedback.filter(function(c) { return c !== review }) },
        redactReview(state, review) {
            state.feedback = state.feedback.map(
                function(a) {
                    if (a.id === review.id) {
                        a = review
                    }
                    return a
                })
        }



    }

}





export default feedback;