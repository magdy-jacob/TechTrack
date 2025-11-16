// import React from "react";

// function ReviewCard({ image, name, role, text, rating }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all duration-300 p-6 w-[320px] flex-shrink-0 flex flex-col justify-between text-left border border-gray-100">

//       <div className="flex items-center justify-between mb-4">
//         <div className="flex gap-1 text-yellow-400 text-lg">
//           {Array(rating || 5)
//             .fill(0)
//             .map((_, i) => (
//               <span key={i}>★</span>
//             ))}
//         </div>
//         <div className="bg-blue-600 text-white text-sm font-semibold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
//           {rating || "5"}
//         </div>
//       </div>


//       <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">
//         “{text}”
//       </p>


//       <div className="flex items-center gap-3 mt-auto border-t border-gray-100 pt-3">
//         <img
//           src={image}
//           alt={name}
//           className="w-11 h-11 rounded-full object-cover border-2 border-blue-500 shadow-sm"
//         />
//         <div>
//           <h3 className="text-gray-900 font-semibold text-base">{name}</h3>
//           <p className="text-gray-500 text-sm">{role}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ReviewCard;




import React from "react";

function ReviewCard({ image, name, role, text, rating }) {
  return (
    <div className="
      bg-white 
      rounded-2xl 
      shadow-[0_8px_24px_rgba(0,0,0,0.08)] 
      hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] 
      transition-all 
      duration-300 
      p-5 
      sm:p-6 
      w-[260px] 
      sm:w-[300px] 
      md:w-[340px] 
      flex-shrink-0 
      flex 
      flex-col 
      justify-between 
      text-left 
      border 
      border-gray-100
    ">
      {/* Stars & Rating */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex gap-1 text-yellow-400 text-base sm:text-lg">
          {Array(rating || 5)
            .fill(0)
            .map((_, i) => (
              <span key={i}>★</span>
            ))}
        </div>
        <div className="bg-blue-600 text-white text-xs sm:text-sm font-semibold w-7 sm:w-8 h-7 sm:h-8 rounded-full flex items-center justify-center shadow-md">
          {rating || "5"}
        </div>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 italic">
        “{text}”
      </p>

      {/* User Info */}
      <div className="flex items-center gap-2 sm:gap-3 mt-auto border-t border-gray-100 pt-3">
        <img
          src={image}
          alt={name}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-blue-500 shadow-sm"
        />
        <div>
          <h3 className="text-gray-900 font-semibold text-sm sm:text-base">{name}</h3>
          <p className="text-gray-500 text-xs sm:text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;