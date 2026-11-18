import { useDispatch, useSelector } from "react-redux"
import Swal from 'sweetalert2'
import CollectionCard from "../components/CollectionCard"
import { clearCollection } from '../redux/features/collectionSlice'


const CollectionPage = () => {

  const collection = useSelector(state => state.collection.items)

  const dispatch = useDispatch()

  const clearAll = () => {
    Swal.fire({
      title: 'Clear entire collection?',
      text: 'Are you sure you want to remove all saved items from your collection?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#374151',
      confirmButtonText: 'Yes, clear all',
      cancelButtonText: 'Cancel',
      background: '#111827',
      color: '#f9fafb',
      customClass: {
        popup: 'rounded-2xl border border-gray-800'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCollection())
      }
    })
  }

  return (
    <div className=" overflow-auto px-10 py-6">

      {collection.length > 0 ? <div className="flex justify-between mb-6 items-center">
        <h2 className="text-3xl font-medium">
          Your Collection ({collection.length})
        </h2>
        <button onClick={() => {
          clearAll()
        }} className="active:scale-95 transition cursor-pointer bg-red-600 hover:bg-red-700 px-6 py-2.5 text-base font-medium rounded-lg">Clear Collection</button>
      </div> : <h2 className="text-5xl py-10 text-gray-300 text-center font-medium">
        Collection is Empty
      </h2>}

      <div className='flex justify-start w-full flex-wrap gap-6'>
        {collection.map((item, idx) => {
          return <div key={`${item.id}-${idx}`}>
            <CollectionCard item={item} />
          </div>
        })}
      </div>
    </div>
  )
}

export default CollectionPage