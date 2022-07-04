export const fileUpload = async (file)=>{

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dusuvg3hg/upload'

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'react-journal')

    try {
       const resp = await fetch(cloudUrl, {
           method: 'POST',
           body: formData
       })

       if(resp.ok){
           const cloudResp = await resp.json()
           return cloudResp.secure_url
       }else{
           return null
       }
    } catch (error) {
        throw error
    }

}