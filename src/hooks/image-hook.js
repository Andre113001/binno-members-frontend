export const fetchImage = async (filePath) => {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/images?filePath=${filePath}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )

    const pic = await res.blob()

    return pic
}



// export const uploadImage = async (path, f) => {
//     const res = await fetch('https://binno-members-repo-production-b8c4.up.railway.app/api/images/upload',{
//         method: 'POST',
//         body: JSON.stringify({
//             file_path: path
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })

//     const pic = await res.blob()

//     return pic
// }
