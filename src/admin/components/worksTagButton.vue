<template lang="pug">
       li.edit-card__tag.edited-card__tags
                  p.edit-card__description {{tag}}
                  button(type="button" @click="deleteTag").button.edit-card__cross 
</template>

<script>
export default {
    props:{tag:""},
    methods:{deleteTag(){this.$emit('deleteTag',this.tag)}}
}
</script>