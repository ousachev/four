import $axios from "../../requests"

const skills = {
    state: {
        categories: []
    },
    actions: {
        getCategories(store, categories) {
            store.commit("getCategories", categories)
        },

        addCat(store, category) {
            $axios.post(
                    "/categories", {
                        title: "Введите название тут"
                    }
                )
                .then(response => {
                    let category = response.data;
                    category['skills'] = [];
                    store.commit(
                        'addCategory', category
                    )
                })
        },

        createSkill(store, skill) {
            $axios.post(
                    '/skills', skill)
                .then(
                    response => {
                        skill = response.data;
                        store.commit(
                            'addSkill', skill
                        )
                    }
                )
        },
        removeCat(store, cat) {
            $axios.delete(
                `categories/${cat.id}`
            ).then(
                store.commit(
                    'removeCat', cat
                ))
        },
        redactCat(store, editedCat) {
            $axios.post(
                `/categories/${editedCat.id}`, editedCat
            )

        },

        removeSkill(store, skill) {
            $axios.delete(
                    `/skills/${skill.id}`
                )
                .then(
                    store.commit(
                        'removeSkill', skill
                    )
                )
        },

        redactSkill(store, skill) {
            $axios.post(
                `/skills/${skill.id}`, skill
            ).then(
                store.commit(
                    'redactSkill', skill
                )
            )
        },

    },

    getters: {},

    mutations: {

        getCategories(state, categories) {
            state.categories = categories
        },

        addCategory(state, category) {
            state.categories.unshift(category)
        },

        removeCat(state, cat) {
            state.categories = state.categories.filter(category => category !== cat)
        },

        addSkill(state, skill) {
            state.categories = state.categories.map(function(a) {
                if (a.id === skill.category) {
                    a.skills.push(skill)
                }
                return a
            })
        },

        removeSkill(state, skill) {
            state.categories = state.categories.map(function(a) {
                if (a.id === skill.category) {
                    a.skills = a.skills.filter(
                        function(c) {
                            return c !== skill
                        }
                    )
                }
                return a
            })
        },

        redactSkill(state, editedSkill) {
            state.categories = state.categories.map(
                function(a) {
                    if (a.id === editedSkill.category) {
                        a.skills = a.skills.filter(function(c) {
                                return c.id !== editedSkill.id
                            }),
                            a.skills.push(editedSkill)
                    }
                    return a
                })
        },

    }

}





export default skills;