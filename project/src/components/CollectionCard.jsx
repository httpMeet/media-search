import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { removeCollection, removeToast } from '../redux/features/collectionSlice';

const CollectionCard = ({ item }) => {

    const dispatch = useDispatch()

    const removeFromCollection = (item) => {
        Swal.fire({
            title: 'Remove from collection?',
            text: `Are you sure you want to remove this ${item.type || 'media'}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            cancelButtonColor: '#374151',
            confirmButtonText: 'Yes, remove',
            cancelButtonText: 'Cancel',
            background: '#111827',
            color: '#f9fafb',
            customClass: {
                popup: 'rounded-2xl border border-gray-800'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeCollection(item.id))
                dispatch(removeToast())
            }
        })
    }

    return (
        <div className='w-[18vw] relative h-80 bg-gray-900 rounded-xl overflow-hidden shadow-md border border-gray-800/60'>
            <a target='_blank' rel='noreferrer' className='h-full block' href={item.url}>
                {item.type == 'photo' ? <img className='h-full w-full object-cover object-center' src={item.src} alt="" /> : ''}
                {item.type == 'video' ? <video className='h-full w-full object-cover object-center' autoPlay loop muted playsInline src={item.src}></video> : ''}
                {item.type == 'gif' ? <img className='h-full w-full object-cover object-center' src={item.src} alt="" /> : ''}
            </a>
            <div id='bottom' className='flex justify-between gap-3 items-center w-full px-4 py-6 absolute bottom-0 text-white z-10'>
                <h2 className='text-lg font-semibold capitalize h-14 overflow-hidden'>{item.title}</h2>
                <button
                    onClick={() => {
                        removeFromCollection(item)
                    }}
                    className='bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded px-3 py-1 cursor-pointer font-medium shrink-0 transition text-sm'
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CollectionCard