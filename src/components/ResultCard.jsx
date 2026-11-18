import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCollection, addedToast } from '../redux/features/collectionSlice'

const ResultCard = ({ item }) => {
    const [mediaLoaded, setMediaLoaded] = useState(false)
    const dispatch = useDispatch()
    const collection = useSelector((state) => state.collection.items)
    const isAlreadyAdded = collection.some((c) => c.id === item.id)

    const addToCollection = (item) => {
        dispatch(addCollection(item))
        dispatch(addedToast())
    }

    return (
        <div className='w-[18vw] relative h-80 bg-gray-900 rounded-xl overflow-hidden shadow-md border border-gray-800/60'>
            {/* Skeleton placeholder while media loads */}
            {!mediaLoaded && (
                <div className='absolute inset-0 bg-gray-800/80 animate-pulse flex items-center justify-center z-0'>
                    {item.type === 'video' ? (
                        <svg className='w-10 h-10 text-gray-700' fill='currentColor' viewBox='0 0 24 24'>
                            <path d='M4 4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 19.5v-15ZM10 7.5v9l6-4.5-6-4.5Z' />
                        </svg>
                    ) : (
                        <svg className='w-10 h-10 text-gray-700' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' />
                        </svg>
                    )}
                </div>
            )}

            <a target='_blank' rel='noreferrer' className='h-full block' href={item.url}>
                {item.type == 'photo' ? (
                    <img
                        className={`h-full w-full object-cover object-center transition-opacity duration-300 ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src={item.src}
                        alt={item.title || ''}
                        onLoad={() => setMediaLoaded(true)}
                        onError={() => setMediaLoaded(true)}
                    />
                ) : ''}
                {item.type == 'video' ? (
                    <video
                        className={`h-full w-full object-cover object-center transition-opacity duration-300 ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        src={item.src}
                        onLoadedData={() => setMediaLoaded(true)}
                        onError={() => setMediaLoaded(true)}
                    />
                ) : ''}
                {item.type == 'gif' ? (
                    <img
                        className={`h-full w-full object-cover object-center transition-opacity duration-300 ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src={item.src}
                        alt={item.title || ''}
                        onLoad={() => setMediaLoaded(true)}
                        onError={() => setMediaLoaded(true)}
                    />
                ) : ''}
            </a>
            <div id='bottom' className='flex justify-between gap-3 items-center w-full px-4 py-6 absolute bottom-0 text-white z-10'>
                <h2 className='text-lg font-semibold capitalize h-14 overflow-hidden'>{item.title}</h2>
                {isAlreadyAdded ? (
                    <Link
                        to='/collection'
                        className='bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium flex items-center gap-1.5 shrink-0 transition text-sm'
                        title='Already in your collection - click to view collection'
                    >
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
                        </svg>
                        Saved
                    </Link>
                ) : (
                    <button
                        onClick={() => {
                            addToCollection(item)
                        }}
                        className='bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium shrink-0 transition text-sm'
                    >
                        Save
                    </button>
                )}
            </div>
        </div>
    )
}

export default ResultCard