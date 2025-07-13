'use client';
import UploadFormInput from '@/components/upload/upload-form-input';
import { use } from 'react';
import { useUploadThing } from '@/utils/uploadthing';
import { error } from 'console';
import {file, z} from 'zod';
const schema = z.object({
 file: z
 .instanceof(File, { message: 'Invalid file' })
 .refine((file) => file.size <= 24*1024*1024,
  'File size must be less than 24MB')
 .refine(
    (file: File) => file.type.startsWith('application/pdf'),
     'File must be a PDF'
 )
});
export default function UploadForm() {
      

    const {startUpload, routeConfig} = useUploadThing('pdfUploader',{
        onClientUploadComplete: ()=>{
            console.log('upload successfully!');

        },
        onUploadError: (error)=>{
            console.error('error occurred while uploading',error);
        },

        onUploadBegin:(file)=>{
            console.log('upload has begin for', file);
        },

    });



    const handleSubmit =  async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submitted');
        const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File;
     // validate file
     const validteField
      = schema.safeParse({file});
      console.log(validteField);
     if(!validteField.success){
        console.log(validteField.error.flatten().fieldErrors.file?.[0]??'Invalid file');
        return;
     }
     // schema zod
     const resp = await startUpload([file]);
     if(!resp){
        
        return;
     }
     
    };
    return(
        <div className='flex flex-col gap-8 w-full max-w-2xl mx-auto'>
            <UploadFormInput onSubmit={handleSubmit} />
        </div>
    );
}
