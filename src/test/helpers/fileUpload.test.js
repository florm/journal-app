import 'setimmediate'
import cloudinary from 'cloudinary'
import { fileUpload } from '../../helpers/fileUpload';


cloudinary.config({ 
    cloud_name: 'dusuvg3hg', 
    api_key: '297437552587844', 
    api_secret: 'Wg7PnvT2nRlZ0T0QA_XonKcqQSg'
  });

describe('pruebas en fileUpload', () => {

    test('debe cargar un archivo y retornar el url', async () => {

        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png')
        const blob = await resp.blob()

        //creo el archivo
        const file = new File([blob], 'foto.png')

        const url = await fileUpload(file)

        expect(typeof url).toBe('string')

        //borrar img por id
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.png', '')
        cloudinary.v2.api.delete_resources(imageId);


    })

    test('debe retornar un error', async () => {

        const file = new File([], 'foto.png')

        const url = await fileUpload(file)

        expect(url).toBe(null)

    })
})