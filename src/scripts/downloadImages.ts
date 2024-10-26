   // scripts/downloadImages.ts
   import axios from 'axios';
   import fs from 'fs';
   import path from 'path';
   import { createApi } from 'unsplash-js';
   import dotenv from 'dotenv';

   dotenv.config();

   const unsplash = createApi({
     accessKey: process.env.UNSPLASH_ACCESS_KEY,
   });

   const downloadImage = async (url: string, title: string) => {
     const filePath = path.resolve(__dirname, '../images', `${title}.jpg`);
     const writer = fs.createWriteStream(filePath);

     const response = await axios({
       url,
       method: 'GET',
       responseType: 'stream',
     });

     response.data.pipe(writer);

     return new Promise((resolve, reject) => {
       writer.on('finish', resolve);
       writer.on('error', reject);
     });
   };

   const fetchAndDownloadImages = async (searchQuery: string) => {
     try {
       const result = await unsplash.search.getPhotos({
         query: searchQuery,
         perPage: 1,
       });

       if (result.response && result.response.results.length > 0) {
         const imageUrl = result.response.results[0].urls.regular;
         await downloadImage(imageUrl, searchQuery);
         console.log(`Downloaded image for: ${searchQuery}`);
       } else {
         console.log(`No images found for: ${searchQuery}`);
       }
     } catch (error) {
       console.error(`Error fetching images: ${error}`);
     }
   };

   const main = async () => {
     const articles = [
       { title: 'The Future of Green Chemistry', tags: ['Green Chemistry', 'Sustainability'] },
       { title: 'Global Chemical Trade Dynamics', tags: ['Chemical Trade', 'Market Analysis'] },
       // Add more articles as needed
     ];

     for (const article of articles) {
       for (const tag of article.tags) {
         await fetchAndDownloadImages(tag);
       }
     }
   };

   main();
