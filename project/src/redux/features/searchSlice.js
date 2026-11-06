import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: '',
        activeTab: 'photos',
        results: [],
        page: 1,
        loading: false,
        loadingMore: false,
        hasMore: true,
        error: null
    },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload
            state.page = 1
            state.results = []
            state.hasMore = true
            if (action.payload && action.payload.trim() !== '') {
                state.loading = true
                state.error = null
            }
        },
        setActiveTabs(state, action) {
            state.activeTab = action.payload
            state.page = 1
            state.results = []
            state.hasMore = true
            if (state.query && state.query.trim() !== '') {
                state.loading = true
                state.error = null
            }
        },
        setResults(state, action) {
            if (Array.isArray(action.payload)) {
                state.results = action.payload
                state.page = 1
                state.hasMore = action.payload.length > 0
            } else {
                const { data = [], page = 1, hasMore = true } = action.payload
                if (page === 1) {
                    state.results = data
                } else {
                    const existingIds = new Set(state.results.map((r) => r.id))
                    const uniqueNewItems = data.filter((item) => !existingIds.has(item.id))
                    state.results = [...state.results, ...uniqueNewItems]
                }
                state.page = page
                state.hasMore = hasMore
            }
            state.loading = false
            state.loadingMore = false
        },
        setLoading(state) {
            state.loading = true
            state.error = null
        },
        setLoadingMore(state) {
            state.loadingMore = true
            state.error = null
        },
        setError(state, action) {
            state.error = action.payload
            state.loading = false
            state.loadingMore = false
        },
        clearResults(state) {
            state.results = []
            state.page = 1
            state.hasMore = true
            state.loading = false
            state.loadingMore = false
            state.error = null
        }
    }
})


export const {
    setQuery,
    setActiveTabs,
    setError,
    setLoading,
    setLoadingMore,
    setResults,
    clearResults
} = searchSlice.actions


export default searchSlice.reducer;