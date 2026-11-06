const SkeletonCard = ({ type = 'photo' }) => {
    return (
        <div className='w-[18vw] relative h-80 bg-gray-900/90 rounded-xl overflow-hidden shadow-md animate-pulse border border-gray-800/60'>
            {/* Center Media Placeholder Icon */}
            <div className='w-full h-full bg-gray-800/70 flex items-center justify-center'>
                {type === 'video' ? (
                    <div className='flex flex-col items-center gap-2 text-gray-600/70'>
                        <svg
                            className='w-12 h-12'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path d='M4 4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 19.5v-15ZM10 7.5v9l6-4.5-6-4.5Z' />
                        </svg>
                    </div>
                ) : (
                    <div className='flex flex-col items-center gap-2 text-gray-600/70'>
                        <svg
                            className='w-12 h-12'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                            />
                        </svg>
                    </div>
                )}
            </div>

            {/* Bottom Overlay Skeleton matching ResultCard bottom */}
            <div
                id='bottom'
                className='flex justify-between gap-3 items-center w-full px-4 py-6 absolute bottom-0'
            >
                <div className='flex-1 space-y-2'>
                    <div className='h-4 bg-gray-600/60 rounded w-4/5'></div>
                    <div className='h-3 bg-gray-600/40 rounded w-2/5'></div>
                </div>
                <div className='bg-gray-600/60 rounded h-8 w-14 shrink-0'></div>
            </div>
        </div>
    )
}

export default SkeletonCard
