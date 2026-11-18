import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos, fetchVideos } from '../api/mediaApi'
import { setLoading, setLoadingMore, setError, setResults } from '../redux/features/searchSlice'
import { useEffect, useCallback } from 'react'
import ResultCard from './ResultCard'
import SkeletonCard from './SkeletonCard'

const ResultGrid = () => {

    const dispatch = useDispatch()
    const { query, activeTab, results, page, hasMore, loading, loadingMore, error } = useSelector((store) => store.search)

    // Initial fetch when query or activeTab changes
    useEffect(function () {
        if (!query) return
        let isCancelled = false

        const getData = async () => {
            try {
                dispatch(setLoading())
                let items = []
                let hasMoreResults = true

                if (activeTab === 'photos') {
                    const response = await fetchPhotos(query, 1)
                    if (isCancelled) return
                    items = response.results.map((item) => ({
                        id: item.id,
                        type: 'photo',
                        title: item.alt_description || 'Photo',
                        thumbnail: item.urls?.small,
                        src: item.urls?.full || item.urls?.regular,
                        url: item.links?.html
                    }))
                    hasMoreResults = response.total_pages > 1 && response.results.length > 0
                }
                if (activeTab === 'videos') {
                    const response = await fetchVideos(query, 1)
                    if (isCancelled) return
                    items = response.videos.map((item) => ({
                        id: item.id,
                        type: 'video',
                        title: item.user?.name || 'video',
                        thumbnail: item.image,
                        src: item.video_files?.[0]?.link,
                        url: item.url
                    }))
                    hasMoreResults = Boolean(response.next_page) && response.videos.length > 0
                }

                dispatch(setResults({
                    data: items,
                    page: 1,
                    hasMore: hasMoreResults
                }))

            } catch (err) {
                if (!isCancelled) {
                    dispatch(setError(err.message))
                }
            }
        }

        getData()

        return () => {
            isCancelled = true
        }
    }, [query, activeTab, dispatch])

    // Load more records when clicking Load More button
    const handleLoadMore = useCallback(async () => {
        if (loading || loadingMore || !hasMore || !query) return

        const nextPage = page + 1
        dispatch(setLoadingMore())

        try {
            let items = []
            let hasMoreResults = true

            if (activeTab === 'photos') {
                const response = await fetchPhotos(query, nextPage)
                items = response.results.map((item) => ({
                    id: item.id,
                    type: 'photo',
                    title: item.alt_description || 'Photo',
                    thumbnail: item.urls?.small,
                    src: item.urls?.full || item.urls?.regular,
                    url: item.links?.html
                }))
                hasMoreResults = nextPage < response.total_pages && response.results.length > 0
            }
            if (activeTab === 'videos') {
                const response = await fetchVideos(query, nextPage)
                items = response.videos.map((item) => ({
                    id: item.id,
                    type: 'video',
                    title: item.user?.name || 'video',
                    thumbnail: item.image,
                    src: item.video_files?.[0]?.link,
                    url: item.url
                }))
                hasMoreResults = Boolean(response.next_page) && response.videos.length > 0
            }

            dispatch(setResults({
                data: items,
                page: nextPage,
                hasMore: hasMoreResults
            }))

        } catch (err) {
            dispatch(setError(err.message))
        }
    }, [loading, loadingMore, hasMore, query, page, activeTab, dispatch])

    if (loading) {
        return (
            <div className='flex justify-between w-full flex-wrap gap-6 overflow-auto px-10'>
                {Array.from({ length: 10 }).map((_, idx) => (
                    <div key={idx}>
                        <SkeletonCard type={activeTab === 'videos' ? 'video' : 'photo'} />
                    </div>
                ))}
            </div>
        )
    }

    if (error && results.length === 0) {
        return (
            <div className='px-10 py-12 text-center text-red-400'>
                <p className='text-xl font-semibold'>Failed to load {activeTab}</p>
                <p className='text-sm text-gray-400 mt-1'>{error}</p>
            </div>
        )
    }

    if (!loading && results.length === 0) {
        return (
            <div className='px-10 py-16 text-center text-gray-400 text-xl font-medium'>
                No {activeTab} found for &quot;{query}&quot;
            </div>
        )
    }

    return (
        <div className='w-full px-10 pb-16'>
            <div className='flex justify-between w-full flex-wrap gap-6 overflow-auto'>
                {results.map((item, idx) => {
                    return (
                        <div key={`${item.id}-${idx}`}>
                            <ResultCard item={item} />
                        </div>
                    )
                })}

                {loadingMore && (
                    <>
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <div key={`loading-more-${idx}`}>
                                <SkeletonCard type={activeTab === 'videos' ? 'video' : 'photo'} />
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Load More Button */}
            {hasMore && results.length > 0 && (
                <div className='flex justify-center mt-12 mb-4'>
                    <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className='group flex items-center gap-3 bg-(--c2) hover:bg-blue-600 disabled:opacity-60 text-white font-medium px-8 py-3.5 rounded-xl shadow-lg transition-all duration-200 active:scale-95 cursor-pointer disabled:cursor-not-allowed border border-blue-400/20'
                    >
                        {loadingMore ? (
                            <>
                                <svg className='animate-spin h-5 w-5 text-white' fill='none' viewBox='0 0 24 24'>
                                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'></path>
                                </svg>
                                <span>Loading more {activeTab}...</span>
                            </>
                        ) : (
                            <>
                                <span>Load More {activeTab === 'videos' ? 'Videos' : 'Photos'}</span>
                                <svg className='w-5 h-5 group-hover:translate-y-0.5 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            )}

            {!hasMore && results.length > 0 && (
                <div className='w-full py-8 text-center text-gray-500 text-sm font-medium'>
                    You have reached the end of all {activeTab}
                </div>
            )}
        </div>
    )
}

export default ResultGrid