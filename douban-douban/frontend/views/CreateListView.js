import ItemList from '../components/pub/ItemList.vue'
export function createListView (title) {
  return {
    name: 'list-stories-view',

    preFetch (store, router) {
      let words = router.history.current.query.search_text || router.history.current.params.id
      // console.log(words)
      return store.dispatch('FETCH_LIST_DATA',words)
    },
    // this will be called during SSR to pre-fetch data into the store!
    render (h) {
      return h(ItemList, { props: {title}})
    }
  }
}