
import React from 'react';
import { Btn } from '../../componants/ui/Btn';


const TrackCard = ({ title, desc, img, categoryId }) => {
  return (
    <div className={`

            relative overflow-hidden rounded-2xl 
            group
            w-full
            h-[280px] 
            xs:h-[320px]
            sm:h-[380px]
            md:h-[420px]
            lg:h-[460px]
            lg:w-[400px]
            md:w-[300px]
            xl:h-[500px]
            xl:w-[400px]
            transition-all duration-300
            hover:shadow-2xl
            mx-auto
        `}
    >



      <div className="absolute inset-0">
        <img
          src={img}
          alt={title}
          className=" h-full object-cover transition-transform duration-500 group-hover:scale-110"
          width="1200"
          height="600"
        />
      </div>


      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20"></div>

      <div className="relative z-10 flex flex-col justify-between h-full p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 text-white">
        <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-2 tracking-tight leading-tight">
          {title}
        </h3>
        <p className="text-xs xs:text-sm sm:text-base md:text-lg mb-4 opacity-90 line-clamp-3 xs:line-clamp-4 sm:line-clamp-5 leading-relaxed">
          {desc}
        </p>

        <div className="self-end">
          <Btn
            url={`roadmap/${categoryId}`}
            content="View Details"
            Px="6"
            className="text-xs xs:text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default TrackCard;