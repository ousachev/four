<template lang="pug">
    .name__skills-card.section-block.name__skills-card--new
        form.name__skills-form.skill-form--name(@submit.prevent = 'newGroup') 
            input(placeholder="Название новой группы" v-model = "branchName").skill-name.skill-name--editing
            .form-yesno-buttons
                button(type="submit").button.button--green 
                button(type="reset").button.button--cross 
            hr.form-divider
</template>

<script>
export default {
  data(){return {branchName: ""}},
  
  methods:{newGroup(){this.$emit('newGroup', this.branchName); this.branchName = ""} }
}
</script>