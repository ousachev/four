import $axios from "../../requests";
const works = {
    state: { works: [] },

    actions: {
        getWorks(store, works) {
            store.commit("getWorks", works)
        },

        addWork(store, work) {

            const formData = new FormData();
            formData.append('title', work.title);
            formData.append('link', work.link);
            formData.append('techs', work.techs);
            formData.append('description', work.description);
            formData.append('photo', work.photo);
            $axios.post(
                    '/works', formData)
                .then(response => {
                    work = response.data;
                    store.commit("addWork", work)
                })

        },

        redactWork(store, work) {

            const formData = new FormData();
            formData.append('title', work.title);
            formData.append('link', work.link);
            formData.append('techs', work.techs);
            formData.append('description', work.description);
            formData.append('photo', work.photo);
            $axios.post(`/works/${work.id}`, formData)
                .then(
                    response => {
                        work = response.data.work;
                        store.commit("redactWork", work);

                    });
        },

        removeWork(store, work) {
            $axios.delete(`works/${work.id}`)
                .then(
                    store.commit(
                        "removeWork", work
                    )

                )
        }

    },

    getters: {},
    mutations: {
        getWorks(state, works) {
            state.works = works
        },

        addWork(state, work) { state.works.unshift(work) },

        removeWork(state, work) { state.works = state.works.filter(function(c) { return c !== work }) },

        redactWork(state, work) {
            state.works = state.works.map(
                function(a) {
                    if (a.id === work.id) {
                        a = work
                    }
                    return a
                })
        },


    }

}





export default works;