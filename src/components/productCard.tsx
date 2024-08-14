// import React from 'react';
// import Image from 'next/image';

// interface ProductCardProps {
//   name: string;
//   cas: string;
//   applications: string;
//   image: string;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ name, cas, applications, image }) => {
//   return (
//     <div className="card w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
//       <figure className="px-4 pt-4">
//         <Image 
//           src={image} 
//           alt={name} 
//           width={300} 
//           height={200} 
//           className="rounded-lg object-cover w-full h-48"
//         />
//       </figure>
//       <div className="card-body p-4">
//         <h2 className="card-title text-lg font-semibold text-gray-800 mb-2">{name}</h2>
//         <p className="text-sm text-gray-600 mb-1"><strong>CAS Number:</strong> {cas}</p>
//         <p className="text-sm text-gray-600 mb-4"><strong>Applications:</strong> {applications}</p>
//         <div className="card-actions flex justify-between mt-4">
//         <button className="font-medium text-[0.72rem] border w-[48%] rounded-[2px] py-2 border-pink text-red">
//             Get Info
//         </button>
//         <button className="bg-[rgb(106,27,154)] text-white px-4 py-2 border w-[48%] rounded-[2px] text-sm font-semibold">
//             Get A Quote
//         </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;